import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Connection, DeleteResult, InsertResult, Repository} from 'typeorm';
import {FacturaInformativaEntity} from '../entities/factura-informativa.entity';
import {AppConstant} from '../app.constant';
import {SolicitudPreviaDetalleEntity} from '../entities/solicitud-previa-detalle.entity';
import {
  CrearFacturaInformativaDto,
  EditarFacturaInformativaDto,
  FacturaInformativaAllInformacionDto
} from '../dtos/factura-informativa.dto';
import {DetalleItemProductoRepository} from './detalle-item-producto.repository';
import {ParametroReferenciaRepository} from './parametro-referencia.repository';
import {NotificacionRetiroRepository} from './notificacion-retiro.repository';
import {TarjaRecepcionVehiculoRepository} from './tarja-recepcion-vehiculo.repository';
import {SolicitudPreviaRepository} from './solicitud-previa.repository';
import {DetalleItemProductoDto} from "../dtos/detalle-item-producto.dto";
import {DetalleItemProductoEntity} from "../entities/detalle-item-producto.entity";
import {SolicitudPreviaEntity} from "../entities/solicitud-previa.entity";
import {ParametroReferenciaEntity} from "../entities/parametro-referencia.entity";
import {NotificacionRetiroEntity} from "../entities/notificacion-retiro.entity";

@Injectable()
export class FacturaInformativaRepository {
  constructor(
    @InjectRepository(FacturaInformativaEntity)
    private readonly repository: Repository<FacturaInformativaEntity>,
    private readonly notificacionRetiroRepository: NotificacionRetiroRepository,
    @InjectRepository(SolicitudPreviaDetalleEntity)
    private readonly solicitudPreviaDetalleRepository: Repository<SolicitudPreviaDetalleEntity>,
    private readonly detalleItemProductoRepository: DetalleItemProductoRepository,
    private readonly parametroReferenciaRepository: ParametroReferenciaRepository,
    private readonly tarjaRecepcionVehiculoRepository: TarjaRecepcionVehiculoRepository,
    private readonly solicitudPreviaRepository: SolicitudPreviaRepository,
    private readonly connection: Connection
  ) {
  }

  async insert(crearFacturaInformativaDto: CrearFacturaInformativaDto): Promise<InsertResult> {
    const parametro = await this.parametroReferenciaRepository.selectOneParametroActual(AppConstant.CODIGO_PROCESO_FACTURA_INFORMATIVA);
    const numeroFI = parametro.codigoActual;
    if (!numeroFI) {
      throw new InternalServerErrorException('Error al registrar la factura informativa ya que no se ha encontrado el número único, comuníquese con el administrador.');
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const entidad: FacturaInformativaEntity = {
        numeroFI,
        seguro: 0,
        flete: 0,
        totalCIF: 0,
        totalFOB: 0,
        totalUnidades: crearFacturaInformativaDto.detallesItemProductoDtos.length,
        pesoBruto: crearFacturaInformativaDto.pesoBruto,
        pesoNeto: crearFacturaInformativaDto.pesoNeto,
        idNotificacionRetiro: crearFacturaInformativaDto.idNotificacionRetiro,
        fechaEmision: crearFacturaInformativaDto.fechaEmision,
        marcas: crearFacturaInformativaDto.marcas,
        daiImportacion: crearFacturaInformativaDto.daiImportacion,
        conocimientoEmbarque: crearFacturaInformativaDto.conocimientoEmbarque,
        importador: crearFacturaInformativaDto.importador,
        direccion: crearFacturaInformativaDto.direccion,
        llegadoPorVapor: crearFacturaInformativaDto.llegadoPorVapor,
        de: crearFacturaInformativaDto.de,
        codigoTipoEntrega: null,
        saldoUnidadesEgreso: crearFacturaInformativaDto.detallesItemProductoDtos.length,
        saldoBultos: null,
        saldoUnidades: null,
        estado: AppConstant.ESTADO_FACTURA_INFORMATIVA_SIN_NOTIFICACION_EGRESO
      };

      for (const detalleItemProducto of crearFacturaInformativaDto.detallesItemProductoDtos) {
        await queryRunner.manager.update(DetalleItemProductoEntity, detalleItemProducto.id, {
          pesoSalida: detalleItemProducto.pesoSalida,
          itemSalida: detalleItemProducto.itemSalida,
          precioUnitarioSalida: detalleItemProducto.precioUnitarioSalida,
          fletePorUnidadSalida: detalleItemProducto.fletePorUnidadSalida,
          seguroPorItemSalida: detalleItemProducto.seguroPorItemSalida,
          valorFOBSalida: detalleItemProducto.valorFOBSalida,
          valorCIFSalida: detalleItemProducto.valorCIFSalida,
        });

        entidad.totalFOB += detalleItemProducto.precioUnitarioSalida;
        entidad.seguro += detalleItemProducto.seguroPorItemSalida;
        entidad.flete += detalleItemProducto.fletePorUnidadSalida;
        entidad.totalCIF += detalleItemProducto.valorCIFSalida;
      }
      entidad.valorCAndF = entidad.totalFOB + entidad.flete;

      let saldoUnidades = 0;
      let saldoBultos = 0;
      const tarjasRecepcionAux = await this.notificacionRetiroRepository.selectByIdDetalles(entidad.idNotificacionRetiro);
      const detalleItemProductoAux = await this.detalleItemProductoRepository.selectById(tarjasRecepcionAux[0].idDetalleItemProducto);
      const detalleSolicitudPreviaAux = await this.solicitudPreviaDetalleRepository.findOne(detalleItemProductoAux.idSolicitudPreviaDetalle);
      const solicitudPrevia = await this.solicitudPreviaRepository.selectById(detalleSolicitudPreviaAux.idSolicitudPrevia);

      if (solicitudPrevia.saldoUnidades) {
        saldoUnidades = solicitudPrevia.saldoUnidades - entidad.totalCIF;
        saldoBultos = solicitudPrevia.saldoBultos - crearFacturaInformativaDto.detallesItemProductoDtos.length;
      } else {
        saldoUnidades = solicitudPrevia.totalCIF - entidad.totalCIF;
        saldoBultos = solicitudPrevia.totalUnidades - crearFacturaInformativaDto.detallesItemProductoDtos.length;
      }
      if (saldoBultos === 0) {
        saldoUnidades = 0;
      }
      await queryRunner.manager.update(SolicitudPreviaEntity, solicitudPrevia.id, {
        saldoUnidades,
        saldoBultos,
      });
      entidad.saldoUnidades = saldoUnidades;
      entidad.saldoBultos = saldoBultos;
      const facturaInformativa = await queryRunner.manager.insert(FacturaInformativaEntity, entidad);
      await queryRunner.manager.update(ParametroReferenciaEntity, parametro.parametroReferencia.id, {indice: ++parametro.parametroReferencia.indice});
      await queryRunner.manager.update(NotificacionRetiroEntity, entidad.idNotificacionRetiro, {estado: AppConstant.ESTADO_NOTIFICACION_RETIRO_FACTURA_INFORMATIVA});

      await queryRunner.commitTransaction();
      return facturaInformativa;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Error el guardar la factura informativa, intente nuevamente.');
    } finally {
      await queryRunner.release();
    }
  }

  async anular(idFacturaInformativa: number): Promise<void> {
    const facturaInformativaEntity = await this.connection.manager.findOne(FacturaInformativaEntity, {
      join: {
        alias: 'facturaInformativa',
        leftJoinAndSelect: {
          notificacionesEgresosVehiculos: 'facturaInformativa.notificacionesEgresosVehiculos',
        },
      },
      where: {
        id: idFacturaInformativa
      }
    });

    if (facturaInformativaEntity.notificacionesEgresosVehiculos && facturaInformativaEntity.notificacionesEgresosVehiculos.length > 0) {
      throw new BadRequestException(
        `Debe anular la notificación de egreso ${facturaInformativaEntity.notificacionesEgresosVehiculos[0].numeroNEV} antes de anular la factura informativa.`
      );
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const facturaInformativaEntity = await queryRunner.manager.findOne(FacturaInformativaEntity, {
        join: {
          alias: 'facturaInformativa',
          leftJoinAndSelect: {
            notificacionRetiro: 'facturaInformativa.notificacionRetiro',
            tarjasRecepcion: 'notificacionRetiro.tarjasRecepcion',
            detalleItemProducto: 'tarjasRecepcion.detalleItemProducto',
          },
        },
        where: {
          id: idFacturaInformativa
        }
      });
      for (const tarjaRecepcionVehiculo of facturaInformativaEntity.notificacionRetiro.tarjasRecepcion) {
        await queryRunner.manager.update(DetalleItemProductoEntity, tarjaRecepcionVehiculo.detalleItemProducto.id, {
          pesoSalida: null,
          itemSalida: null,
          precioUnitarioSalida: null,
          fletePorUnidadSalida: null,
          seguroPorItemSalida: null,
          valorFOBSalida: null,
          valorCIFSalida: null,
          idFacturaInformativaAnulado: idFacturaInformativa
        });
      }

      let saldoUnidades = 0;
      let saldoBultos = 0;
      const tarjasRecepcionAux = await this.notificacionRetiroRepository.selectByIdDetalles(facturaInformativaEntity.idNotificacionRetiro);
      const detalleItemProductoAux = await this.detalleItemProductoRepository.selectById(tarjasRecepcionAux[0].idDetalleItemProducto);
      const detalleSolicitudPreviaAux = await this.solicitudPreviaDetalleRepository.findOne(detalleItemProductoAux.idSolicitudPreviaDetalle);
      const solicitudPrevia = await this.solicitudPreviaRepository.selectById(detalleSolicitudPreviaAux.idSolicitudPrevia);

      saldoUnidades = solicitudPrevia.saldoUnidades + facturaInformativaEntity.totalCIF;
      saldoBultos = solicitudPrevia.saldoBultos + facturaInformativaEntity.notificacionRetiro.tarjasRecepcion.length;

      await queryRunner.manager.update(SolicitudPreviaEntity, solicitudPrevia.id, {
        saldoUnidades,
        saldoBultos,
        idFacturaInformativaAnulado: idFacturaInformativa
      });
      facturaInformativaEntity.saldoUnidades = saldoUnidades;
      facturaInformativaEntity.saldoBultos = saldoBultos;
      await queryRunner.manager.update(NotificacionRetiroEntity,
        facturaInformativaEntity.idNotificacionRetiro,
        {estado: AppConstant.ESTADO_NOTIFICACION_RETIRO_SIN_FACTURA_INFORMATIVA,}
      );
      await queryRunner.manager.update(FacturaInformativaEntity, idFacturaInformativa, {
        idNotificacionRetiro: null,
        idNotificacionRetiroAnulado: facturaInformativaEntity.idNotificacionRetiro,
        estado: AppConstant.ESTADO_FACTURA_INFORMATIVA_ANULADO
      });

      await queryRunner.commitTransaction();
      return;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(err)
      throw new BadRequestException('Error al deshacer la factura informativa, intente nuevamente.');
    } finally {
      await queryRunner.release();
    }
  }

  selectAll(): Promise<FacturaInformativaEntity[]> {
    return this.repository.find({
      join: {
        alias: 'facturaInformativa',
        leftJoinAndSelect: {
          notificacionRetiro: 'facturaInformativa.notificacionRetiro',
        },
      },
      order: {
        fechaHoraRegistro: "DESC"
      }
    });
  }

  async selectByIdAllInformation(id: number): Promise<any | undefined> {
    const facturaInformativaInfo = {} as FacturaInformativaAllInformacionDto;
    const facturaInformativa = await this.repository.findOne(id, {
      join: {
        alias: 'facturaInformativa',
        leftJoinAndSelect: {
          notificacionRetiro: 'facturaInformativa.notificacionRetiro',
          personaAutorizada: 'notificacionRetiro.personaAutorizada',
          tarjasRecepcion: 'notificacionRetiro.tarjasRecepcion',
          detalleItemProducto: 'tarjasRecepcion.detalleItemProducto',
          solicitudPreviaDetalle: 'detalleItemProducto.solicitudPreviaDetalle',
        },
      },
    });
    if (facturaInformativa && facturaInformativa.notificacionRetiro &&
      facturaInformativa.notificacionRetiro.tarjasRecepcion.length > 0 &&
      facturaInformativa.notificacionRetiro.tarjasRecepcion[0].detalleItemProducto &&
      facturaInformativa.notificacionRetiro.tarjasRecepcion[0].detalleItemProducto.solicitudPreviaDetalle) {
      const solicitudPreviaDetalle = await this.solicitudPreviaDetalleRepository.findOne({
        where: {id: facturaInformativa.notificacionRetiro.tarjasRecepcion[0].detalleItemProducto.solicitudPreviaDetalle.id},
        join: {
          alias: 'solicitudPreviaDetalle',
          leftJoinAndSelect: {
            matriculaAfianzada: 'solicitudPreviaDetalle.matriculaAfianzada',
            solicitudPrevia: 'solicitudPreviaDetalle.solicitudPrevia',
            exportador: 'solicitudPrevia.exportador',
            cliente: 'solicitudPrevia.cliente',
          },
        },
      });
      facturaInformativaInfo.numeroParcial = facturaInformativa.notificacionRetiro.numeroParcial;
      facturaInformativaInfo.cliente = solicitudPreviaDetalle.solicitudPrevia.cliente;
      facturaInformativaInfo.exportador = solicitudPreviaDetalle.solicitudPrevia.exportador;
      facturaInformativaInfo.matriculaAfianzada = solicitudPreviaDetalle.matriculaAfianzada;
      delete solicitudPreviaDetalle.solicitudPrevia.cliente;
      delete solicitudPreviaDetalle.solicitudPrevia.exportador;
      facturaInformativaInfo.solicitudPrevia = solicitudPreviaDetalle.solicitudPrevia;
      facturaInformativaInfo.detallesItem = facturaInformativa.notificacionRetiro.tarjasRecepcion.map(t => t.detalleItemProducto);
      delete facturaInformativa.notificacionRetiro;
      facturaInformativaInfo.facturaInformativa = facturaInformativa;
    }
    return facturaInformativaInfo;
  }

  selectJoinNotificacionRetiroJoinTarjaRecepcionJoinDetalleItemProductoJoinSolicitudPreviaDetalle(id: number): Promise<FacturaInformativaEntity> {
    return this.repository.findOne(id, {
      join: {
        alias: 'facturaInformativa',
        leftJoinAndSelect: {
          notificacionRetiro: 'facturaInformativa.notificacionRetiro',
          tarjasRecepcion: 'notificacionRetiro.tarjasRecepcion',
          detalleItemProducto: 'tarjasRecepcion.detalleItemProducto',
          solicitudPreviaDetalle: 'detalleItemProducto.solicitudPreviaDetalle',
        },
      },
    });
  }

  selectById(id: number): Promise<FacturaInformativaEntity | undefined> {
    return this.repository.findOne({
      where: {id},
      join: {
        alias: 'facturaInformativa',
        leftJoinAndSelect: {
          notificacionRetiro: 'facturaInformativa.notificacionRetiro',
        },
      },
    });
  }

  async selectTarjasPorIdFacturaInformativa(id): Promise<any> {
    const facturaInformativa = await this.selectJoinNotificacionRetiroJoinTarjaRecepcionJoinDetalleItemProductoJoinSolicitudPreviaDetalle(id);
    return facturaInformativa.notificacionRetiro.tarjasRecepcion;
  }

  async selectAllSinNotificacionEgresoVehiculoCompletado(): Promise<FacturaInformativaEntity[]> {
    return this.repository.find({
      where: [
        {estado: AppConstant.ESTADO_FACTURA_INFORMATIVA_SIN_NOTIFICACION_EGRESO},
        {estado: AppConstant.ESTADO_FACTURA_INFORMATIVA_CON_NOTIFICACION_EGRESO_PENDIENTES}
      ]
    });
  }

  selectDatosNotificacionEgreso(id: number): Promise<FacturaInformativaEntity> {
    return this.repository.findOne({
      where: {id},
      join: {
        alias: 'facturaInformativa',
        leftJoinAndSelect: {
          notificacionRetiro: 'facturaInformativa.notificacionRetiro',
          tarjasRecepcion: 'notificacionRetiro.tarjasRecepcion',
          detalleItemProducto: 'tarjasRecepcion.detalleItemProducto',
          rack: 'tarjasRecepcion.rack',
          personaAutorizada: 'notificacionRetiro.personaAutorizada',
          solicitudPreviaDetalle: 'detalleItemProducto.solicitudPreviaDetalle',
          producto: 'solicitudPreviaDetalle.producto',
          solicitudPrevia: 'solicitudPreviaDetalle.solicitudPrevia',
          cliente: 'solicitudPrevia.cliente',
        },
      },
    });
  }

  async selectDatosNotificacionEgresoConVehiculosEnRetiro(id: number) {
    const facturaInformativaEntity = await this.selectDatosNotificacionEgreso(id);
    facturaInformativaEntity.notificacionRetiro.tarjasRecepcion = facturaInformativaEntity.notificacionRetiro.tarjasRecepcion
      .filter(it => it.detalleItemProducto.estado === AppConstant.ESTADO_DETALLE_ITEM_PRODUCTO_RETIRO);
    return facturaInformativaEntity;
  }

  async update(id: number, editarFacturaInformativaDto: EditarFacturaInformativaDto): Promise<FacturaInformativaEntity> {
    const facturaInformativaEntity = await this.selectById(id);
    facturaInformativaEntity.fechaEmision = editarFacturaInformativaDto.fechaEmision;
    facturaInformativaEntity.marcas = editarFacturaInformativaDto.marcas;
    facturaInformativaEntity.importador = editarFacturaInformativaDto.importador;
    facturaInformativaEntity.daiImportacion = editarFacturaInformativaDto.daiImportacion;
    facturaInformativaEntity.conocimientoEmbarque = editarFacturaInformativaDto.conocimientoEmbarque;
    facturaInformativaEntity.direccion = editarFacturaInformativaDto.direccion;
    facturaInformativaEntity.llegadoPorVapor = editarFacturaInformativaDto.llegadoPorVapor;
    facturaInformativaEntity.de = editarFacturaInformativaDto.de;
    facturaInformativaEntity.pesoBruto = 0;
    facturaInformativaEntity.pesoNeto = 0;

    FacturaInformativaRepository.calcularPesoBrutoAndPesoNetoAndTotalFOBAndSeguroAndFleteAndTotalCIFAndValorCAndF(facturaInformativaEntity, editarFacturaInformativaDto.editarDetallesItemProductoDtos.map<DetalleItemProductoDto>(it => ({
      valorFOBSalida: it.valorFOBSalida,
      valorCIFSalida: it.valorCIFSalida,
      seguroPorItemSalida: it.seguroPorItemSalida,
      precioUnitarioSalida: it.precioUnitarioSalida,
      pesoSalida: it.pesoSalida,
      itemSalida: it.itemSalida,
      id: it.id,
      fletePorUnidadSalida: it.fletePorUnidadSalida,
      solicitudPreviaDetalle: null,
      placa: null,
      chasis: null,
      color: null,
      motor: null,
      fechaHoraActualizacion: null,
      fechaHoraRegistro: null,
      estado: null,
      idSolicitudPreviaDetalle: null,
    })));
    for (const detalleItemProducto of editarFacturaInformativaDto.editarDetallesItemProductoDtos) {
      await this.detalleItemProductoRepository.update(detalleItemProducto.id, {
        pesoSalida: detalleItemProducto.pesoSalida,
        itemSalida: detalleItemProducto.itemSalida,
        precioUnitarioSalida: detalleItemProducto.precioUnitarioSalida,
        fletePorUnidadSalida: detalleItemProducto.fletePorUnidadSalida,
        seguroPorItemSalida: detalleItemProducto.seguroPorItemSalida,
        valorFOBSalida: detalleItemProducto.valorFOBSalida,
        valorCIFSalida: detalleItemProducto.valorCIFSalida,
      });
    }
    await this.repository.save(facturaInformativaEntity);

    return facturaInformativaEntity;
  }

  private static calcularPesoBrutoAndPesoNetoAndTotalFOBAndSeguroAndFleteAndTotalCIFAndValorCAndF(facturaInformativaEntity: FacturaInformativaEntity, detalleItemProductoDtos: DetalleItemProductoDto[]) {
    facturaInformativaEntity.pesoBruto = 0;
    facturaInformativaEntity.pesoNeto = 0;
    for (const detalleItemProducto of detalleItemProductoDtos) {
      facturaInformativaEntity.pesoBruto += detalleItemProducto.pesoSalida;
      facturaInformativaEntity.pesoNeto += detalleItemProducto.pesoSalida;
      facturaInformativaEntity.totalFOB += detalleItemProducto.precioUnitarioSalida;
      facturaInformativaEntity.seguro += detalleItemProducto.seguroPorItemSalida;
      facturaInformativaEntity.flete += detalleItemProducto.fletePorUnidadSalida;
      facturaInformativaEntity.totalCIF += detalleItemProducto.valorCIFSalida;
    }
    facturaInformativaEntity.valorCAndF = facturaInformativaEntity.totalFOB + facturaInformativaEntity.flete;
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
