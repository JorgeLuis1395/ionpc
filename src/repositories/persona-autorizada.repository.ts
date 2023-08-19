import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { AppConstant } from '../app.constant';
import { PersonaAutorizadaClienteEntity } from '../entities/persona_autorizada_cliente.entity';

@Injectable()
export class PersonaAutorizadaRepository {
  constructor(
    @InjectRepository(PersonaAutorizadaClienteEntity)
    private readonly repository: Repository<PersonaAutorizadaClienteEntity>,
  ) {
  }

  insert(entity: PersonaAutorizadaClienteEntity): Promise<InsertResult> {
    entity.estado = AppConstant.ESTADO_PERSONA_AUTORIZADA_HABILITADO;
    return this.repository.insert(entity);
  }

  selectAll(): Promise<PersonaAutorizadaClienteEntity[]> {
    return this.repository.find({
      join: {
        alias: 'personaAutorizada',
        leftJoinAndSelect: {
          cliente: 'personaAutorizada.cliente',
        },
      },
    });
  }

  selectAllHabilitados(): Promise<PersonaAutorizadaClienteEntity[]> {
    return this.repository.find({estado: AppConstant.ESTADO_PERSONA_AUTORIZADA_HABILITADO});
  }

  selectById(id: number): Promise<PersonaAutorizadaClienteEntity | undefined> {
    return this.repository.findOne({ where: {id},
      join: {
        alias: 'personaAutorizada',
        leftJoinAndSelect: {
          cliente: 'personaAutorizada.cliente',
        },
      },
    });
  }

  update(id: number, fieldEntity: PersonaAutorizadaClienteEntity): Promise<UpdateResult> {
    delete fieldEntity.fechaHoraActualizacion;
    delete fieldEntity.cliente;
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
