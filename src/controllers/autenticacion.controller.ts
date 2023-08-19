import {BadRequestException, Body, Controller, Post, Res} from '@nestjs/common';
import {AutenticacionService} from '../services/autenticacion.service';

@Controller('autenticacion')
export class AutenticacionController {

  constructor(private _autenticacionService: AutenticacionService) {
  }

  @Post()
  async login(@Body() usuario, @Res() res) {
    console.log(usuario)
    const dataAutenticacion = await this._autenticacionService.autenticarUsuario(usuario);
    return res.send(dataAutenticacion);
  }

  @Post('verificar-jwt')
  async verificarJWT(@Body('jwt') jwt: string, @Res() res) {
    if (jwt) {
      this._autenticacionService.verificarToken(jwt, (error, data) => {
        if (!error) {
          return res.send(data);
        } else {
          throw new BadRequestException({
            mensaje: '¡JWT inválido!',
            error,
          });
        }
      });
    } else {
      throw new BadRequestException({
        mensaje: '¡No envía jwt!',
      });
    }
  }
}
