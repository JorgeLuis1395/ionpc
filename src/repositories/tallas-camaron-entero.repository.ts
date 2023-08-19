import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {TallasCamaronEnteroEntity} from "../entities/tallas-camaron-entero.entity";

@Injectable()
export class TallasCamaronEnteroRepository {
  constructor(
    @InjectRepository(TallasCamaronEnteroEntity)
    private readonly repository: Repository<TallasCamaronEnteroEntity>,
  ) {
  }

  insert(entity: TallasCamaronEnteroEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<TallasCamaronEnteroEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<TallasCamaronEnteroEntity | undefined> {
    return this.repository.findOne({ id });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
