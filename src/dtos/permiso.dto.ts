export interface PermisoDto {
  id: string;
  fechaHoraRegistro: string;
  fechaHoraActualizacion: string;
  descripcion: string;
  idTipoPermiso: number;
  idPermiso?: string;
  permisos?: PermisoDto[];
}
