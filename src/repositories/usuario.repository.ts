import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { UsuarioEntity } from '../entities/usuario.entity';
import { IncidenteFormularioEntity } from '../entities/incidente-formulario.entity';
import { ActualizarPasswordDto } from '../dtos/update/actualizar-password.dto';
import { EmailService } from '../services/email.service';



@Injectable()
export class UsuarioRepository {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly repository: Repository<UsuarioEntity>,
    private correo: EmailService,
  ) {
  }

  /**
   * Inserta los datos de la entidad usuario en la base de datos.
   * @param {UsuarioEntity} entity
   * @returns {Promise<InsertResult>}
   * @author Darwin Guzmán
   * @version 0.1
   */
  async insert(entity: UsuarioEntity): Promise<InsertResult> {
    const usuario = await this.selectByNick(entity.nickname);
    if (usuario) {
      throw new BadRequestException({
        mensaje: `¡El nick ${entity.nickname} ya se encuentra registrado en la base de datos, por favor intente con otro!`,
      });
    } else {
      try{
        //this.correo.sendEmailActivacionMoodle(entity);
        return await this.repository.insert(entity);
      }catch{
      }
    }
   
  }

  /**
   * Selecciona todos los usuarios de la base de datos
   * @returns {Promise<UsuarioEntity[]>}
   * @author Darwin Guzmán
   * @version 0.1
   */
  async selectAll(): Promise<UsuarioEntity[]> {
    const usuariosEntities = await this.repository.find();
    usuariosEntities.forEach(value => delete value.password);
    return usuariosEntities;
  }

  /**
   * Selecciona el usuario con el id especificado.
   * @param {number} id
   * @returns {Promise<UsuarioEntity | undefined>}
   * @author Darwin Guzmán
   * @version 0.1
   */
  selectById(id: number): Promise<UsuarioEntity | undefined> {
    return this.repository.findOne({ id });
  }
  async selectByLogueado(): Promise<UsuarioEntity | undefined> {
    return await this.repository.query("select * from usuario where estado_logueado = true");

  }
  /**
   * Selecciona el usuario con el nick especificado.
   * @param {string} nickname
   * @returns {Promise<UsuarioEntity | undefined>}
   * @author Darwin Guzmán
   * @version 0.1
   */
  selectByNick(nickname: string): Promise<UsuarioEntity | undefined> {
    return this.repository.findOne({ nickname });
  }

  /**
   * Actualiza todos los datos del usuario especificado.
   * @param {number} id
   * @param {UsuarioEntity} fieldEntity
   * @returns {Promise<UpdateResult>}
   * @author Darwin Guzmán
   * @version 0.1
   */
  async update(id: number, fieldEntity: object): Promise<UpdateResult> {
    console.log(id,fieldEntity)
      return this.repository.update(id, fieldEntity);
  }

  /**
   * Elimina el registro del usuario con el id especificado.
   * @param {number} id
   * @returns {Promise<DeleteResult>}
   * @author Darwin Guzmán
   * @version 0.1
   */
  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }



  async changeOldPassword(fieldEntity: ActualizarPasswordDto): Promise<any> {
    try {
      const user_login = await this.selectById(fieldEntity.id_login).catch(r => r);

      if (user_login) {

        if (user_login.password_login === fieldEntity.old_pass) {

          return await this.repository.update(fieldEntity.id_login, {
            password: fieldEntity.new_pass,
          });

        } else {
          throw new HttpException('La actual contraseña no es igual a la ingresada, la contraseña no se ha podido cambiar', HttpStatus.FORBIDDEN);
        }
      }

    } catch (e) {
      throw new BadRequestException({ mensaje: e.response ? e.response : `Error al obtener los datos sobre la cuenta del usuario` });
    }
  }

}
