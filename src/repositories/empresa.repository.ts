import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EmpresaEntity } from '../entities/empresa.entity';

@Injectable()
export class EmpresaRepository {
  constructor(
    @InjectRepository(EmpresaEntity)
    private readonly repository: Repository<EmpresaEntity>,
  ) {
  }

  insert(entity: EmpresaEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<EmpresaEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<EmpresaEntity | undefined> {
    return this.repository.findOne({ id });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
