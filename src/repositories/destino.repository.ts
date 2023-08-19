import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EventosEntity } from '../entities/eventos.entity';
import {MaterialesEntity} from '../entities/materiales.entity';
import {ClienteTrancityEntity} from "../entities/cliente-trancity.entity";
import {DestinoEntity} from "../entities/destino.entity";

@Injectable()
export class DestinoRepository {
  constructor(
    @InjectRepository(DestinoEntity)
    private readonly repository: Repository<DestinoEntity>,
  ) {
  }

  insert(entity: DestinoEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<DestinoEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<DestinoEntity | undefined> {
    return this.repository.findOne({ id });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
