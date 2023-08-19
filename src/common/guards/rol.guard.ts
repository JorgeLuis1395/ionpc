import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {JwtService} from '../../services/jwt.service';
import {UsuarioRepository} from '../../repositories/usuario.repository';
import {RutaRepository} from "../../repositories/ruta.repository";

@Injectable()
export class RolGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly usuarioRepository: UsuarioRepository,
    private readonly rutaRepository: RutaRepository
  ) {
  }

  /**
   * Verifica que el rol del usuario contenido en el token de autorizacion coincida con los valores almacenados
   * en la base datos y concede el permiso a dicha ruta en el caso de estar autorizado.
   * @param {ExecutionContext} context
   * @returns {Promise<boolean>}
   * @author Darwin Guzmán
   * @version 0.1
   */
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let jwtValue = request.headers.authorization;
    if (!jwtValue) {
      return false;
    } else {
      jwtValue = jwtValue.replace('Bearer ', '');
      const resultToken = this.jwtService.verificarTokenSync(jwtValue);
      if (resultToken) {
        const usuarioEntity = await this.usuarioRepository.selectByNick(resultToken.data.nickname);
        if (usuarioEntity && usuarioEntity.estado && usuarioEntity.nickname === resultToken.data.nickname &&
          usuarioEntity.rol.nombre === resultToken.data.rol) {
          //FIXME BORRAR PARA PRODUCCION
          return true;

          const rutaEntity = await this.rutaRepository.selectOneByPathAndMetodo(request.route.path, request.method);
          if (rutaEntity) {
            const permisosEntities = await rutaEntity.permisos;
            return permisosEntities.some(it => usuarioEntity.rol.permisos.some(it2 => it2.id === it.id));
          }
        }
      }
      return false;
    }
  }
}
