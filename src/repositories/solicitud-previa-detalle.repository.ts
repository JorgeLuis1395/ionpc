import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, InsertResult, Repository, UpdateResult} from "typeorm";
import {Injectable} from "@nestjs/common";
import {SolicitudPreviaDetalleEntity} from "../entities/solicitud-previa-detalle.entity";
import {ProductoRepository} from "./producto.repository";
import { TarjaRecepcionVehiculoEntity } from '../entities/tarja-recepcion-vehiculo.entity';
import { DetalleItemProductoEntity } from '../entities/detalle-item-producto.entity';
import { RackEntity } from '../entities/rack.entity';
import { InformacionVehiculoRack } from '../dtos/rack.dto';

@Injectable()
export class SolicitudPreviaDetalleRepository {
  constructor(
    @InjectRepository(SolicitudPreviaDetalleEntity) private readonly repository: Repository<SolicitudPreviaDetalleEntity>,
    @InjectRepository(TarjaRecepcionVehiculoEntity) private readonly tarjaRecepcionRepository: Repository<TarjaRecepcionVehiculoEntity>,
    @InjectRepository(DetalleItemProductoEntity) private readonly detalleItemRepository: Repository<DetalleItemProductoEntity>,
    @InjectRepository(RackEntity) private readonly rackRepository: Repository<RackEntity>,
    private readonly productoRepository: ProductoRepository,
  ) {
  }

  async insert(solicitudPreviaDetalleEntity: SolicitudPreviaDetalleEntity): Promise<InsertResult> {
    return this.repository.insert(solicitudPreviaDetalleEntity);
  }

  selectAll(): Promise<SolicitudPreviaDetalleEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<SolicitudPreviaDetalleEntity | undefined> {
    return this.repository.findOne({id});
  }

  async selectAllByCabecera(idSolicitudPrevia: number) {
    return this.repository.find({
      where: {
        idSolicitudPrevia,
      },
    });
  }

  async selectAllByRack(idRack: number) {
    let informacionRack = {} as InformacionVehiculoRack;
    const rack = await this.rackRepository.findOne({id: idRack});
    if (rack && rack.idTarjaRecepcionActual) {
      const tarjaRecepcion = await this.tarjaRecepcionRepository.findOne({
        where: {id: rack.idTarjaRecepcionActual},
        join: {
          alias: 'tarjaRecepcion',
          leftJoinAndSelect: {
            detalleItemProducto: 'tarjaRecepcion.detalleItemProducto',
            solicitudPreviaDetalle: 'detalleItemProducto.solicitudPreviaDetalle',
            solicitudPrevia: 'solicitudPreviaDetalle.solicitudPrevia',
          },
        },
      });
      if (tarjaRecepcion && tarjaRecepcion.detalleItemProducto) {
        informacionRack.chasis = tarjaRecepcion.detalleItemProducto.chasis;
        informacionRack.motor = tarjaRecepcion.detalleItemProducto.motor;
        informacionRack.color = tarjaRecepcion.detalleItemProducto.color;
        informacionRack.idRack = rack.id;
        informacionRack.latitud = rack.latitud;
        informacionRack.longitud = rack.longitud;
        if (tarjaRecepcion.detalleItemProducto.solicitudPreviaDetalle) {
          informacionRack.descripcionVehiculo = tarjaRecepcion.detalleItemProducto.solicitudPreviaDetalle.descripcion;
          informacionRack.partidaArancelaria = tarjaRecepcion.detalleItemProducto.solicitudPreviaDetalle.partidaArancelaria;
          if (tarjaRecepcion.detalleItemProducto.solicitudPreviaDetalle.solicitudPrevia) {
            informacionRack.codigoReferenciaSolicitudPrevia = tarjaRecepcion.detalleItemProducto
              .solicitudPreviaDetalle.solicitudPrevia.codigoReferencia;
          }
        }
      }
    } else {
      informacionRack = {
        idRack: rack.id,
        chasis: null,
        motor: null,
        color: null,
        descripcionVehiculo: null,
        partidaArancelaria: null,
        codigoReferenciaSolicitudPrevia: null,
        latitud: rack.latitud,
        longitud: rack.longitud
      };
    }
    return informacionRack;
  }

  async selectProductoByIdDetalleSP(idSolicitudPreviaDetalle: number) {
    const solicitudPreviaDetalleEntity = await this.selectById(idSolicitudPreviaDetalle);
    return this.productoRepository.selectById(solicitudPreviaDetalleEntity.idProducto);
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  updateSaldo(id: number, saldo: number): Promise<UpdateResult> {
    return this.repository.update(id, {saldo});
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
