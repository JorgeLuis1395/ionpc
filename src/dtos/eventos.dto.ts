export interface EventosDto {
  id: number,
  fechaHoraRegistro: string,
  fechaHoraActualizacion: string,
  nombre: string,
  descripcion: string
}

export interface CrearEventoDto {
  nombre: string,
  descripcion: string
}
