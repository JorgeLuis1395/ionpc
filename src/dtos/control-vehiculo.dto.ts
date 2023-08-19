export interface ControlVehiculoDto {
  id: number,
  fechaHoraRegistro: string,
  fechaHoraActualizacion: string,
  estadoControl: number,
  observaciones: string,
  idTarjaRecepcionVehiculo: number,
  idCatalogoControlVehiculo: number,
}

export interface CrearControlVehiculoDto {
  estadoControl: number,
  observaciones: string,
  idTarjaRecepcionVehiculo: number,
  idCatalogoControlVehiculo: number,
}
