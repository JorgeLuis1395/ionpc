import {BadRequestException, forwardRef, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Connection, Repository} from 'typeorm';
import {NotificacionEgresoVehiculoEntity} from '../entities/notificacion-egreso-vehiculo.entity';
import {
  CrearNotificacionEgresoVehiculoDto,
  EditarNotificacionEgresoVehiculoDto
} from '../dtos/notificacion-egreso-vehiculo.dto';
import {ParametroReferenciaRepository} from './parametro-referencia.repository';
import {AppConstant} from '../app.constant';
import {TarjaRecepcionVehiculoRepository} from './tarja-recepcion-vehiculo.repository';
import {SolicitudPreviaDetalleRepository} from './solicitud-previa-detalle.repository';
import {DetalleItemProductoRepository} from './detalle-item-producto.repository';
import {FacturaInformativaRepository} from "./factura-informativa.repository";
import {RackRepository} from "./rack.repository";
import {FacturaInformativaEntity} from "../entities/factura-informativa.entity";
import {ParametroReferenciaEntity} from "../entities/parametro-referencia.entity";
import {DetalleItemProductoEntity} from "../entities/detalle-item-producto.entity";
import {RackEntity} from "../entities/rack.entity";
import {TarjaRecepcionVehiculoEntity} from "../entities/tarja-recepcion-vehiculo.entity";

@Injectable()
export class NotificacionEgresoVehiculoRepository {
  constructor(@InjectRepository(NotificacionEgresoVehiculoEntity)
              private readonly repository: Repository<NotificacionEgresoVehiculoEntity>,
              private readonly parametroReferenciaRepository: ParametroReferenciaRepository,
              @Inject(forwardRef(() => TarjaRecepcionVehiculoRepository))
              private readonly tarjaRecepcionVehiculoRepository: TarjaRecepcionVehiculoRepository,
              private readonly solicitudPreviaDetalleRepository: SolicitudPreviaDetalleRepository,
              private readonly detalleItemProductoRepository: DetalleItemProductoRepository,
              private readonly facturaInformativaRepository: FacturaInformativaRepository,
              private readonly rackRepository: RackRepository,
              private connection: Connection
  ) {
  }

  async insert(crearNotificacionEgresoVehiculoDto: CrearNotificacionEgresoVehiculoDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const parametro = await this.parametroReferenciaRepository.selectOneParametroActual(AppConstant.CODIGO_PROCESO_NOTIFICACION_EGRESO_VEHICULO);
      const numeroNEV = parametro.codigoActual;

      const notificacionEgresoVehiculoEntity: NotificacionEgresoVehiculoEntity = {
        fechaHoraNEV: crearNotificacionEgresoVehiculoDto.fechaHoraNEV,
        numeroNEV,
        numeroDeposito: crearNotificacionEgresoVehiculoDto.numeroDeposito,
        fechaEmision: crearNotificacionEgresoVehiculoDto.fechaEmision,
        saldoTotalEgreso: crearNotificacionEgresoVehiculoDto.saldoTotalEgreso,
        totalGeneralEntregaCantidad: crearNotificacionEgresoVehiculoDto.totalGeneralEntregaCantidad,
        totalGeneralEntregaCIF: crearNotificacionEgresoVehiculoDto.totalGeneralEntregaCIF,
        area: crearNotificacionEgresoVehiculoDto.area,
        saldoArea: crearNotificacionEgresoVehiculoDto.saldoArea,
        observaciones: crearNotificacionEgresoVehiculoDto.observaciones,
        idFacturaInformativa: crearNotificacionEgresoVehiculoDto.idFacturaInformativa,
        estado: AppConstant.ESTADO_NOTIFICACION_EGRESO_VIGENTE
      };
      await queryRunner.manager.save(NotificacionEgresoVehiculoEntity, notificacionEgresoVehiculoEntity);

      const facturaInformativaEntity = await this.facturaInformativaRepository.selectById(crearNotificacionEgresoVehiculoDto.idFacturaInformativa);
      const saldoUnidadesEgreso = facturaInformativaEntity.saldoUnidadesEgreso - notificacionEgresoVehiculoEntity.totalGeneralEntregaCantidad;
      await queryRunner.manager.update(FacturaInformativaEntity, facturaInformativaEntity.id, {saldoUnidadesEgreso});
      if (!facturaInformativaEntity.codigoTipoEntrega) {
        await queryRunner.manager.update(FacturaInformativaEntity, facturaInformativaEntity.id, {codigoTipoEntrega: crearNotificacionEgresoVehiculoDto.codigoTipoEntrega});
        const esRetiroTotal = crearNotificacionEgresoVehiculoDto.codigoTipoEntrega === AppConstant.TIPO_RETIRO_NOTIFICACION_EGRESO_TOTAL.valor;
        if (esRetiroTotal) {
          await queryRunner.manager.update(FacturaInformativaEntity,
            crearNotificacionEgresoVehiculoDto.idFacturaInformativa,
            {estado: AppConstant.ESTADO_FACTURA_INFORMATIVA_CON_NOTIFICACION_EGRESO_COMPLETO}
          );
        } else {
          await queryRunner.manager.update(
            FacturaInformativaEntity,
            crearNotificacionEgresoVehiculoDto.idFacturaInformativa,
            {estado: AppConstant.ESTADO_FACTURA_INFORMATIVA_CON_NOTIFICACION_EGRESO_PENDIENTES}
          );
          await queryRunner.manager.update(
            FacturaInformativaEntity,
            crearNotificacionEgresoVehiculoDto.idFacturaInformativa,
            {estado: AppConstant.ESTADO_FACTURA_INFORMATIVA_CON_NOTIFICACION_EGRESO_PENDIENTES}
          );
        }
      } else {
        if (saldoUnidadesEgreso === 0) {
          await queryRunner.manager.update(
            FacturaInformativaEntity,
            crearNotificacionEgresoVehiculoDto.idFacturaInformativa,
            {estado: AppConstant.ESTADO_FACTURA_INFORMATIVA_CON_NOTIFICACION_EGRESO_COMPLETO}
          )
        }
      }
      await queryRunner.manager.update(ParametroReferenciaEntity, parametro.parametroReferencia.id, {indice: ++parametro.parametroReferencia.indice});

      for (let itemPlaca of crearNotificacionEgresoVehiculoDto.placas) {
        if (itemPlaca.placa) {
          await queryRunner.manager.update(DetalleItemProductoEntity, itemPlaca.idDetalleItemProducto, {placa: itemPlaca.placa});
          await queryRunner.manager.update(DetalleItemProductoEntity, itemPlaca.idDetalleItemProducto, {estado: AppConstant.ESTADO_DETALLE_ITEM_PRODUCTO_EGRESO});
        }
        const tarjaRecepcionVehiculoEntity = await this.tarjaRecepcionVehiculoRepository.selectOneByIdDetalleItemProducto(itemPlaca.idDetalleItemProducto);
        await queryRunner.manager.update(RackEntity, tarjaRecepcionVehiculoEntity.idRack, {
          idTarjaRecepcionActual: null,
          estado: AppConstant.ESTADO_RACK_DISPONIBLE
        });
        await queryRunner.manager.update(TarjaRecepcionVehiculoEntity, tarjaRecepcionVehiculoEntity.id, {idNotificacionEgreso: notificacionEgresoVehiculoEntity.id});
      }
      await queryRunner.commitTransaction();
      return notificacionEgresoVehiculoEntity;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Error el guardar la notificación de egreso del vehículo, intente nuevamente.');
    } finally {
      await queryRunner.release();
    }
  }

  async anular(idNotificacionEgreso: number): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const notificacionEgresoVehiculoEntity = await queryRunner.manager.findOne(NotificacionEgresoVehiculoEntity, {
        where: {id: idNotificacionEgreso},
        join: {
          alias: 'notificacionEgreso',
          leftJoinAndSelect: {
            facturaInformativa: 'notificacionEgreso.facturaInformativa',
            notificacionRetiro: 'facturaInformativa.notificacionRetiro',
            tarjasRecepcion: 'notificacionEgreso.tarjasRecepcionVehiculos',
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

      const facturaInformativaEntity = notificacionEgresoVehiculoEntity.facturaInformativa;
      const saldoUnidadesEgreso = facturaInformativaEntity.saldoUnidadesEgreso + notificacionEgresoVehiculoEntity.totalGeneralEntregaCantidad;
      await queryRunner.manager.update(FacturaInformativaEntity, facturaInformativaEntity.id, {saldoUnidadesEgreso});
      if (facturaInformativaEntity.codigoTipoEntrega) {
        await queryRunner.manager.update(FacturaInformativaEntity, facturaInformativaEntity.id, {codigoTipoEntrega: null});
        await queryRunner.manager.update(FacturaInformativaEntity,
          facturaInformativaEntity.id,
          {estado: AppConstant.ESTADO_FACTURA_INFORMATIVA_CON_NOTIFICACION_EGRESO_PENDIENTES}
        );
      } else {
        await queryRunner.manager.update(
          FacturaInformativaEntity,
          facturaInformativaEntity.id,
          {estado: AppConstant.ESTADO_FACTURA_INFORMATIVA_SIN_NOTIFICACION_EGRESO}
        );
      }

      for (let tarjaRecepcionVehiculoEntity of notificacionEgresoVehiculoEntity.tarjasRecepcionVehiculos) {
        if (tarjaRecepcionVehiculoEntity.detalleItemProducto.placa) {
          await queryRunner.manager.update(DetalleItemProductoEntity, tarjaRecepcionVehiculoEntity.detalleItemProducto.id, {placa: null});
          await queryRunner.manager.update(DetalleItemProductoEntity, tarjaRecepcionVehiculoEntity.detalleItemProducto.id, {estado: AppConstant.ESTADO_DETALLE_ITEM_PRODUCTO_RETIRO});
        }
        await queryRunner.manager.update(RackEntity, tarjaRecepcionVehiculoEntity.idRack, {
          idTarjaRecepcionActual: tarjaRecepcionVehiculoEntity.id,
          estado: AppConstant.ESTADO_RACK_OCUPADO
        });
        await queryRunner.manager.update(TarjaRecepcionVehiculoEntity, tarjaRecepcionVehiculoEntity.id, {
          idNotificacionEgreso: null,
          idNotificacionEgresoAnulado: idNotificacionEgreso
        });
      }
      await queryRunner.manager.update(NotificacionEgresoVehiculoEntity, idNotificacionEgreso, {
        estado: AppConstant.ESTADO_NOTIFICACION_EGRESO_ANULADO,
        idFacturaInformativa: null,
        idFacturaInformativaAnulado: notificacionEgresoVehiculoEntity.idFacturaInformativa
      });
      await queryRunner.commitTransaction();
      return;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Error al anular la notificación de egreso del vehículo, por favor intente nuevamente.');
    } finally {
      await queryRunner.release();
    }
  }

  selectAllByIdTarja(idTarjaRecepcionVehiculo: number): Promise<NotificacionEgresoVehiculoEntity> {
    return this.repository.findOne({
      where: {
        idTarjaRecepcionVehiculo,
      },
    });
  }

  selectDatosReporte(id: number): Promise<NotificacionEgresoVehiculoEntity> {
    return this.repository.findOne({
      where: {id},
      join: {
        alias: 'notificacionEgreso',
        leftJoinAndSelect: {
          facturaInformativa: 'notificacionEgreso.facturaInformativa',
          notificacionRetiro: 'facturaInformativa.notificacionRetiro',
          tarjasRecepcion: 'notificacionEgreso.tarjasRecepcionVehiculos',
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

  select(): Promise<NotificacionEgresoVehiculoEntity[]> {
    return this.repository.find({
      order: {
        fechaHoraRegistro: "DESC"
      }
    });
  }

  selectById(id: number) {
    return this.repository.findOne({id});
  }

  async update(id: number, editarDto: EditarNotificacionEgresoVehiculoDto): Promise<void> {
    await this.repository.update(id, {
      fechaHoraNEV: editarDto.fechaHoraNEV,
      fechaEmision: editarDto.fechaEmision,
      observaciones: editarDto.observaciones,
    });
    for (const placaDto of editarDto.editarPlacasDtos) {
      await this.detalleItemProductoRepository.update(placaDto.idDetalleItemProducto, {placa: placaDto.placa});
    }
  }
}
