import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {TipoCamaronEntity} from '../entities/tipo-camaron.entity';

@Injectable()
export class TiposCamaronRepository {
  constructor(
    @InjectRepository(TipoCamaronEntity)
    private readonly repository: Repository<TipoCamaronEntity>,
  ) {
  }

  insert(entity: TipoCamaronEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<TipoCamaronEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<TipoCamaronEntity | undefined> {
    return this.repository.findOne({ id });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
