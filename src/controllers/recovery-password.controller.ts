import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { RecoveryPasswordService } from '../services/recovery-password.service';
import { EmailService } from '../services/email.service';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { RecoveryPasswordDto } from '../dtos/update/recovery-password.dto';
import { UsuarioEntity } from '../entities/usuario.entity';


@Controller('sendemail')
export class RecoveryPasswordController {

  constructor(
    private readonly _recoveryService: RecoveryPasswordService,
    private readonly _emailService: EmailService,
    private readonly _usuarioService: UsuarioRepository,
  ) {
  }

  @Post('recovery')
  async recoveryPass(@Body() dato, @Res() response) {
    console.log(dato)
    var respuesta: UsuarioEntity = await this._usuarioService.selectByNick(dato.nombre_login).then(result => result);
    if (respuesta) {
      dato.id = respuesta.id;
      return response.send(await this._emailService.sendEmailPassword(dato, 'Recuperación de Contraseña'));
    } else {
      throw new HttpException('¡No existe ningún usuario registrado con el correo ' + dato.nombre_login + ' !', HttpStatus.FORBIDDEN);
    }

  }

}
