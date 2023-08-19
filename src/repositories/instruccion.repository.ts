import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InstruccionEntity } from '../entities/instruccion.entity';

@Injectable()
export class InstruccionRepository {
  constructor(
    @InjectRepository(InstruccionEntity)
    private readonly repository: Repository<InstruccionEntity>,
  ) {
  }

  insert(entity: InstruccionEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<InstruccionEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<InstruccionEntity | undefined> {
    return this.repository.findOne({ id });
  }

  async selectByIdUsuario(id: number): Promise<any | undefined> {
    return await this.repository.find({ where: { idUsuario: id } });

  }

  selectUsuario(id: number): Promise<any> {
    return this.repository.find({ where: {
      idUsuario: id,
    }
    });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
