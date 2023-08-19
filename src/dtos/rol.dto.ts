import {PermisoDto} from './permiso.dto';

export interface RolDto {
  id: number;
  fechaHoraRegistro: string;
  fechaHoraActualizacion: string;
  nombre: string;
  descripcion: string;
  permisos: PermisoDto[];
}

export class CrearRolDto {
  nombre: string;
  descripcion: string;
  idsPermisos: string[];
}

export class EditarRolDto {
  id: string;
  nombre: string;
  descripcion: string;
  idsPermisos: string[];
}
