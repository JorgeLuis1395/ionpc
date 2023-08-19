import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InstitucionLaboralEntity } from '../entities/institucion-laboral.entity';

@Injectable()
export class InstitucionLaboralRepository {
  constructor(
    @InjectRepository(InstitucionLaboralEntity)
    private readonly repository: Repository<InstitucionLaboralEntity>,
  ) {
  }

  insert(entity: InstitucionLaboralEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<InstitucionLaboralEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<InstitucionLaboralEntity | undefined> {
    return this.repository.findOne({ id });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
