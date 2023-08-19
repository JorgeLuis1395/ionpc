import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { ParametroReferenciaEntity } from '../entities/parametro-referencia.entity';

@Injectable()
export class ParametroReferenciaRepository {
  constructor(
    @InjectRepository(ParametroReferenciaEntity)
    private readonly repository: Repository<ParametroReferenciaEntity>,
  ) {
  }

  insert(entity: ParametroReferenciaEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<ParametroReferenciaEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<ParametroReferenciaEntity | undefined> {
    return this.repository.findOne({ id });
  }

  async selectOneParametroActual(codigoProceso: string): Promise<{
    codigoActual: string;
    parametroReferencia: ParametroReferenciaEntity
  }> {
    const parametroReferenciaEntity = await this.repository.findOne({ where: { codigoProceso } });
    const codigoActual = parametroReferenciaEntity.codigo + ('' + parametroReferenciaEntity.indice).padStart(parametroReferenciaEntity.maximoTamanio, '0');
    return {
      codigoActual,
      parametroReferencia: parametroReferenciaEntity,
    };
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
