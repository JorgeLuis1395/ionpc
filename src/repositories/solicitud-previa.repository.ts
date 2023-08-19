import {InjectRepository} from '@nestjs/typeorm';
import {Connection, DeleteResult, Repository, UpdateResult} from 'typeorm';
import {SolicitudPreviaEntity} from '../entities/solicitud-previa.entity';
import {BadRequestException, Injectable} from '@nestjs/common';
import {SolicitudPreviaDto} from '../dtos/solicitud-previa.dto';
import {SolicitudPreviaDetalleEntity} from '../entities/solicitud-previa-detalle.entity';
import {ClienteEntity} from '../entities/cliente.entity';
import {ExportadorEntity} from '../entities/exportador.entity';
import {AppConstant} from '../app.constant';
import {PuertoEmbarqueRepository} from './puerto-embarque.repository';
import {PuertoDespachoRepository} from './puerto-despacho.repository';
import {ProductoRepository} from "./producto.repository";
import {ExportadorRepository} from "./exportador.repository";
import {ClienteRepository} from "./cliente.repository";
import {ParametroReferenciaRepository} from "./parametro-referencia.repository";
import {ParametroReferenciaEntity} from "../entities/parametro-referencia.entity";

@Injectable()
export class SolicitudPreviaRepository {
  constructor(
    @InjectRepository(SolicitudPreviaEntity) private readonly repository: Repository<SolicitudPreviaEntity>,
    @InjectRepository(SolicitudPreviaDetalleEntity) private readonly repositorySolicitudPreviaDetalle: Repository<SolicitudPreviaDetalleEntity>,
    private readonly clienteRepository: ClienteRepository,
    private readonly exportadorRepository: ExportadorRepository,
    private readonly productoRepository: ProductoRepository,
    private readonly parametroReferenciaRepository: ParametroReferenciaRepository,
    private readonly puertoEmbarqueRepository: PuertoEmbarqueRepository,
    private readonly puertoDespachoRepository: PuertoDespachoRepository,
    private readonly connection: Connection
  ) {
  }

  async insert(solicitudPreviaDto: SolicitudPreviaDto): Promise<SolicitudPreviaEntity> {
    if (!solicitudPreviaDto.solicitudPreviaDetallesDtos || solicitudPreviaDto.solicitudPreviaDetallesDtos.length === 0) {
      throw new BadRequestException('Ingrese al menos un detalle de la solicitud previa.');
    }

    const cliente: ClienteEntity = await this.clienteRepository.selectById(solicitudPreviaDto.idCliente);
    if (!cliente) {
      throw new BadRequestException(`El cliente con id ${solicitudPreviaDto.idCliente} no se encuentra registrado, verifique e intente nuevamente.`);
    }

    const exportador: ExportadorEntity = await this.exportadorRepository.selectById(solicitudPreviaDto.idExportador);
    if (!exportador) {
      throw new BadRequestException(`El exportador con id ${solicitudPreviaDto.idExportador} no se encuentra registrado, verifique e intente nuevamente.`);
    }

    const puertoEmbarqueEntity = await this.puertoEmbarqueRepository.selectById(solicitudPreviaDto.idPuertoEmbarque);
    if (!puertoEmbarqueEntity) {
      throw new BadRequestException(`El puerto de embarque con id ${solicitudPreviaDto.idExportador} no se encuentra registrado, verifique e intente nuevamente.`);
    }

    const puertoDespachoEntity = await this.puertoDespachoRepository.selectById(solicitudPreviaDto.idPuertoDespacho);
    if (!puertoDespachoEntity) {
      throw new BadRequestException(`El puerto de desapacho con id ${solicitudPreviaDto.idExportador} no se encuentra registrado, verifique e intente nuevamente.`);
    }

    const solicitudPreviaDetallesEntities: SolicitudPreviaDetalleEntity[] = [];

    let totalFOB = 0;
    let fleteYGastos = 0;
    let valorCAndF: number;
    let seguro = 0;
    let totalCIF: number;
    let totalUnidades = 0;

    const detallesSolicitudPreviaDetalleEntities: SolicitudPreviaDetalleEntity[] = [];
    for (const value of solicitudPreviaDto.solicitudPreviaDetallesDtos) {
      const productoEntity = await this.productoRepository.selectById(value.idProducto);
      if (productoEntity) {
        const auxSolicitudPreviaDetalleEntity: SolicitudPreviaDetalleEntity = {
          item: value.item,
          descripcion: productoEntity.descripcion,
          partidaArancelaria: productoEntity.partidaArancelaria,
          cantidad: value.cantidad,
          precioUnitario: value.precioUnitario,
          fletePorUnidad: value.fletePorUnidad,
          seguroPorItem: value.seguroPorItem,
          valorFOB: null,
          valorCIF: null,
          estado: AppConstant.ESTADO_SOLICITUD_PREVIA_DETALLE_CREADO,
          solicitudPrevia: null,
          idProducto: value.idProducto,
          matriculaAfianzada: null,
          detallesItemProducto: null,
        };
        auxSolicitudPreviaDetalleEntity.saldo = value.cantidad;
        solicitudPreviaDetallesEntities.push(auxSolicitudPreviaDetalleEntity);
        totalFOB += value.precioUnitario * value.cantidad;
        seguro += value.seguroPorItem;
        fleteYGastos += value.fletePorUnidad;
        totalUnidades += value.cantidad;

        auxSolicitudPreviaDetalleEntity.valorFOB = auxSolicitudPreviaDetalleEntity.precioUnitario * auxSolicitudPreviaDetalleEntity.cantidad;
        auxSolicitudPreviaDetalleEntity.valorCIF = auxSolicitudPreviaDetalleEntity.valorFOB + auxSolicitudPreviaDetalleEntity.fletePorUnidad + auxSolicitudPreviaDetalleEntity.seguroPorItem;
        detallesSolicitudPreviaDetalleEntities.push(auxSolicitudPreviaDetalleEntity);
      } else {
        throw new BadRequestException(`El producto con id ${value.idProducto} no se encuentra registrado, verifique e intente nuevamente.`);
      }
    }
    valorCAndF = totalFOB + fleteYGastos;
    totalCIF = valorCAndF + seguro;

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(SolicitudPreviaDetalleEntity, detallesSolicitudPreviaDetalleEntities);
      const parametrosRefrencia = await queryRunner.manager.findOne(ParametroReferenciaEntity, {codigoProceso: AppConstant.CODIGO_PROCESO_SOLICITUD_PREVIA});
      let codigoReferenciaAux = solicitudPreviaDto.codigoReferencia;
      if (parametrosRefrencia) {
        codigoReferenciaAux = parametrosRefrencia.codigo + ('' + parametrosRefrencia.indice).padStart(parametrosRefrencia.maximoTamanio, '0');
      }
      const solicitudPreviaEntity: SolicitudPreviaEntity = {
        codigoReferencia: codigoReferenciaAux,
        numeroPedido: solicitudPreviaDto.numeroPedido,
        direccion: solicitudPreviaDto.direccion,
        idPuertoEmbarque: solicitudPreviaDto.idPuertoEmbarque,
        idPuertoDespacho: solicitudPreviaDto.idPuertoDespacho,
        fechaAproximadaLlegada: solicitudPreviaDto.fechaAproximadaLlegada,
        fechaEmision: solicitudPreviaDto.fechaEmision,
        totalFOB,
        fleteYGastos,
        valorCAndF,
        seguro,
        totalCIF,
        totalUnidades,
        importador: solicitudPreviaDto.importador,
        almacenera: solicitudPreviaDto.almacenera,
        estado: AppConstant.ESTADO_SOLICITUD_PREVIA_CREADO,
        cliente,
        exportador,
        solicitudPreviaDetalles: solicitudPreviaDetallesEntities,
        matriculasAfianzadas: null,
      };
      await queryRunner.manager.save(SolicitudPreviaEntity, solicitudPreviaEntity);
      parametrosRefrencia.indice++;
      await queryRunner.manager.update(ParametroReferenciaEntity, parametrosRefrencia.id, {indice: parametrosRefrencia.indice});
      await queryRunner.commitTransaction();
      return solicitudPreviaEntity;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Error el guardar la solicitud previa, intente nuevamente.');
    } finally {
      await queryRunner.release();
    }
  }

  selectAll(): Promise<SolicitudPreviaEntity[]> {
    return this.repository.find({
      join: {
        alias: 'solicitudPrevia',
        leftJoinAndSelect: {
          puertoEmbarque: 'solicitudPrevia.puertoEmbarque',
          puertoDespacho: 'solicitudPrevia.puertoDespacho',
        },
      },
      order: {
        fechaHoraRegistro: "DESC"
      }
    });
  }

  selectById(id: number): Promise<SolicitudPreviaEntity | undefined> {
    return this.repository.findOne({
      where: {id},
      join: {
        alias: 'solicitudPrevia',
        leftJoinAndSelect: {
          puertoEmbarque: 'solicitudPrevia.puertoEmbarque',
          puertoDespacho: 'solicitudPrevia.puertoDespacho',
        },
      },
    });
  }

  async selectByIdAllInformation(id: number): Promise<any | undefined> {
    const solicitudPrevia = await this.repository.findOne({
      where: {id},
      join: {
        alias: 'solicitudPrevia',
        leftJoinAndSelect: {
          puertoEmbarque: 'solicitudPrevia.puertoEmbarque',
          puertoDespacho: 'solicitudPrevia.puertoDespacho',
        },
      },
    });
    const cliente = await this.clienteRepository.selectById(solicitudPrevia.idCliente);
    const exportador = await this.exportadorRepository.selectById(solicitudPrevia.idExportador);
    const solicitudPreviaDetalles = await this.repositorySolicitudPreviaDetalle.find({idSolicitudPrevia: solicitudPrevia.id});
    const objeto = {
      solicitudPreviaDetalles,
      solicitudPrevia,
      exportador,
      cliente,
    };
    return objeto;
  }

  selectSolicitudesDetalleByIdSolicitudPrevia(id: number): Promise<SolicitudPreviaDetalleEntity[] | undefined> {
    return this.repositorySolicitudPreviaDetalle.find({where: {idSolicitudPrevia: id}});
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  updateEstado(id: number, estado: number): Promise<UpdateResult> {
    return this.repository.update(id, {estado});
  }

  async updateEstadoToCancelado(id: number) {
    const {estado, codigoReferencia} = await this.repository.findOne({
      select: ["estado", "numeroPedido", "codigoReferencia"],
      where: {id}
    });
    if (estado === AppConstant.ESTADO_SOLICITUD_PREVIA_CREADO) {
      return this.repository.update(id, {estado: AppConstant.ESTADO_SOLICITUD_PREVIA_CANCELADO});
    } else {
      if (estado === AppConstant.ESTADO_SOLICITUD_PREVIA_CANCELADO) {
        throw new BadRequestException(`La solicitud previa ${codigoReferencia} ya se encuentra cancelada.`);
      } else {
        throw new BadRequestException(`La solicitud previa ${codigoReferencia} no puede ser cancelada debido a que se encuentra en estado ${this.obtenerNombreEstado(estado)}.`);
      }
    }
  }

  async updateEstadoToCreado(id: number) {
    const {estado, codigoReferencia} = await this.repository.findOne({
      select: ["estado", "codigoReferencia"],
      where: {id}
    });
    if (estado === AppConstant.ESTADO_SOLICITUD_PREVIA_CANCELADO) {
      return this.repository.update(id, {estado: AppConstant.ESTADO_SOLICITUD_PREVIA_CREADO});
    } else {
      if (estado === AppConstant.ESTADO_SOLICITUD_PREVIA_CREADO) {
        throw new BadRequestException(`La solicitud previa ${codigoReferencia} ya se encuentra habilitada.`);
      } else {
        throw new BadRequestException(`La solicitud previa ${codigoReferencia} no puede ser habilitada debido a que se encuentra en estado ${this.obtenerNombreEstado(estado)}.`);
      }
    }
  }

  private obtenerNombreEstado(estado: number) {
    switch (estado) {
      case AppConstant.ESTADO_SOLICITUD_PREVIA_CANCELADO:
        return 'CANCELADO';
      case AppConstant.ESTADO_SOLICITUD_PREVIA_CREADO:
        return 'CREADO';
      case AppConstant.ESTADO_SOLICITUD_PREVIA_MATRICULA:
        return 'MATRICULA AFIANZADA CREADA';
      case AppConstant.ESTADO_SOLICITUD_PREVIA_TARJAS_COMPLETADAS:
        return 'TARJAS COMPLETADAS';
      default:
        return 'NO DEFINIDO';
    }
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
