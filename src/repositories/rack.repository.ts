import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, InsertResult, Repository, UpdateResult} from 'typeorm';
import {RackEntity} from '../entities/rack.entity';
import {BodegaEntity} from '../entities/bodega.entity';
import {AppConstant} from "../app.constant";

@Injectable()
export class RackRepository {
  constructor(
    @InjectRepository(RackEntity)
    private readonly repository: Repository<RackEntity>,
    @InjectRepository(BodegaEntity)
    private readonly repositoryBodega: Repository<BodegaEntity>,
  ) {
  }

  insert(entity: RackEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<RackEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<RackEntity | undefined> {
    return this.repository.findOne({id});
  }

  async selectAllByBodega(idBodega: number) {
    return this.repository.find({
      where: {
        idBodega
      }
    });
  }

  async selectSaldoArea(idBodega: number) {
    const racksPorBodega = await this.selectAllByBodega(idBodega);
    const racksDisponibles = racksPorBodega.filter(it => it.estado === AppConstant.ESTADO_RACK_DISPONIBLE);
    return racksDisponibles.length;
  }

  async selectNumeroRacksPorIdBodega(idBodega: number) {
    const queryResult = await this.repository
      .createQueryBuilder('rack')
      .select("COUNT(rack.id)", "count")
      .where("rack.idBodega = :idBodega", {idBodega})
      .andWhere("rack.estado != :estado", {estado: AppConstant.ESTADO_RACK_DESHABILITADO})
      .getRawOne();
    return +queryResult.count;
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  async desocuparRack(idRack) {
    return this.update(idRack, {idTarjaRecepcionActual: null, estado: AppConstant.ESTADO_RACK_DISPONIBLE});
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
