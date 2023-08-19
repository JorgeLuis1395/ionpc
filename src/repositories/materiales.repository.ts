import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EventosEntity } from '../entities/eventos.entity';
import {MaterialesEntity} from '../entities/materiales.entity';

@Injectable()
export class MaterialesRepository {
  constructor(
    @InjectRepository(MaterialesEntity)
    private readonly repository: Repository<MaterialesEntity>,
  ) {
  }

  insert(entity: MaterialesEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<MaterialesEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<MaterialesEntity | undefined> {
    return this.repository.findOne({ id });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
