import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EventosEntity } from '../entities/eventos.entity';

@Injectable()
export class EventosRepository {
  constructor(
    @InjectRepository(EventosEntity)
    private readonly repository: Repository<EventosEntity>,
  ) {
  }

  insert(entity: EventosEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<EventosEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<EventosEntity | undefined> {
    return this.repository.findOne({ id });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
