import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { PuertoDespachoEntity } from '../entities/puerto-despacho.entity';
import { AppConstant } from '../app.constant';
import { PuertoEmbarqueEntity } from '../entities/puerto-embarque.entity';

@Injectable()
export class PuertoDespachoRepository {
  constructor(
    @InjectRepository(PuertoDespachoEntity)
    private readonly repository: Repository<PuertoDespachoEntity>,
  ) {
  }

  insert(entity: PuertoDespachoEntity): Promise<InsertResult> {
    entity.estado = AppConstant.ESTADO_PUERTO_DESPACHO_HABILITADO;
    return this.repository.insert(entity);
  }

  selectAll(): Promise<PuertoDespachoEntity[]> {
    return this.repository.find();
  }

  selectAllHabilitados(): Promise<PuertoEmbarqueEntity[]> {
    return this.repository.find({estado: AppConstant.ESTADO_PUERTO_DESPACHO_HABILITADO});
  }

  selectById(id: number): Promise<PuertoDespachoEntity | undefined> {
    return this.repository.findOne({id});
  }

  update(id: number, fieldEntity: PuertoDespachoEntity): Promise<UpdateResult> {
    delete fieldEntity.fechaHoraActualizacion;
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
