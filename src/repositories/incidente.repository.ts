import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IncidenteEntity } from '../entities/incidente.entity';
import { AppConstant } from '../app.constant';
import { IncidenteFormularioEntity } from '../entities/incidente-formulario.entity';

@Injectable()
export class IncidenteRepository {
  constructor(
    @InjectRepository(IncidenteFormularioEntity) private readonly repositoryIncidenteFormulario: Repository<IncidenteFormularioEntity>,
    @InjectRepository(IncidenteEntity)

    private readonly repository: Repository<IncidenteEntity>,
  ) {
  }

  insert(entity: IncidenteEntity): Promise<InsertResult> {
    entity.estado = AppConstant.ESTADO_INCIDENTE_HABILITADO;
    return this.repository.insert(entity);
  }

  selectAll(): Promise<IncidenteEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<IncidenteEntity | undefined> {
    return this.repository.findOne({ id });
  }

  async selectByIdIncidente(id: number): Promise<any | undefined> {
    return await this.repository.query('select * from "incidente-subtarea" where id_incidente=' + id);
  }


  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    this.deleteFormulario(id);
    this.deleteSubtarea(id);

    return this.repository.delete(id);

  }

  async deleteFormulario(id: number): Promise<DeleteResult> {
    return await this.repository.query('delete from incidente_formulario where id_incidente=' + id);
  }

  async deleteSubtarea(id: number): Promise<DeleteResult> {
    return await this.repository.query('delete from "incidente-subtarea" where id_incidente=' + id);
  }

}
