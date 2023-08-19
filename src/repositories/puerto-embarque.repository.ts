import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { PuertoEmbarqueEntity } from '../entities/puerto-embarque.entity';
import { AppConstant } from '../app.constant';

@Injectable()
export class PuertoEmbarqueRepository {
  constructor(
    @InjectRepository(PuertoEmbarqueEntity)
    private readonly repository: Repository<PuertoEmbarqueEntity>,
  ) {
  }

  insert(entity: PuertoEmbarqueEntity): Promise<InsertResult> {
    entity.estado = AppConstant.ESTADO_PUERTO_EMBARQUE_HABILITADO;
    return this.repository.insert(entity);
  }

  selectAll(): Promise<PuertoEmbarqueEntity[]> {
    return this.repository.find();
  }

  selectAllHabilitados(): Promise<PuertoEmbarqueEntity[]> {
    return this.repository.find({estado: AppConstant.ESTADO_PUERTO_EMBARQUE_HABILITADO});
  }

  selectById(id: number): Promise<PuertoEmbarqueEntity | undefined> {
    return this.repository.findOne({id});
  }

  update(id: number, fieldEntity: PuertoEmbarqueEntity): Promise<UpdateResult> {
    delete fieldEntity.fechaHoraActualizacion;
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
