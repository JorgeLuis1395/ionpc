import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, InsertResult, Repository, UpdateResult} from 'typeorm';
import {PermisoEntity} from '../entities/permiso.entity';
import { AppConstant } from '../app.constant';

@Injectable()
export class PermisoRepository {
  constructor(
    @InjectRepository(PermisoEntity)
    private readonly repository: Repository<PermisoEntity>,
  ) {
  }

  /**
   * Inserta los datos de la entidad en la base de datos.
   * @param {PermisoEntity} entity
   * @returns {Promise<InsertResult>}
   * @author Darwin Guzmán
   * @version 0.1
   */
  insert(entity: PermisoEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  /**
   * Selecciona todas las entidades de la base de datos.
   * @returns {Promise<PermisoEntity[]>}
   * @author Darwin Guzmán
   * @version 0.1
   */
  async selectAll(): Promise<PermisoEntity[]> {
    const modulos = await this.repository.find({where: {idPermiso: null}});
    for (let modulo of modulos) {
      modulo.permisos = await this.repository.find({where: [{idPermiso: modulo.id, idTipoPermiso: AppConstant.TIPO_PERMISO_USUARIO_PAGES } ,
          {idPermiso: modulo.id, idTipoPermiso: AppConstant.TIPO_PERMISO_USUARIO_ACCION }] });
    }
    return modulos;
  }

  /**
   * Selecciona la entidad con el id especificado.
   * @param {string} id
   * @returns {Promise<PermisoEntity | undefined>}
   * @author Darwin Guzmán
   * @version 0.1
   */
  selectById(id: string): Promise<PermisoEntity | undefined> {
    return this.repository.findOne({id});
  }

  /**
   * Actualiza todos los campos especificados de la entidad.
   * @param {number} id
   * @param {PermisoEntity} fieldEntity
   * @returns {Promise<UpdateResult>}
   * @author Darwin Guzmán
   * @version 0.1
   */
  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  /**
   * Elimina el registro de la entidad con el id especificado.
   * @param {number} id
   * @returns {Promise<DeleteResult>}
   * @author Darwin Guzmán
   * @version 0.1
   */
  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
