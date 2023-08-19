export interface FechaEventosDto {
  id: number,
  fechaHoraRegistro: string,
  fechaHoraActualizacion: string,
  fecha_inicio: string,
  fecha_fin: string,
  evento: number
}

export interface CrearFechaEventoDto {
  fecha_inicio: string,
  fecha_fin: string,
  evento: number
}
