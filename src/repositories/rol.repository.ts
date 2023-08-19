import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectEntityManager, InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, EntityManager, Repository} from 'typeorm';
import {RolEntity} from '../entities/rol.entity';
import {CrearRolDto} from '../dtos/crear-rol.dto';
import {PermisoEntity} from '../entities/permiso.entity';

@Injectable()
export class RolRepository {
  constructor(
    @InjectRepository(RolEntity) private readonly repository: Repository<RolEntity>,
    @InjectRepository(PermisoEntity) private readonly repositoryPermiso: Repository<PermisoEntity>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {
  }

  async insert(crearRolDto: CrearRolDto): Promise<RolEntity> {
    try {
      const rolEntity: RolEntity = {
        nombre: crearRolDto.nombre,
        descripcion: crearRolDto.descripcion,
      };
      rolEntity.permisos = await this.repositoryPermiso.findByIds(crearRolDto.idsPermisos);
      await this.repository.save(rolEntity);
      return rolEntity;
    } catch (e) {
      throw new BadRequestException(e.toString());
    }
  }

  /**
   * Selecciona todos los roles de la base de datos
   * @returns {Promise<RolEntity[]>}
   * @author Darwin Guzmán
   * @version 0.1
   */
  selectAll(): Promise<RolEntity[]> {
    return this.repository.find();
  }

  /**
   * Selecciona el rol con el id especificado.
   * @param {number} id
   * @returns {Promise<RolEntity | undefined>}
   * @author Darwin Guzmán
   * @version 0.1
   */
  selectById(id: number): Promise<RolEntity | undefined> {
    return this.repository.findOne({id});
  }

  async update(id: number, entidad: any): Promise<RolEntity> {
    try {
      const rolEntity = await this.repository.findOne(id);
      rolEntity.nombre = entidad.nombre;
      rolEntity.descripcion = entidad.descripcion;
      rolEntity.permisos = await this.repositoryPermiso.findByIds(entidad.idsPermisos);
      await this.repository.save(rolEntity);
      return rolEntity;
    } catch (e) {
      throw new BadRequestException(e.toString());
    }
  }

  /**
   * Elimina el registro del rol con el id especificado.
   * @param {number} id
   * @returns {Promise<DeleteResult>}
   * @author Darwin Guzmán
   * @version 0.1
   */
  async delete(id: number): Promise<DeleteResult> {
    const rolEntity = await this.repository.findOne(id);
    const usuarios = await rolEntity.usuarios;
    if (usuarios.length === 0) {
      return this.repository.delete(id);
    }
    throw new BadRequestException('Hay usuarios que poseen este rol, primero cambie el rol de estos usuarios.');
  }
}
