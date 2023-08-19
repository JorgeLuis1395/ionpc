import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Fecha_eventosEntity } from '../entities/fecha_eventos.entity';

@Injectable()
export class NotificacionEventosRepository {
  constructor(
    @InjectRepository(Fecha_eventosEntity)
    private readonly repository: Repository<Fecha_eventosEntity>,
  ) {
  }

  insert(entity: Fecha_eventosEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<Fecha_eventosEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<Fecha_eventosEntity | undefined> {
    return this.repository.findOne({ id });
  }

  async selectByIdUsuario(id: number): Promise<any | undefined> {
    return await this.repository.find({ where: { usuario: id } });

  }


  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
