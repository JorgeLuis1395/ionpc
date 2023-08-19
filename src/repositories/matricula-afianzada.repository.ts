import {InjectRepository} from '@nestjs/typeorm';
import {Connection, DeleteResult, InsertResult, Repository, UpdateResult} from 'typeorm';
import {MatriculaAfianzadaEntity} from '../entities/matricula-afianzada.entity';
import {BadRequestException, Injectable, Logger} from '@nestjs/common';
import {DetalleItemProductoEntity} from '../entities/detalle-item-producto.entity';
import {SolicitudPreviaEntity} from '../entities/solicitud-previa.entity';
import {SolicitudPreviaDetalleEntity} from '../entities/solicitud-previa-detalle.entity';
import {ClienteEntity} from '../entities/cliente.entity';
import {AppConstant} from '../app.constant';
import {EditarMatriculaAfianzadaDto} from "../dtos/matricula-afianzada.dto";
import {ParametroReferenciaRepository} from "./parametro-referencia.repository";
import {ParametroReferenciaEntity} from "../entities/parametro-referencia.entity";
import {QueryRunner} from "typeorm/index";
import {TarjaRecepcionVehiculoEntity} from "../entities/tarja-recepcion-vehiculo.entity";
import {NotificacionRetiroEntity} from "../entities/notificacion-retiro.entity";

@Injectable()
export class MatriculaAfianzadaRepository {
  constructor(
    @InjectRepository(MatriculaAfianzadaEntity)
    private readonly repository: Repository<MatriculaAfianzadaEntity>,
    @InjectRepository(DetalleItemProductoEntity)
    private readonly repositoryDetalleItemProductoEntity: Repository<DetalleItemProductoEntity>,
    @InjectRepository(SolicitudPreviaDetalleEntity)
    private readonly repositorySolicitudPreviaDetalle: Repository<SolicitudPreviaDetalleEntity>,
    @InjectRepository(SolicitudPreviaEntity)
    private readonly repositorySolicitudPrevia: Repository<SolicitudPreviaEntity>,
    @InjectRepository(ClienteEntity)
    private readonly repositoryCliente: Repository<ClienteEntity>,
    private readonly parametroRepository: ParametroReferenciaRepository,
    private connection: Connection,
  ) {
  }

  async insert(entity: MatriculaAfianzadaEntity): Promise<InsertResult> {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const parametrosRefrencia = await queryRunner.manager.findOne(ParametroReferenciaEntity, {codigoProceso: AppConstant.CODIGO_PROCESO_MATRICULA_AFIANZADA});
      if (parametrosRefrencia) {
        entity.numeroTitulo = parametrosRefrencia.codigo + ('' + parametrosRefrencia.indice).padStart(parametrosRefrencia.maximoTamanio, '0');
      }
      entity.estado = AppConstant.ESTADO_MATRICULA_AFIANZADA_VIGENTE;
      const matriculaAfainzada = await queryRunner.manager.insert(MatriculaAfianzadaEntity, entity);
      parametrosRefrencia.indice++;
      await queryRunner.manager.update(ParametroReferenciaEntity, parametrosRefrencia.id, {indice: parametrosRefrencia.indice});
      for (const it of entity.solicitudPreviaDetalles) {
        it.detallesItemProducto.forEach((obj: DetalleItemProductoEntity) => {
          obj.solicitudPreviaDetalle = it;
          obj.estado = AppConstant.ESTADO_DETALLE_ITEM_PRODUCTO_NO_REVISADO;
        });
        await queryRunner.manager.save(DetalleItemProductoEntity, it.detallesItemProducto);
        it.idMatriculaAfianzada = matriculaAfainzada.identifiers[0].id;
        it.estado = 2;
        delete it.detallesItemProducto;
        delete it.fechaHoraActualizacion;
        delete it.fechaHoraRegistro;
        await queryRunner.manager.update(SolicitudPreviaDetalleEntity, it.id, it);
      }

      await queryRunner.commitTransaction();
      return matriculaAfainzada;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Error el guardar la matricula afianzada, intente nuevamente.');
    } finally {
      await queryRunner.release();
    }
  }

  async anular(id: number): Promise<void> {
    const matriculaAfianzada = await this.repository.findOne({
      where: {
        id
      },
      join: {
        alias: 'matriculaAfianzada',
        leftJoinAndSelect: {
          solicitudPreviaDetalles: 'matriculaAfianzada.solicitudPreviaDetalles',
          detallesItemProducto: 'solicitudPreviaDetalles.detallesItemProducto',
        }
      }
    });

    for (let solicitudPreviaDetalle of matriculaAfianzada.solicitudPreviaDetalles) {
      for (let detalleItemProducto of solicitudPreviaDetalle.detallesItemProducto) {
        const tarjaRecepcionVehiculoEntity = await this.connection.manager.findOne(TarjaRecepcionVehiculoEntity, {where: {idDetalleItemProducto: detalleItemProducto.id}});
        if (tarjaRecepcionVehiculoEntity && tarjaRecepcionVehiculoEntity.idNotificacionRetiro) {
          const notificacionRetiroEntity = await this.connection.manager.findOne(NotificacionRetiroEntity, tarjaRecepcionVehiculoEntity.idNotificacionRetiro);
          throw new BadRequestException(`Debe anular primero la notificación de retiro ${notificacionRetiroEntity.codigoReferencia}.`);
        }
      }
    }

    const queryRunner: QueryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const matriculaAfianzada = await queryRunner.manager.findOne(MatriculaAfianzadaEntity, {
        where: {
          id
        },
        join: {
          alias: 'matriculaAfianzada',
          leftJoinAndSelect: {
            solicitudPreviaDetalles: 'matriculaAfianzada.solicitudPreviaDetalles',
            detallesItemProducto: 'solicitudPreviaDetalles.detallesItemProducto',
          }
        }
      });

      for (let solicitudPreviaDetalle of matriculaAfianzada.solicitudPreviaDetalles) {
        for (let detalleItemProducto of solicitudPreviaDetalle.detallesItemProducto) {
          const tarjaRecepcionVehiculoEntity = await queryRunner.manager.findOne(TarjaRecepcionVehiculoEntity, {
            where: {
              idDetalleItemProducto: detalleItemProducto.id
            }
          });
          if (tarjaRecepcionVehiculoEntity && tarjaRecepcionVehiculoEntity.idNotificacionRetiro) {
            throw new Error();
          }
        }
      }


      await queryRunner.manager.update(MatriculaAfianzadaEntity, id, {
        idSolicitudPrevia: null,
        idSolicitudPreviaAnulado: matriculaAfianzada.idSolicitudPrevia,
        estado: AppConstant.ESTADO_MATRICULA_AFIANZADA_ANULADO
      });

      await queryRunner.manager.update(SolicitudPreviaEntity, matriculaAfianzada.idSolicitudPrevia, {
        estado: AppConstant.ESTADO_SOLICITUD_PREVIA_CREADO
      });

      for (let solicitudPreviaDetalle of matriculaAfianzada.solicitudPreviaDetalles) {
        await queryRunner.manager.update(SolicitudPreviaDetalleEntity, solicitudPreviaDetalle.id, {
          estado: AppConstant.ESTADO_SOLICITUD_PREVIA_DETALLE_CREADO,
          idMatriculaAfianzada: null,
          idMatriculaAfianzadaCancelado: solicitudPreviaDetalle.idMatriculaAfianzada
        });

        for (let detalleItemProducto of solicitudPreviaDetalle.detallesItemProducto) {
          await queryRunner.manager.update(DetalleItemProductoEntity, detalleItemProducto.id, {
            idSolicitudPreviaDetalle: null,
            idSolicitudPreviaDetalleAnulado: detalleItemProducto.idSolicitudPreviaDetalle
          });
        }
      }

      await queryRunner.commitTransaction();
      return;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      const mensaje = `Error al anular la matricula afianzada ${id}, intente nuevamente.`;
      Logger.error(mensaje, err.toString(), MatriculaAfianzadaRepository.name);
      throw new BadRequestException(mensaje);
    } finally {
      await queryRunner.release();
    }
  }

  selectAll(): Promise<MatriculaAfianzadaEntity[]> {
    return this.repository.find({
      order: {
        fechaHoraRegistro: "DESC"
      }
    });
  }

  async selectAllSinFinalizarNotificacionRetiro(): Promise<MatriculaAfianzadaEntity[]> {
    const matriculasAfianzada = await this.repository.find({
      join: {
        alias: 'matriculaAfianzada',
        leftJoinAndSelect: {
          solicitudPreviaDetalles: 'matriculaAfianzada.solicitudPreviaDetalles',
          detallesItemProducto: 'solicitudPreviaDetalles.detallesItemProducto',
        },
      },
    });
    const matriculaAfianzadaAux = matriculasAfianzada.filter(maAf => {
      if (maAf.solicitudPreviaDetalles) {
        for (const soliDeta of maAf.solicitudPreviaDetalles) {
          for (const detaItem of soliDeta.detallesItemProducto) {
            if (detaItem.estado === AppConstant.ESTADO_DETALLE_ITEM_PRODUCTO_APROBADO ||
              detaItem.estado === AppConstant.ESTADO_DETALLE_ITEM_PRODUCTO_NO_APROBADO) {
              return true;
            }
          }
        }
        return false;
      } else {
        return false;
      }
    }).map(m => {
      delete m.solicitudPreviaDetalles;
      return m;
    });
    return matriculaAfianzadaAux;
  }

  selectById(id: number): Promise<MatriculaAfianzadaEntity | undefined> {
    return this.repository.findOne({id});
  }

  async selectByIdAllInformation(id: number): Promise<any | undefined> {
    const itemProductos: DetalleItemProductoEntity[] = [];
    const matriculaAfianzada = await this.repository.findOne({id});
    const solicitudPrevia = await this.repositorySolicitudPrevia.findOne({id: matriculaAfianzada.idSolicitudPrevia});
    const cliente = await this.repositoryCliente.findOne({id: solicitudPrevia.idCliente});
    const solicitudPreviaDetalles = await this.repositorySolicitudPreviaDetalle.find({
      where: {
        idSolicitudPrevia: matriculaAfianzada.idSolicitudPrevia,
        matriculaAfianzada: matriculaAfianzada,
      },
    });
    for (const sol of solicitudPreviaDetalles) {
      const items = await this.repositoryDetalleItemProductoEntity.find({idSolicitudPreviaDetalle: sol.id});
      for (const item of items) {
        itemProductos.push(item);
      }
    }
    const objeto = {
      solicitudPrevia,
      solicitudPreviaDetalles,
      matriculaAfianzada,
      cliente,
      itemProductos,
    };
    return objeto;
  }

  async selectByIdAllInformationToCreateNotificacion(id: number): Promise<any | undefined> {
    const itemProductos: DetalleItemProductoEntity[] = [];
    const matriculaAfianzada = await this.repository.findOne({id});
    const solicitudPrevia = await this.repositorySolicitudPrevia.findOne({id: matriculaAfianzada.idSolicitudPrevia});
    const cliente = await this.repositoryCliente.findOne({
      where: {id: solicitudPrevia.idCliente},
      join: {
        alias: 'cliente',
        leftJoinAndSelect: {
          personasAutorizadas: 'cliente.personasAutorizadas',
        },
      },
    });
    let estadoParcialOTotal = 1;
    const solicitudPreviaDetalles = await this.repositorySolicitudPreviaDetalle.find({
      where: {
        idSolicitudPrevia: matriculaAfianzada.idSolicitudPrevia,
        matriculaAfianzada: matriculaAfianzada,
      },
    });
    for (const sol of solicitudPreviaDetalles) {
      const items = await this.repositoryDetalleItemProductoEntity.find({idSolicitudPreviaDetalle: sol.id});
      const itemFiltradoEstadoCerrado = items.filter(i => i.estado === AppConstant.ESTADO_DETALLE_ITEM_PRODUCTO_APROBADO ||
        i.estado === AppConstant.ESTADO_DETALLE_ITEM_PRODUCTO_NO_APROBADO);
      for (const item of itemFiltradoEstadoCerrado) {
        itemProductos.push(item);
      }
      if (items.length === itemFiltradoEstadoCerrado.length) {
        estadoParcialOTotal = AppConstant.TIPO_NOTIFICACION_RETIRO_TOTAL;
      } else {
        estadoParcialOTotal = AppConstant.TIPO_NOTIFICACION_RETIRO_PARCIAL;
      }
    }
    const objeto = {
      solicitudPrevia,
      solicitudPreviaDetalles,
      matriculaAfianzada,
      cliente,
      itemProductos,
      estadoParcialOTotal,
    };
    return objeto;
  }

  update(id: number, editarMatriculaAfianzadaDto: EditarMatriculaAfianzadaDto): Promise<UpdateResult> {
    return this.repository.update(id, {
      fechaVencimiento: editarMatriculaAfianzadaDto.fechaVencimiento,
      observaciones: editarMatriculaAfianzadaDto.observaciones,
      referendo: editarMatriculaAfianzadaDto.referendo
    });
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
