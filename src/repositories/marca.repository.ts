import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EventosEntity } from '../entities/eventos.entity';
import {MaterialesEntity} from '../entities/materiales.entity';
import {ClienteTrancityEntity} from "../entities/cliente-trancity.entity";
import {MarcaEntity} from "../entities/marca.entity";

@Injectable()
export class MarcaRepository {
  constructor(
    @InjectRepository(MarcaEntity)
    private readonly repository: Repository<MarcaEntity>,
  ) {
  }

  insert(entity: MarcaEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<MarcaEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<MarcaEntity | undefined> {
    return this.repository.findOne({ id });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
