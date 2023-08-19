import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { UsuarioAutenticacionDto } from '../dtos/usuario-autenticacion.dto';

@Injectable()
export class AutenticacionService {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly jwtService: JwtService,
  ) {
  }

  /**
   * Verifica que los parámetros de autenticación del usuarioAutenticacionDto coincidan con los registrados en la base
   * de datos y de ser asi emite un JWT caso contrario una excepción.
   * @throw {BadRequestException}
   * @param usuarioAutenticacionDto
   * @returns {Promise<any>}
   * @author Darwin Guzmán
   * @version 0.1
   */
  async autenticarUsuario(usuarioAutenticacionDto: UsuarioAutenticacionDto) {
    const usuarioEntity = await this.usuarioRepository.selectByNick(usuarioAutenticacionDto.nickname);
    if (usuarioEntity) {
      if (usuarioEntity.estado && usuarioAutenticacionDto.nickname === usuarioEntity.nickname && usuarioAutenticacionDto.password === usuarioEntity.password) {
        if (usuarioEntity.rol) {
          const payload = {
            id: usuarioEntity.id,
            nickname: usuarioEntity.nickname,
            rol: usuarioEntity.rol.nombre,
            foto: usuarioEntity.nombreFoto,
          };
          delete usuarioEntity.password;
          return { accessToken: this.jwtService.emitirToken(payload), usuarioDto: usuarioEntity };
        } else {
          throw new HttpException('¡Usted no posee ningún rol en el sistema!', HttpStatus.FORBIDDEN);
        }
      }
    }
    throw new BadRequestException('¡Credenciales inválidas!');
  }

  /**
   * Verifica que el token sea válido y tenga una sesión activa.
   * @param {string} jwt
   * @param {(error, data) => void} callback
   * @author Darwin Guzmán
   * @version 0.0
   */
  verificarToken(jwt: string, callback: (error, data) => void) {
    this.jwtService.verificarToken(jwt, (error, data) => {
      if (error) {
        callback({
          mensaje: '¡Jwt inválido!',
          error: error,
        }, null);
      } else {
        callback(null, {
          mensaje: 'Token válido',
          data: data,
        });
      }
    });
  }
}
