import { Document } from 'mongoose';

export interface UbicacionUsuarioInterface extends Document {
  readonly id: string;
  readonly local: string;
  readonly fecha_lectura: Date;
  readonly estado_usuario: string;
  readonly latitud: any[];
  readonly id_usuario: string;
  readonly nombre_usuario: string;
  readonly trabajador_afiliado: string;
  readonly correo_usuario: string;
  readonly telefono_usuario: string;
}
