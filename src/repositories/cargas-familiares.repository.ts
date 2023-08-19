import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CargasFamiliaresEntity } from '../entities/cargas-familiares.entity';

@Injectable()
export class CargasFamiliaresRepository {
  constructor(
    @InjectRepository(CargasFamiliaresEntity)
    private readonly repository: Repository<CargasFamiliaresEntity>,
  ) {
  }

  insert(entity: CargasFamiliaresEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<CargasFamiliaresEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<CargasFamiliaresEntity | undefined> {
    return this.repository.findOne({ id });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
