import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { BodegaEntity } from '../entities/bodega.entity';
import { RackEntity } from '../entities/rack.entity';

@Injectable()
export class BodegaRepository {
  constructor(
    @InjectRepository(BodegaEntity)
    private readonly repository: Repository<BodegaEntity>,
    @InjectRepository(RackEntity)
    private readonly repositoryRack: Repository<RackEntity>,
  ) {
  }

  async insert(entity: BodegaEntity): Promise<InsertResult> {
    const bodegaNuevo = await this.repository.insert(entity);
    if (entity.racks) {
      for (const rack of entity.racks) {
        rack.idBodega = bodegaNuevo.identifiers[0].id;
        await this.repositoryRack.insert(rack);
      }
    }
    return bodegaNuevo;
  }

  selectAll(): Promise<BodegaEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<BodegaEntity | undefined> {
    return this.repository.findOne({id});
  }

  async update(id: number, fieldEntity: BodegaEntity): Promise<UpdateResult> {
    if (fieldEntity.racks) {
      for (const rack of fieldEntity.racks) {
        delete rack.bodega;
        delete rack.fechaHoraActualizacion;
        delete rack.fechaHoraRegistro;
        await this.repositoryRack.update(rack.id, rack);
      }
    }
    delete fieldEntity.racks;
    delete fieldEntity.fechaHoraRegistro;
    delete fieldEntity.fechaHoraActualizacion;
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
