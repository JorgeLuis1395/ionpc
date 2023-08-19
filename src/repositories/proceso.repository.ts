import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ProcesoEntity } from '../entities/proceso.entity';
import { AppConstant } from '../app.constant';

@Injectable()
export class ProcesoRepository {
  constructor(
    @InjectRepository(ProcesoEntity)

    private readonly repository: Repository<ProcesoEntity>,
  ) {
  }

  insert(entity: ProcesoEntity): Promise<InsertResult> {
    entity.estado = AppConstant.ESTADO_PROCESO_HABILITADO;
    return this.repository.insert(entity);
  }

  selectAll(): Promise<ProcesoEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<ProcesoEntity | undefined> {
    return this.repository.findOne({ id });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

}
