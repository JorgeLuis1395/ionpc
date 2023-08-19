import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, InsertResult, Like, Repository, UpdateResult} from 'typeorm';
import {Injectable} from "@nestjs/common";
import {DetalleItemProductoEntity} from "../entities/detalle-item-producto.entity";
import {TarjaRecepcionVehiculoEntity} from "../entities/tarja-recepcion-vehiculo.entity";

@Injectable()
export class DetalleItemProductoRepository {
  constructor(
    @InjectRepository(DetalleItemProductoEntity) private readonly repository: Repository<DetalleItemProductoEntity>,
    @InjectRepository(DetalleItemProductoEntity) private readonly repositoryTarjaRecepcionVehiculo: Repository<TarjaRecepcionVehiculoEntity>,
  ) {
  }

  async insert(detalleItemProductoEntity: DetalleItemProductoEntity): Promise<InsertResult> {
    return this.repository.insert(detalleItemProductoEntity);
  }

  selectAll(): Promise<DetalleItemProductoEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<DetalleItemProductoEntity | undefined> {
    return this.repository.findOne({id});
  }

  selectOneByChasis(chasis: string): Promise<DetalleItemProductoEntity | undefined> {
    return this.repository.findOne({chasis});
  }

  async selectAllByDetalleSP(idDetalleSP: number) {
    return this.repository.find({
      where: {
        idSolicitudPreviaDetalle: idDetalleSP,
      },
    });
  }

  async selectAllByPatron(patron: string) {
    return this.repository.find({
      chasis: Like('%' + patron + '%'),
    });
  }

  update(id: number, fieldEntity: Partial<DetalleItemProductoEntity>): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  cambiarEstado(id: number, estado: number): Promise<UpdateResult> {
    return this.repository.update(id, {estado});
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

}
