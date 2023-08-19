import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {TallasCamaronEnteroEntity} from "../entities/tallas-camaron-entero.entity";
import {TallasCamaronColaEntity} from "../entities/tallas-camaron-cola.entity";
import {EspeciePescadoFrescoEntity} from "../entities/especie-pescado-fresco.entity";

@Injectable()
export class TallasPescadoFrescoRepository {
  constructor(
    @InjectRepository(EspeciePescadoFrescoEntity)
    private readonly repository: Repository<EspeciePescadoFrescoEntity>,
  ) {
  }

  insert(entity: EspeciePescadoFrescoEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<EspeciePescadoFrescoEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<EspeciePescadoFrescoEntity | undefined> {
    return this.repository.findOne({ id });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
