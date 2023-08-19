import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {ModalidadCamaronEntity} from '../entities/modalidad-camaron.entity';
import {ModalidadPescadoEntity} from "../entities/modalidad-pescado.entity";

@Injectable()
export class ModalidadPescadoRepository {
  constructor(
    @InjectRepository(ModalidadPescadoEntity)
    private readonly repository: Repository<ModalidadPescadoEntity>,
  ) {
  }

  insert(entity: ModalidadPescadoEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<ModalidadPescadoEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<ModalidadPescadoEntity | undefined> {
    return this.repository.findOne({ id });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
