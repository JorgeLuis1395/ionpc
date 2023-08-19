import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AppConstant } from '../app.constant';

import { IncidenteFormularioDto } from '../dtos/incidente-formulario.dto';
import { IncidenteFormularioEntity } from '../entities/incidente-formulario.entity';
import { IncidenteEntity } from '../entities/incidente.entity';
import { IncidenteRepository } from './incidente.repository';
import { FormularioRepository } from './formulario.repository';
import { FormularioEntity } from '../entities/formularios.entity';

@Injectable()
export class IncidenteFormularioRepository {
  constructor(
    @InjectRepository(IncidenteFormularioEntity) private readonly repository: Repository<IncidenteFormularioEntity>,


    private readonly incidenteRepository: IncidenteRepository,
    private readonly formularioRepository: FormularioRepository,
    private readonly connection: Connection
  ) {
  }

  async insert(incidenteFormularioDto: IncidenteFormularioDto): Promise<IncidenteFormularioEntity> {
    const formulario: FormularioEntity = await this.formularioRepository.selectById(incidenteFormularioDto.idFormulario);
    if (!formulario) {
      throw new BadRequestException(`El formulario con id ${incidenteFormularioDto.idFormulario} no se encuentra registrado, verifique e intente nuevamente.`);
    }

    const incidente: IncidenteEntity = await this.incidenteRepository.selectById(incidenteFormularioDto.idIncidente);
    if (!incidente) {
      throw new BadRequestException(`El incidente con id ${incidenteFormularioDto.idIncidente} no se encuentra registrado, verifique e intente nuevamente.`);
    }



    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const incidenteFormularioEntity: IncidenteFormularioEntity = {
        incidente,
        formulario,
      };
      await queryRunner.manager.save(IncidenteFormularioEntity, incidenteFormularioEntity);
      await queryRunner.commitTransaction();
      return incidenteFormularioEntity;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Error el guardar la solicitud previa, intente nuevamente.');
    } finally {
      await queryRunner.release();
    }
  }

  selectAll(): Promise<IncidenteFormularioEntity[]> {
    return this.repository.find({
      /*join: {
        alias: 'solicitudPrevia',
        leftJoinAndSelect: {
          puertoEmbarque: 'solicitudPrevia.puertoEmbarque',
          puertoDespacho: 'solicitudPrevia.puertoDespacho',
        },
      },
      order: {
        fechaHoraRegistro: "DESC"
      }*/
    });
  }

  selectById(id: number): Promise<IncidenteFormularioEntity | undefined> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async buscarIncidente(id: number): Promise<IncidenteFormularioEntity | undefined> {
    return await this.repository.query("select * from incidente_formulario where id_incidente=" + id);
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

}
