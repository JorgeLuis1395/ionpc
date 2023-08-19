// @ts-ignore
import {Injectable, Logger, MiddlewareFunction, NestMiddleware} from '@nestjs/common';
import {AppConstant} from '../../app.constant';
import {AppUtil} from '../../app.util';

const fs = require('fs');

@Injectable()
export class LogMiddleware implements NestMiddleware {

  /**
   * Escribe en un archivo 'logsrequest.txt' antes de cualquier request de los controllers
   * especificados en el app.module.ts, todas las peticiones realizadas en el servidor.
   *
   * @param {string} nivelDeLog
   * @returns {MiddlewareFunction}
   * @author Darwin Guzmán
   * @version 0.0
   */
  resolve(nivelDeLog: string): MiddlewareFunction {
    return (request, response, next) => {
      const peticion = {
        baseUrl: request.baseUrl,
        hostname: request.hostname,
        subdomains: request.subdomains,
        ip: request.ip,
        method: request.method,
        originalUrl: request.originalUrl,
        path: request.path,
        protocol: request.protocol,
        headers: request.headers,
      };

      switch (nivelDeLog) {
        case 'archivo':
          this.addRequestToFile(peticion);
          break;
        case 'consola':
          Logger.log(peticion);
          break;
        case 'todo':
          this.addRequestToFile(peticion);
          Logger.log(peticion);
          break;
        default:
          Logger.error('¡Nivel de Log desconocido!');
      }
      next();
    };
  }

  private addRequestToFile(peticion: any) {
    AppUtil.appendFile(AppConstant.LOGS_REQUESTS_ARCHIVO_PATH, `${new Date()}: ${JSON.stringify(peticion)}\n`);
  }

  use(req: Request, res: Response, next: () => void): any {
  }
}
