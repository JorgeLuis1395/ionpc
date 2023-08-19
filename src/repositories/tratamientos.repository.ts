import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EventosEntity } from '../entities/eventos.entity';
import {MaterialesEntity} from '../entities/materiales.entity';
import {ClienteTrancityEntity} from "../entities/cliente-trancity.entity";
import {MarcaEntity} from "../entities/marca.entity";
import {TratamientosEntity} from "../entities/tratamientos.entity";

@Injectable()
export class TratamientosRepository {
  constructor(
    @InjectRepository(TratamientosEntity)
    private readonly repository: Repository<TratamientosEntity>,
  ) {
  }

  insert(entity: TratamientosEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<TratamientosEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<TratamientosEntity | undefined> {
    return this.repository.findOne({ id });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
