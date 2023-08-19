import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { GeneroEntity } from '../entities/genero.entity';

@Injectable()
export class GeneroRepository {
  constructor(
    @InjectRepository(GeneroEntity)
    private readonly repository: Repository<GeneroEntity>,
  ) {
  }

  insert(entity: GeneroEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<GeneroEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<GeneroEntity | undefined> {
    return this.repository.findOne({ id });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
