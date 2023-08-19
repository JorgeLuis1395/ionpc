import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CapacitacionEntity } from '../entities/capacitacion.entity';

@Injectable()
export class CapacitacionRepository {
  constructor(
    @InjectRepository(CapacitacionEntity)
    private readonly repository: Repository<CapacitacionEntity>,
  ) {
  }

  insert(entity: CapacitacionEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<CapacitacionEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<CapacitacionEntity | undefined> {
    return this.repository.findOne({ id });
  }

  /*async selectByIdUsuario(id: number): Promise<any | undefined> {
    return await this.repository.find({ where: { idUsuario: id } });

  }*/
  selectUsuario(id: number): Promise<any> {
    return this.repository.find({ where: {
      idUsuario: id,
    }
    });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
