import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AppConstant } from '../app.constant';


import { IncidenteEntity } from '../entities/incidente.entity';
import { IncidenteRepository } from './incidente.repository';
import { IncidenteSubtareaEntity } from '../entities/incidente-subtarea.entity';
import { IncidenteSubtareaDto } from '../dtos/incidente-subtarea.dto';

@Injectable()
export class IncidenteSubtareaRepository {
  constructor(
    @InjectRepository(IncidenteSubtareaEntity) private readonly repository: Repository<IncidenteSubtareaEntity>,


    private readonly incidenteRepository: IncidenteRepository,
    private readonly connection: Connection
  ) {
  }

  /*async insert(incidenteSubtareaDto: IncidenteSubtareaDto): Promise<IncidenteSubtareaEntity> {
    const subtarea: IncidenteEntity = await this.incidenteRepository.selectById(incidenteSubtareaDto.idSubtarea);
    if (!subtarea) {
      throw new BadRequestException(`La Subtarea con id ${incidenteSubtareaDto.idSubtarea} no se encuentra registrado, verifique e intente nuevamente.`);
    }

    const incidente: IncidenteEntity = await this.incidenteRepository.selectById(incidenteSubtareaDto.idIncidente);
    if (!incidente) {
      throw new BadRequestException(`El incidente con id ${incidenteSubtareaDto.idIncidente} no se encuentra registrado, verifique e intente nuevamente.`);
    }



    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const incidenteSubtareaEntity: IncidenteSubtareaEntity = {
        incidente,
        subtarea,
      };
      await queryRunner.manager.save(IncidenteSubtareaEntity, incidenteSubtareaEntity);
      await queryRunner.commitTransaction();
      return incidenteSubtareaEntity;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Error el guardar la solicitud previa, intente nuevamente.');
    } finally {
      await queryRunner.release();
    }
  }*/

  async insert(entity: IncidenteSubtareaEntity): Promise<any> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<IncidenteSubtareaEntity[]> {
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

  selectById(id: number): Promise<IncidenteSubtareaEntity | undefined> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async buscarIncidente(id: number): Promise<IncidenteSubtareaEntity | undefined> {
    return await this.repository.query("select * from incidente_formulario where id_incidente=" + id);
  }

  async buscarProceso(id: number): Promise<IncidenteSubtareaEntity | undefined> {
    return await this.repository.query('select * from "incidente-subtarea" where id_proceso=' + id);
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

}
