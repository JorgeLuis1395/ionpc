import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TipoSangreEntity } from '../entities/tipo-sangre.entity';

@Injectable()
export class TipoSangreRepository {
  constructor(
    @InjectRepository(TipoSangreEntity)
    private readonly repository: Repository<TipoSangreEntity>,
  ) {
  }

  insert(entity: TipoSangreEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<TipoSangreEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<TipoSangreEntity | undefined> {
    return this.repository.findOne({ id });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
