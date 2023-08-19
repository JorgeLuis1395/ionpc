import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Connection, DeleteResult, InsertResult, Repository, UpdateResult} from 'typeorm';
import {NotificacionRetiroEntity} from '../entities/notificacion-retiro.entity';
import {CrearNotificacionRetiroDto} from '../dtos/crear-notificacion-retiro.dto';
import {DetalleItemProductoEntity} from '../entities/detalle-item-producto.entity';
import {AppConstant} from '../app.constant';
import {TarjaRecepcionVehiculoEntity} from '../entities/tarja-recepcion-vehiculo.entity';
import {ParametroReferenciaEntity} from '../entities/parametro-referencia.entity';
import {SolicitudPreviaDetalleEntity} from '../entities/solicitud-previa-detalle.entity';
import {MatriculaAfianzadaEntity} from '../entities/matricula-afianzada.entity';
import {UsuarioEntity} from '../entities/usuario.entity';
import {EditarNotificacionRetiroDto} from "../dtos/notificacion-retiro.dto";
import {FacturaInformativaEntity} from "../entities/factura-informativa.entity";

@Injectable()
export class NotificacionRetiroRepository {
  constructor(
    @InjectRepository(NotificacionRetiroEntity)
    private readonly repository: Repository<NotificacionRetiroEntity>,
    @InjectRepository(DetalleItemProductoEntity)
    private readonly detalleItemRepository: Repository<DetalleItemProductoEntity>,
    @InjectRepository(TarjaRecepcionVehiculoEntity)
    private readonly tarjaRecepcionVehiculoRepository: Repository<TarjaRecepcionVehiculoEntity>,
    @InjectRepository(SolicitudPreviaDetalleEntity)
    private readonly solicitudDetalleRepository: Repository<SolicitudPreviaDetalleEntity>,
    @InjectRepository(ParametroReferenciaEntity)
    private readonly repositoryParametroReferencia: Repository<ParametroReferenciaEntity>,
    @InjectRepository(MatriculaAfianzadaEntity)
    private readonly matriculaAfianzadaRepository: Repository<MatriculaAfianzadaEntity>,
    private connection: Connection
  ) {
  }

  async insert(crearNotificacionRetiroDto: CrearNotificacionRetiroDto): Promise<InsertResult> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (crearNotificacionRetiroDto.detallesItem && crearNotificacionRetiroDto.detallesItem[0]) {
        const solicitudDetalleAux = await this.solicitudDetalleRepository.findOne({
          where: {id: crearNotificacionRetiroDto.detallesItem[0].idSolicitudPreviaDetalle},
          join: {
            alias: 'soliDetalle',
            leftJoinAndSelect: {
              matriculaAfianzada: 'soliDetalle.matriculaAfianzada',
            },
          },
        });
        if (solicitudDetalleAux.matriculaAfianzada &&
          crearNotificacionRetiroDto.notificacionRetiro.tipoRetiro !== AppConstant.TEXTO_TIPO_NOTIFICACION_RETIRO_TOTAL_PARCIAL[0]) {
          if (solicitudDetalleAux.matriculaAfianzada.totalParcial && solicitudDetalleAux.matriculaAfianzada.totalParcial > 0) {
            crearNotificacionRetiroDto.notificacionRetiro.numeroParcial = solicitudDetalleAux.matriculaAfianzada.totalParcial + 1;
          } else {
            crearNotificacionRetiroDto.notificacionRetiro.numeroParcial = 1;
          }
          await queryRunner.manager.update(MatriculaAfianzadaEntity, {id: solicitudDetalleAux.matriculaAfianzada.id}, {totalParcial: crearNotificacionRetiroDto.notificacionRetiro.numeroParcial});
        } else {
          crearNotificacionRetiroDto.notificacionRetiro.numeroParcial = null;
        }
      }
      const parametrosRefrencia = await this.repositoryParametroReferencia.findOne({codigoProceso: AppConstant.CODIGO_PROCESO_NOTIFICACION_RETIRO});
      if (parametrosRefrencia) {
        crearNotificacionRetiroDto.notificacionRetiro.codigoReferencia = parametrosRefrencia.codigo + ('' + parametrosRefrencia.indice).padStart(parametrosRefrencia.maximoTamanio, '0');
      }
      crearNotificacionRetiroDto.notificacionRetiro.estado = AppConstant.ESTADO_NOTIFICACION_RETIRO_SIN_FACTURA_INFORMATIVA;
      const insertNotificacionRetiro = await queryRunner.manager.insert(NotificacionRetiroEntity, crearNotificacionRetiroDto.notificacionRetiro);
      if (parametrosRefrencia) {
        parametrosRefrencia.indice++;
        await this.repositoryParametroReferencia.update(parametrosRefrencia.id, {indice: parametrosRefrencia.indice});
      }
      if (crearNotificacionRetiroDto.detallesItem) {
        for (const detalleItem of crearNotificacionRetiroDto.detallesItem) {
          await queryRunner.manager.update(DetalleItemProductoEntity, detalleItem.id, {estado: AppConstant.ESTADO_DETALLE_ITEM_PRODUCTO_RETIRO});
          await queryRunner.manager.update(TarjaRecepcionVehiculoEntity, {idDetalleItemProducto: detalleItem.id}, {idNotificacionRetiro: insertNotificacionRetiro.identifiers[0].id});
        }
      }
      await queryRunner.commitTransaction();
      return insertNotificacionRetiro;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Error el guardar la notificación de retiro del vehículo, intente nuevamente.');
    } finally {
      await queryRunner.release();
    }
  }

  async anular(idNotificacionRetiro): Promise<void> {
    const facturaInformativaEntity = await this.connection.manager.findOne(FacturaInformativaEntity, {
      where: {
        idNotificacionRetiro
      }
    });
    if (facturaInformativaEntity && facturaInformativaEntity.id) {
      throw new BadRequestException(`Debe anular la factura informativa ${facturaInformativaEntity.numeroFI} antes de anular la notificación de retiro.`);
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const notificacionRetiroEntity = await queryRunner.manager.findOne(NotificacionRetiroEntity, idNotificacionRetiro, {
      where: {
        id: idNotificacionRetiro
      },
      join: {
        alias: 'notificacionRetiro',
        leftJoinAndSelect: {
          tarjasRecepcion: 'notificacionRetiro.tarjasRecepcion',
          detalleItemProducto: 'tarjasRecepcion.detalleItemProducto',
          solicitudPreviaDetalle: 'detalleItemProducto.solicitudPreviaDetalle',
          matriculaAfianzada: 'solicitudPreviaDetalle.matriculaAfianzada',
        }
      }
    });

    if (!notificacionRetiroEntity) {
      throw new BadRequestException('La notificación de retiro ingresada no existe.');
    }

    if (!notificacionRetiroEntity.tarjasRecepcion || notificacionRetiroEntity.tarjasRecepcion.length === 0) {
      throw new BadRequestException('La notificación de retiro ingresada no tiene ninguna tarja de recepción.');
    }

    try {
      const matriculaAfianzadaEntity = notificacionRetiroEntity.tarjasRecepcion[0].detalleItemProducto.solicitudPreviaDetalle.matriculaAfianzada;
      await queryRunner.manager.update(
        MatriculaAfianzadaEntity,
        matriculaAfianzadaEntity.id,
        {
          totalParcial: (matriculaAfianzadaEntity.totalParcial - 1),
          idNotificacionRetiroAnulado: idNotificacionRetiro
        }
      );

      for (const tarjaRecepcionVehiculoEntity of notificacionRetiroEntity.tarjasRecepcion) {
        await queryRunner.manager.update(DetalleItemProductoEntity,
          tarjaRecepcionVehiculoEntity.detalleItemProducto.id,
          {
            estado: AppConstant.ESTADO_DETALLE_ITEM_PRODUCTO_APROBADO,
            idNotificacionRetiroAnulado: idNotificacionRetiro
          }
        );
        await queryRunner.manager.update(
          TarjaRecepcionVehiculoEntity,
          tarjaRecepcionVehiculoEntity.id,
          {
            idNotificacionRetiro: null,
            idNotificacionRetiroAnulado: idNotificacionRetiro
          }
        );
      }
      await queryRunner.manager.update(NotificacionRetiroEntity, idNotificacionRetiro, {
        estado: AppConstant.ESTADO_NOTIFICACION_RETIRO_ANULADO
      });
      await queryRunner.commitTransaction();
      return
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Error el eliminar la notificación de retiro del vehículo, intente nuevamente.');
    } finally {
      await queryRunner.release();
    }
  }

  async selectByIdAllInformation(id: number): Promise<any | undefined> {
    const notificaionRetiro = await this.repository.findOne(id, {
      join: {
        alias: 'notificacionRetiro',
        leftJoinAndSelect: {
          personaAutorizada: 'notificacionRetiro.personaAutorizada',
          usuario: 'notificacionRetiro.usuario',
          tarjasRecepcion: 'notificacionRetiro.tarjasRecepcion',
          detalleItemProducto: 'tarjasRecepcion.detalleItemProducto',
          solicitudPreviaDetalle: 'detalleItemProducto.solicitudPreviaDetalle',
          matriculaAfianzada: 'solicitudPreviaDetalle.matriculaAfianzada',
        },
      },
    });
    if (notificaionRetiro.usuario) {
      const usuario = {} as UsuarioEntity;
      usuario.nombre = notificaionRetiro.usuario.nombre;
      usuario.apellido = notificaionRetiro.usuario.apellido;
      usuario.nickname = notificaionRetiro.usuario.nickname;
      notificaionRetiro.usuario = usuario;
    }
    return notificaionRetiro;
  }

  async selectAll(): Promise<NotificacionRetiroEntity[]> {
    const notificaionRetiro = await this.repository.find({
      join: {
        alias: 'notificacionRetiro',
        leftJoinAndSelect: {
          personaAutorizada: 'notificacionRetiro.personaAutorizada',
        },
      },
      order: {
        fechaHoraRegistro: "DESC"
      }
    });
    for (const noti of notificaionRetiro) {
      if (noti.usuario) {
        delete noti.usuario;
      }
    }
    return notificaionRetiro;
  }

  async selectAllSinFacturaInformativa(): Promise<NotificacionRetiroEntity[]> {
    const notificaionRetiro = await this.repository.find({
      where: {
        estado: AppConstant.ESTADO_NOTIFICACION_RETIRO_SIN_FACTURA_INFORMATIVA,
      },
      join: {
        alias: 'notificacionRetiro',
        leftJoinAndSelect: {
          personaAutorizada: 'notificacionRetiro.personaAutorizada',
        },
      },
    });
    for (const noti of notificaionRetiro) {
      if (noti.usuario) {
        delete noti.usuario;
      }
    }
    return notificaionRetiro;
  }

  async selectById(id: number): Promise<NotificacionRetiroEntity | undefined> {
    const notificaionRetiro = await this.repository.findOne({id});
    if (notificaionRetiro.usuario) {
      delete notificaionRetiro.usuario;
    }
    return notificaionRetiro;
  }

  async selectByIdDetalles(id: number): Promise<TarjaRecepcionVehiculoEntity[] | undefined> {
    const notificaionRetiro = await this.repository.findOne({
      where: {id},
      join: {
        alias: 'notificacion',
        leftJoinAndSelect: {
          tarjasRecepcion: 'notificacion.tarjasRecepcion',
          detalleItemProducto: 'tarjasRecepcion.detalleItemProducto',
          solicitudPreviaDetalle: 'detalleItemProducto.solicitudPreviaDetalle',
        },
      },
    });
    return notificaionRetiro.tarjasRecepcion;
  }

  update(id: number, editarNotificacionRetiroDto: EditarNotificacionRetiroDto): Promise<UpdateResult> {
    return this.repository.update(id, {
      fechaNotificacion: editarNotificacionRetiroDto.fechaNotificacion,
      personaFirma: editarNotificacionRetiroDto.personaFirma,
      observaciones: editarNotificacionRetiroDto.observaciones,
      idPersonaAutorizada: editarNotificacionRetiroDto.idPersonaAutorizada
    });
  }

  updatePartial(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  // async esPrimerRetiroMatriculaAfianzada(idNotificacionRetiro: number) {
  //   const notificacionRetiroEntity = await this.repository.findOne(idNotificacionRetiro);
  //   return notificacionRetiroEntity.estado === AppConstant.ESTADO_NOTIFICACION_RETIRO_SIN_FACTURA_INFORMATIVA;
  // }
}
