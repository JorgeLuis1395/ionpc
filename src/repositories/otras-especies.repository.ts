import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {ModalidadCamaronEntity} from '../entities/modalidad-camaron.entity';
import {OtrasEspeciesEntity} from "../entities/otras-especies.entity";

@Injectable()
export class OtrasEspeciesRepository {
  constructor(
    @InjectRepository(OtrasEspeciesEntity)
    private readonly repository: Repository<OtrasEspeciesEntity>,
  ) {
  }

  insert(entity: OtrasEspeciesEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<OtrasEspeciesEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<OtrasEspeciesEntity | undefined> {
    return this.repository.findOne({ id });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
