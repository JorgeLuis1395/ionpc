import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DatosFamiliaresEntity } from '../entities/datos-familiares.entity';

@Injectable()
export class DatosFamiliaresRepository {
  constructor(
    @InjectRepository(DatosFamiliaresEntity)
    private readonly repository: Repository<DatosFamiliaresEntity>,
  ) {
  }

  insert(entity: DatosFamiliaresEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<DatosFamiliaresEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<DatosFamiliaresEntity | undefined> {
    return this.repository.findOne({ id });
  }

  /*async selectByIdUsuario(id: number): Promise<any | undefined> {
    return await this.repository.find({ where: { id_usuarios: id } });

  }*/

  selectUsuario(id: number): Promise<any> {
    return this.repository.find({
      where: {
        id_usuarios: id,
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
