import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, InsertResult, Repository, UpdateResult } from "typeorm";
import { Injectable } from "@nestjs/common";
import { ExportadorEntity } from '../entities/exportador.entity';
import { FormularioEntity } from '../entities/formularios.entity';

@Injectable()
export class FormularioRepository {
  constructor(
    @InjectRepository(FormularioEntity)
    private readonly repository: Repository<FormularioEntity>,
  ) {
  }

  insert(entity: FormularioEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<FormularioEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<FormularioEntity | undefined> {
    return this.repository.findOne({ id });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
