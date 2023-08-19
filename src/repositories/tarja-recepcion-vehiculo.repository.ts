import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { BadRequestException, forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { TarjaRecepcionVehiculoEntity } from '../entities/tarja-recepcion-vehiculo.entity';
import { CrearTarjaRecepcionVehiculoDto } from '../dtos/crear-tarja-recepcion-vehiculo.dto';
import { ControlFisicoEntity } from '../entities/control-fisico.entity';
import { ControlVehiculoEntity } from '../entities/control-vehiculo.entity';
import { FotoEntity } from '../entities/foto.entity';
import { DetalleItemProductoRepository } from './detalle-item-producto.repository';
import { AppConstant } from '../app.constant';
import { SolicitudPreviaRepository } from './solicitud-previa.repository';
import { SolicitudPreviaDetalleRepository } from './solicitud-previa-detalle.repository';
import { ParametroReferenciaEntity } from '../entities/parametro-referencia.entity';
import { NotificacionEgresoVehiculoRepository } from './notificacion-egreso-vehiculo.repository';
import { EditarTarjaRecepcionVehiculoDto } from '../dtos/tarja-recepcion-vehiculo.dto';
import { PlantillaService } from '../services/plantilla.service';
import { ProductoRepository } from "./producto.repository";
import { MatriculaAfianzadaRepository } from "./matricula-afianzada.repository";
import { RackRepository } from "./rack.repository";
import { FotoRepository } from "./foto.repository";
import { ControlVehiculoRepository } from "./control-vehiculo.repository";
import { ControlFisicoRepository } from "./control-fisico.repository";
import { RackEntity } from "../entities/rack.entity";
import { DetalleItemProductoEntity } from "../entities/detalle-item-producto.entity";

const image2base64 = require('image-to-base64');

@Injectable()
export class TarjaRecepcionVehiculoRepository {
  constructor(
    @InjectRepository(TarjaRecepcionVehiculoEntity)
    private readonly repository: Repository<TarjaRecepcionVehiculoEntity>,
    private readonly controlFisicoRepository: ControlFisicoRepository,
    private readonly controlVehiculoRepository: ControlVehiculoRepository,
    private readonly rackRepository: RackRepository,
    @InjectRepository(ParametroReferenciaEntity) private readonly repositoryParametroReferencia: Repository<ParametroReferenciaEntity>,
    private detalleItemProductoRepository: DetalleItemProductoRepository,
    private solicitudPreviaRepository: SolicitudPreviaRepository,
    private solicitudPreviaDetalleRepository: SolicitudPreviaDetalleRepository,
    @Inject(forwardRef(() => NotificacionEgresoVehiculoRepository)) private notificacionEgresoVehiculoRepository: NotificacionEgresoVehiculoRepository,
    private plantillaService: PlantillaService,
    private productoRepository: ProductoRepository,
    private matriculaAfianzadaRepository: MatriculaAfianzadaRepository,
    private readonly fotoRepository: FotoRepository,
    private connection: Connection
  ) {
  }

  async insert(crearTarjaRecepcionVehiculoDto: CrearTarjaRecepcionVehiculoDto): Promise<TarjaRecepcionVehiculoEntity> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let tarjaRecepcionVehiculoEntity: TarjaRecepcionVehiculoEntity;
    try {
      const parametrosRefrencia = await queryRunner.manager.findOne(ParametroReferenciaEntity, { codigoProceso: AppConstant.CODIGO_PROCESO_TARJA_RECEPCION });
      let codigoReferenciaAux = crearTarjaRecepcionVehiculoDto.numeroTarja;
      if (parametrosRefrencia) {
        codigoReferenciaAux = parametrosRefrencia.codigo + ('' + parametrosRefrencia.indice).padStart(parametrosRefrencia.maximoTamanio, '0');
      }
      tarjaRecepcionVehiculoEntity = {
        fechaTarja: crearTarjaRecepcionVehiculoDto.fechaTarja,
        numeroTarja: codigoReferenciaAux,
        kilometraje: crearTarjaRecepcionVehiculoDto.kilometraje,
        combustible: crearTarjaRecepcionVehiculoDto.combustible,
        observaciones: crearTarjaRecepcionVehiculoDto.observaciones,
        fechaRecepcion: crearTarjaRecepcionVehiculoDto.fechaRecepcion,
        fechaEntrega: crearTarjaRecepcionVehiculoDto.fechaEntrega,
        idDetalleItemProducto: crearTarjaRecepcionVehiculoDto.idDetalleItemProducto,
        idRack: crearTarjaRecepcionVehiculoDto.idRack,
        detalleItemProducto: null,
        controlesVehiculo: null,
        controlesFisicos: null,
        fotos: null,
        rack: null,
      };
      const controlesFisicosEntities: ControlFisicoEntity[] = crearTarjaRecepcionVehiculoDto.crearControlesFisicosDtos
        .map<ControlFisicoEntity>(it => ({
          estadoControl: it.estadoControl,
          etiqueta: it.etiqueta,
          idCatalogoControlFisico: it.idCatalogoControlFisico,
        }));
      const controlesVehiculoEntities: ControlVehiculoEntity[] = crearTarjaRecepcionVehiculoDto.crearControlesVehiculoDtos
        .map<ControlVehiculoEntity>(it => ({
          estadoControl: it.estadoControl,
          observaciones: it.observaciones,
          idCatalogoControlVehiculo: it.idCatalogoControlVehiculo,
        }));

      if (crearTarjaRecepcionVehiculoDto.crearFotosDtos) {
        const fotosEntities = crearTarjaRecepcionVehiculoDto.crearFotosDtos.map<FotoEntity>(it => ({ url: it.url }));
        await queryRunner.manager.save(FotoEntity, fotosEntities);
        tarjaRecepcionVehiculoEntity.fotos = fotosEntities;
      } else {
        tarjaRecepcionVehiculoEntity.fotos = [];
      }
      await queryRunner.manager.save(ControlFisicoEntity, controlesFisicosEntities);
      tarjaRecepcionVehiculoEntity.controlesFisicos = controlesFisicosEntities;

      await queryRunner.manager.save(ControlVehiculoEntity, controlesVehiculoEntities);
      tarjaRecepcionVehiculoEntity.controlesVehiculo = controlesVehiculoEntities;

      await queryRunner.manager.save(TarjaRecepcionVehiculoEntity, tarjaRecepcionVehiculoEntity);
      parametrosRefrencia.indice++;
      await queryRunner.manager.update(ParametroReferenciaEntity, parametrosRefrencia.id, { indice: parametrosRefrencia.indice });
      if (crearTarjaRecepcionVehiculoDto.idRack && tarjaRecepcionVehiculoEntity.id) {
        await queryRunner.manager.update(RackEntity, crearTarjaRecepcionVehiculoDto.idRack, {
          estado: AppConstant.ESTADO_RACK_OCUPADO,
          idTarjaRecepcionActual: tarjaRecepcionVehiculoEntity.id,
        });
      }

      await queryRunner.manager.update(DetalleItemProductoEntity, crearTarjaRecepcionVehiculoDto.idDetalleItemProducto,
        { estado: crearTarjaRecepcionVehiculoDto.estadoDetalleItemProducto }
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Error el guardar la tarja de recepción del vehículo, intente nuevamente.');
    } finally {
      await queryRunner.release();
    }

    if (crearTarjaRecepcionVehiculoDto.estadoDetalleItemProducto == AppConstant.ESTADO_DETALLE_ITEM_PRODUCTO_NO_APROBADO) {
      await this.enviarNotificacionTarja(tarjaRecepcionVehiculoEntity);
    } else {
      const detalleItemProductoEntity = await this.detalleItemProductoRepository.selectById(crearTarjaRecepcionVehiculoDto.idDetalleItemProducto);
      const solicitudPreviaDetalleEntity = await this.solicitudPreviaDetalleRepository.selectById(detalleItemProductoEntity.idSolicitudPreviaDetalle);
      const solicitudesPreviasDetallesEntities = await this.solicitudPreviaRepository
        .selectSolicitudesDetalleByIdSolicitudPrevia(solicitudPreviaDetalleEntity.idSolicitudPrevia);

      let estanDetallesItemProductoCerrados = true;
      for (const itemSolicitudPreviaDetalle of solicitudesPreviasDetallesEntities) {
        const detallesItemProductoEntities = await this.detalleItemProductoRepository.selectAllByDetalleSP(itemSolicitudPreviaDetalle.id);
        if (!detallesItemProductoEntities.every(it => it.estado === AppConstant.ESTADO_DETALLE_ITEM_PRODUCTO_APROBADO)) {
          estanDetallesItemProductoCerrados = false;
          break;
        }
      }
      if (estanDetallesItemProductoCerrados) {
        await this.solicitudPreviaRepository
          .updateEstado(solicitudPreviaDetalleEntity.idSolicitudPrevia, AppConstant.ESTADO_SOLICITUD_PREVIA_TARJAS_COMPLETADAS);
      }
    }
    return tarjaRecepcionVehiculoEntity;
  }

  insertMobile(crearTarjaRecepcionVehiculoMobileDto: { crearTarjaRecepcionVehiculoDto: CrearTarjaRecepcionVehiculoDto; fotos: string[] }) {
    const fs = require('fs');
    let randomName;
    crearTarjaRecepcionVehiculoMobileDto.crearTarjaRecepcionVehiculoDto.crearFotosDtos = [];
    crearTarjaRecepcionVehiculoMobileDto.fotos.forEach(foto => {
      randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('') + '.jpeg';
      fs.writeFileSync(
        `./img/tarjas/${randomName}`, foto.replace(/^data:image\/jpeg;base64,/, ''),
        'base64');
      crearTarjaRecepcionVehiculoMobileDto.crearTarjaRecepcionVehiculoDto.crearFotosDtos.push({ url: randomName });
    });
    return this.insert(crearTarjaRecepcionVehiculoMobileDto.crearTarjaRecepcionVehiculoDto);
  }

  selectAll(): Promise<TarjaRecepcionVehiculoEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<TarjaRecepcionVehiculoEntity | undefined> {
    return this.repository.findOne({ id });
  }

  selectJoinDetalleItemJoinSolicitudPreviaDetalle(id: number): Promise<TarjaRecepcionVehiculoEntity | undefined> {
    return this.repository.findOne({
      where: { id },
      join: {
        alias: 'tarja',
        leftJoinAndSelect: {
          detalleItemProducto: 'tarja.detalleItemProducto',
          solicitudPreviaDetalle: 'detalleItemProducto.solicitudPreviaDetalle',
        },
      },
    });
  }

  async selectByIdJoinControlVehiculo(id: number): Promise<TarjaRecepcionVehiculoEntity | undefined> {
    return this.repository.findOne({
      join: {
        alias: 'tarja',
        leftJoinAndSelect: {
          fotos: 'tarja.fotos',
          detalleItemProducto: 'tarja.detalleItemProducto',
          controlesVehiculo: 'tarja.controlesVehiculo',
          controlesFisicos: 'tarja.controlesFisicos',
        },
      },
    });
  }

  selectOneByIdDetalleItemProducto(idDetalleItemProducto: number) {
    return this.repository.findOne({ where: { idDetalleItemProducto } });
  }

  async selectOneByIdNotificacioRetiro(idNotificacionRetiro: number) {
    return this.repository.findOne({ where: { idNotificacionRetiro } });
  }

  selectDatosEdicionById(id: number): Promise<TarjaRecepcionVehiculoEntity> {
    return this.repository.findOne({
      where: { id },
      join: {
        alias: 'tarja',
        leftJoinAndSelect: {
          detalleItemProducto: 'tarja.detalleItemProducto',
          controlesVehiculo: 'tarja.controlesVehiculo',
          controlesFisicos: 'tarja.controlesFisicos',
          fotos: 'tarja.fotos',
          solicitudPreviaDetalle: 'detalleItemProducto.solicitudPreviaDetalle',
          producto: 'solicitudPreviaDetalle.producto',
          rack: 'tarja.rack',
        },
      },
    });
  }

  async selectSaldoItem(id): Promise<number> {
    const tarjaRecepcionVehiculoEntity = await this.repository.findOne({
      where: { id },
      join: {
        alias: 'tarja',
        leftJoinAndSelect: {
          detalleItemProducto: 'tarja.detalleItemProducto',
          solicitudPreviaDetalle: 'detalleItemProducto.solicitudPreviaDetalle',

        },
      },
    });
    return tarjaRecepcionVehiculoEntity.detalleItemProducto.solicitudPreviaDetalle.saldo;
  }

  selectHistorial(id: number) {
    return this.repository.findOne({
      where: { id },
      join: {
        alias: 'tarja',
        leftJoinAndSelect: {
          tarjasRecepcionVehiculos: 'tarja.tarjasRecepcionVehiculos'
        }
      }
    });
  }

  update(id: number, partialEntity: Partial<TarjaRecepcionVehiculoEntity>): Promise<UpdateResult> {
    return this.repository.update(id, partialEntity);
  }

  async updateAll(id: number, editarTarjaRecepcionVehiculoDto: EditarTarjaRecepcionVehiculoDto): Promise<TarjaRecepcionVehiculoEntity> {
    const tarjaRecepcionVehiculoEntity = await this.selectById(id);
    const tarjaRecepcionVehiculoHistoricoEntity = { ...tarjaRecepcionVehiculoEntity };
    tarjaRecepcionVehiculoHistoricoEntity.idNotificacionEgreso = null;
    tarjaRecepcionVehiculoHistoricoEntity.idNotificacionRetiro = null;
    tarjaRecepcionVehiculoHistoricoEntity.idDetalleItemProducto = null;
    tarjaRecepcionVehiculoHistoricoEntity.id = null;
    tarjaRecepcionVehiculoHistoricoEntity.fechaHoraHistorial = tarjaRecepcionVehiculoEntity.fechaHoraHistorial || tarjaRecepcionVehiculoEntity.fechaHoraRegistro;
    delete tarjaRecepcionVehiculoHistoricoEntity.fechaHoraActualizacion;
    delete tarjaRecepcionVehiculoHistoricoEntity.fechaHoraRegistro;
    tarjaRecepcionVehiculoHistoricoEntity.idTarjaRecepcionVehiculo = tarjaRecepcionVehiculoEntity.id;
    await this.repository.save(tarjaRecepcionVehiculoHistoricoEntity);

    tarjaRecepcionVehiculoEntity.fechaHoraHistorial = new Date();
    tarjaRecepcionVehiculoEntity.combustible = editarTarjaRecepcionVehiculoDto.combustible;
    tarjaRecepcionVehiculoEntity.fechaEntrega = editarTarjaRecepcionVehiculoDto.fechaEntrega;
    tarjaRecepcionVehiculoEntity.fechaRecepcion = editarTarjaRecepcionVehiculoDto.fechaRecepcion;
    tarjaRecepcionVehiculoEntity.fechaTarja = editarTarjaRecepcionVehiculoDto.fechaTarja;
    tarjaRecepcionVehiculoEntity.kilometraje = editarTarjaRecepcionVehiculoDto.kilometraje;
    tarjaRecepcionVehiculoEntity.observaciones = editarTarjaRecepcionVehiculoDto.observaciones;

    if (tarjaRecepcionVehiculoEntity.idRack !== editarTarjaRecepcionVehiculoDto.idRack) {
      await this.rackRepository.desocuparRack(tarjaRecepcionVehiculoEntity.idRack);
      tarjaRecepcionVehiculoEntity.idRack = editarTarjaRecepcionVehiculoDto.idRack;
      await this.rackRepository.update(tarjaRecepcionVehiculoEntity.idRack, {
        estado: AppConstant.ESTADO_RACK_OCUPADO,
        idTarjaRecepcionActual: tarjaRecepcionVehiculoEntity.id,
      });
    }

    const detalleItemProductoEntity = await this.detalleItemProductoRepository.selectById(tarjaRecepcionVehiculoEntity.idDetalleItemProducto);
    if (detalleItemProductoEntity.estado === AppConstant.ESTADO_DETALLE_ITEM_PRODUCTO_APROBADO ||
      detalleItemProductoEntity.estado === AppConstant.ESTADO_DETALLE_ITEM_PRODUCTO_NO_APROBADO) {
      const estaRevisionControlFisicoCorrecto = editarTarjaRecepcionVehiculoDto.editarControlesFisicosDtos.every(it => it.estadoControl === AppConstant.ESTADO_CONTROL_TARJA_CORRECTO);
      const estaRevisionControlVehiculoCorrecto = editarTarjaRecepcionVehiculoDto.editarControlesVehiculoDtos.every(it => it.estadoControl === AppConstant.ESTADO_CONTROL_TARJA_CORRECTO);
      if (estaRevisionControlFisicoCorrecto && estaRevisionControlVehiculoCorrecto) {
        await this.detalleItemProductoRepository.update(detalleItemProductoEntity.id, { estado: AppConstant.ESTADO_DETALLE_ITEM_PRODUCTO_APROBADO });
      } else {
        await this.detalleItemProductoRepository.update(detalleItemProductoEntity.id, { estado: AppConstant.ESTADO_DETALLE_ITEM_PRODUCTO_NO_APROBADO });
      }
    }
    await this.repository.save(tarjaRecepcionVehiculoEntity);
    for (const controlFisicoDto of editarTarjaRecepcionVehiculoDto.editarControlesFisicosDtos) {
      const controlFisicoEntity = await this.controlFisicoRepository.selectById(controlFisicoDto.id);
      controlFisicoEntity.id = null;
      controlFisicoEntity.idTarjaRecepcionVehiculo = tarjaRecepcionVehiculoHistoricoEntity.id;
      delete controlFisicoEntity.fechaHoraRegistro;
      delete controlFisicoEntity.fechaHoraActualizacion;
      await this.controlFisicoRepository.insert(controlFisicoEntity);
      await this.controlFisicoRepository.update(controlFisicoDto.id, {
        estadoControl: controlFisicoDto.estadoControl,
        etiqueta: controlFisicoDto.etiqueta,
      });
    }

    for (const controlVehiculoDto of editarTarjaRecepcionVehiculoDto.editarControlesVehiculoDtos) {
      const controlVehiculoEntity = await this.controlVehiculoRepository.selectById(controlVehiculoDto.id);
      controlVehiculoEntity.id = null;
      controlVehiculoEntity.idTarjaRecepcionVehiculo = tarjaRecepcionVehiculoHistoricoEntity.id;
      delete controlVehiculoEntity.fechaHoraRegistro;
      delete controlVehiculoEntity.fechaHoraActualizacion;
      await this.controlVehiculoRepository.insert(controlVehiculoEntity);
      await this.controlVehiculoRepository.update(controlVehiculoDto.id, {
        estadoControl: controlVehiculoDto.estadoControl,
        observaciones: controlVehiculoDto.observaciones,
      })
    }

    const fotosEntities = await this.fotoRepository.selectByIdTarjaRecepcionVehiculo(id);
    for (const fotoEntity of fotosEntities) {
      await this.fotoRepository.update(fotoEntity.id, { tarjaRecepcionVehiculoId: tarjaRecepcionVehiculoHistoricoEntity.id })
    }

    for (const editarFotoDto of editarTarjaRecepcionVehiculoDto.editarFotosDtos) {
      await this.fotoRepository.insert({
        url: editarFotoDto.url,
        tarjaRecepcionVehiculoId: tarjaRecepcionVehiculoEntity.id
      })
    }

    return tarjaRecepcionVehiculoEntity;
  }

  async selectByIdAllInformation(id: number): Promise<any | undefined> {
    const tarjaRecepcion = await this.repository.findOne(id, {
      join: {
        alias: 'tarjaRecepcion',
        leftJoinAndSelect: {
          controlesVehiculo: 'tarjaRecepcion.controlesVehiculo',
          controlesFisicos: 'tarjaRecepcion.controlesFisicos',
          fotos: 'tarjaRecepcion.fotos',
          detalleItemProducto: 'tarjaRecepcion.detalleItemProducto',
          catalogoControlFisico: 'controlesFisicos.catalogoControlFisico',
          catalogoControlVehiculo: 'controlesVehiculo.catalogoControlVehiculo',
          solicitudPreviaDetalle: 'detalleItemProducto.solicitudPreviaDetalle',
          producto: 'solicitudPreviaDetalle.producto',
        },
      },
    });
    if (tarjaRecepcion.detalleItemProducto && tarjaRecepcion.detalleItemProducto.solicitudPreviaDetalle) {
      if (tarjaRecepcion.detalleItemProducto.solicitudPreviaDetalle.producto) {
        tarjaRecepcion['producto'] = tarjaRecepcion.detalleItemProducto.solicitudPreviaDetalle.producto;
      }
      delete tarjaRecepcion.detalleItemProducto.solicitudPreviaDetalle;
    }
    const fotosBase64 = [];
    if (tarjaRecepcion.fotos) {
      for (const tarja of tarjaRecepcion.fotos) {
        try {
          const imagen = await image2base64('img/tarjas/' + tarja.url)
            .then(
              (response) => {
                return response;
              },
            )
            .catch(
              (error) => {
                return error;
              },
            );
          fotosBase64.push(imagen);
        } catch (e) {
          Logger.error(e);
        }
      }
    }
    tarjaRecepcion['fotosBase64'] = fotosBase64;
    return tarjaRecepcion;
  }

  async selectJoinRackControlVehiculoControlFisicoFoto(id: number) {
    const tarjaRecepcionVehiculoEntity = await this.repository.findOne({
      where: { id },
      join: {
        alias: 'tarja',
        leftJoinAndSelect: {
          'rack': 'tarja.rack',
          'bodega': 'rack.bodega',
          'controlesVehiculo': 'tarja.controlesVehiculo',
          'catalogoControlVehiculo': 'controlesVehiculo.catalogoControlVehiculo',
          'controlesFisicos': 'tarja.controlesFisicos',
          'catalogoControlFisico': 'controlesFisicos.catalogoControlFisico',
          'fotos': 'tarja.fotos',
        }
      }
    });

    if (tarjaRecepcionVehiculoEntity.fotos && tarjaRecepcionVehiculoEntity.fotos.length > 0) {
      for (const foto of tarjaRecepcionVehiculoEntity.fotos) {
        try {
          // @ts-ignore
          foto.base64 = await image2base64('img/tarjas/' + foto.url);
        } catch (e) {
          Logger.error(e);
        }
      }
    }
    return tarjaRecepcionVehiculoEntity;
  }

  updateAllMobile(id: number, editarTarjaRecepcionVehiculoMobileDto: { editarTarjaRecepcionVehiculoDto: EditarTarjaRecepcionVehiculoDto; fotos: string[] }) {
    const fs = require('fs');
    let randomName;
    editarTarjaRecepcionVehiculoMobileDto.editarTarjaRecepcionVehiculoDto.editarFotosDtos = [];
    editarTarjaRecepcionVehiculoMobileDto.fotos.forEach(foto => {
      randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('') + '.jpeg';
      fs.writeFileSync(
        `./img/tarjas/${randomName}`, foto.replace(/^data:image\/jpeg;base64,/, ''),
        'base64');
      editarTarjaRecepcionVehiculoMobileDto.editarTarjaRecepcionVehiculoDto.editarFotosDtos.push({ url: randomName });
    });
    return this.updateAll(id, editarTarjaRecepcionVehiculoMobileDto.editarTarjaRecepcionVehiculoDto);
  }


  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  private async getMensajeNotificacionTarja(tarjaRecepcionVehiculoEntity: TarjaRecepcionVehiculoEntity) {
    const detalleItemProducto = await this.detalleItemProductoRepository.selectById(tarjaRecepcionVehiculoEntity.idDetalleItemProducto);
    const solicitudPreviaDetalleEntity = await this.solicitudPreviaDetalleRepository.selectById(detalleItemProducto.idSolicitudPreviaDetalle);
    const productoEntity = await this.productoRepository.selectById(solicitudPreviaDetalleEntity.idProducto);
    const matriculaAfianzadaEntity = await this.matriculaAfianzadaRepository.selectById(solicitudPreviaDetalleEntity.idMatriculaAfianzada);
    const mensaje = `Estimados Toyota del Ecuador.\n\n` +
      `En el presente correo adjuntamos la tarja Nro.: ${tarjaRecepcionVehiculoEntity.numeroTarja} y fotografías de la novedad detectada en el vehículo con MODELO: ${productoEntity.descripcion}, CHASIS Nro.: ${detalleItemProducto.chasis}, MOTOR Nro.: ${detalleItemProducto.motor}, COLOR: ${detalleItemProducto.color} de la matricula afianzada Nro.: ${matriculaAfianzadaEntity.numeroTitulo}.\n\n` +
      `Saludos\n` +
      `Luis Samaniego\n` +
      `Supervisor Junior\n` +
      `dat@lmi.com`;
    return mensaje;
  }

  private async enviarNotificacionTarja(tarjaRecepcionVehiculoEntity: TarjaRecepcionVehiculoEntity) {
    const mensaje = await this.getMensajeNotificacionTarja(tarjaRecepcionVehiculoEntity);
    const fotos = tarjaRecepcionVehiculoEntity.fotos.map(it => ({ filename: it.url, path: `img/tarjas/${it.url}` }));
    await this.plantillaService.enviarNotificacionRetiroPdf(tarjaRecepcionVehiculoEntity.id, fotos, mensaje);
  }

  async notificarTarja(id: number) {
    const tarja = await this.repository.findOne({
      where: { id },
      join: {
        alias: 'tarja',
        leftJoinAndSelect: {
          fotos: 'tarja.fotos'
        }
      }
    });
    await this.enviarNotificacionTarja(tarja);
    return { mensaje: 'Tarja notificada.' };
  }
}
