import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UsuarioRepository } from '../repositories/usuario.repository';
import { EmailService } from './email.service';
import { UsuarioEntity } from '../entities/usuario.entity';

@Injectable()
export class RecoveryPasswordService {

  constructor(
    private readonly _usuarioService: UsuarioRepository,
    private readonly _emailService: EmailService
  ) {}

  async recoveryPassword(data) {
    console.log(data)

    var respuesta: UsuarioEntity = await this._usuarioService.selectByNick(data.nombre_login).then(result => result);
    if (respuesta) {
      return await this.changePasswordAndSendEmail(respuesta);
    } else {
      throw new HttpException('¡No existe ningún usuario registrado con el  '+ data.nombre_login +' !', HttpStatus.FORBIDDEN);
    }
  }

  generatePassword() {
    var password: string = '';
    var lista_de_caracteres = '$+=?.@_0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
    var longitud: number = 10;
    var aleatorio: number = 0;

    for (let i = 0; i <= longitud; i++) {
      aleatorio = Math.floor(Math.random() * 65);
      password += lista_de_caracteres.charAt(aleatorio);
    }
    return password;
  }

  async changePasswordAndSendEmail(respuesta: UsuarioEntity) {
    var passNew = this.generatePassword();
    //respuesta.password_login = sha256(passNew);
    respuesta.password= passNew;
    var respuestaUpdate = await this._usuarioService.update(respuesta.id, {
      password_login: respuesta.password
    });
    if (respuestaUpdate.affected > 0) {
      await this._emailService.sendEmailPassword(respuesta.email, 'Recuperar Contraseña', 'Su nueva contraseña es: '+ passNew + '   ingrese al siguiente link: http://www.amautaec.education/assets/images/logos/LOGO_AMAUTA.png/pages/auth/reset-password');
      return respuestaUpdate;
    }
    else {
      throw new HttpException('¡No se pudo cambiar su contraseña comuníquese con el administrador!', HttpStatus.FORBIDDEN);
    }
  }



}
