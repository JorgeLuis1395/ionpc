import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EventosEntity } from '../entities/eventos.entity';
import {MaterialesEntity} from '../entities/materiales.entity';
import {ClienteTrancityEntity} from "../entities/cliente-trancity.entity";

@Injectable()
export class ClienteTranscityRepository {
  constructor(
    @InjectRepository(ClienteTrancityEntity)
    private readonly repository: Repository<ClienteTrancityEntity>,
  ) {
  }

  insert(entity: ClienteTrancityEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<ClienteTrancityEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<ClienteTrancityEntity | undefined> {
    return this.repository.findOne({ id });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
