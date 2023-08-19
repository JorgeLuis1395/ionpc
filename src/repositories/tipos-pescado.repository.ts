import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {ModalidadCamaronEntity} from '../entities/modalidad-camaron.entity';
import {TiposPescadoEntity} from "../entities/tipos-pescado.entity";

@Injectable()
export class TiposPescadoRepository {
  constructor(
    @InjectRepository(TiposPescadoEntity)
    private readonly repository: Repository<TiposPescadoEntity>,
  ) {
  }

  insert(entity: TiposPescadoEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<TiposPescadoEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<TiposPescadoEntity | undefined> {
    return this.repository.findOne({ id });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
