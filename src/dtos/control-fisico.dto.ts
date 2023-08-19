export interface ControlFisicoDto {
  id: number,
  fechaHoraRegistro: string,
  fechaHoraActualizacion: string,
  estadoControl: number,
  etiqueta: string,
  idTarjaRecepcionVehiculo: number,
  idCatalogoControlFisico: number,
}

export interface CrearControlFisicoDto {
  estadoControl: number,
  etiqueta: string,
  idTarjaRecepcionVehiculo: number,
  idCatalogoControlFisico: number,
}
