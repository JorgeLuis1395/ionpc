import { Injectable } from '@nestjs/common';

const jwtPaquete = require('jsonwebtoken');

@Injectable()
export class JwtService {
  private readonly secreto = 'WRADLMI2018jyd4e';
  private readonly jwt = jwtPaquete;
  private readonly tiempoVidaToken = '1d';

  /**
   * Emite un json web token con el tiempo de vida especificado.
   * @param payload
   * @returns {any}
   * @author Darwin Guzmán
   * @version 0.0
   */
  emitirToken(payload: any) {
    return this.jwt.sign(
      {
        data: payload,
      },
      this.secreto,
      {
        expiresIn: this.tiempoVidaToken,
      },
    );
  }

  /**
   * Verifica si el token ingresado es válido de forma asíncrona.
   * @param {string} token
   * @param callback
   * @returns {any}
   * @author Darwin Guzmán
   * @version 0.0
   */
  verificarToken(token: string, callback) {
    return this.jwt.verify(
      token,
      this.secreto,
      callback,
    );
  }

  /**
   * Verifica si el token ingresado es válido.
   * @param {string} token
   * @returns {any}
   * @author Darwin Guzmán
   * @version 0.0
   */
  verificarTokenSync(token: string) {
    try {
      return this.jwt.verify(token, this.secreto);
    } catch (e) {
      return false;
    }
  }

  emitirTokenRegister(payload: any) {
    return this.jwt.sign(
      {
        data: payload,
      },
      this.secreto,
      {
        expiresIn: 60*5,
      },
    );
  }


}
