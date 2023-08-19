import { RolDto } from './rol.dto';
import { TipoSangreDto } from './tipo-sangre.dto';

export interface UsuarioDto {
  id: number;
  fechaHoraRegistro: string;
  fechaHoraActualizacion: string;
  cedula: string;
  nombre: string;
  apellido: string;
  nickname: string;
  numeroContacto: string;
  email: string;
  estado: boolean;
  fechaNacimiento: string;
  direccion: string;
  discapacidad: string;
  porcentaje: number;
  estadoLogueado: boolean;
  fecha_hora_ultima_conexion: string;
  latitud: string;
  longitud: string;
  empresa: string;
  nombreFoto: string;
  idRol: number;
  rol: RolDto;
  carnet: boolean;
  estadoCivil: string;
  etnia: string;
  form1: boolean;
  form2: boolean;
  form3: boolean;
}

export class CrearUsuarioDto {
  cedula: string;
  nombre: string;
  apellido: string;
  nickname: string;
  numeroContacto: string;
  email: string;
  estado: boolean;
  fechaNacimiento?: string;
  direccion?: string;
  discapacidad?: string;
  porcentaje?: number;
  estadoLogueado?: boolean;
  fecha_hora_ultima_conexion?: string;
  latitud: string;
  longitud: string;
  empresa?: string;
  nombreFoto?: string;
  idRol?: number;
  rol?: RolDto;
  tipo?: number;
  institucion?: number;
  genero?: number;
  datos?: number;
  carnet: boolean;
  estadoCivil: string;
  etnia: string;
}
export class EditarUsuarioDto {
  id: number;
  cedula: string;
  nombre: string;
  apellido: string;
  numeroContacto: string;
  email: string;
  nickname: string;
  estadoLogueado: boolean;
  latitud: string;
  longitud: string;
  nombreFoto: string;
  idRol: number;
  empresa: string;
  tipo?: number;
  institucion?: number;
  genero?: number;
  datos?: number;
  carnet: boolean;
  estadoCivil: string;
  etnia: string;
}
