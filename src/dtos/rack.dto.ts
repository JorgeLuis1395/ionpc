export interface InformacionVehiculoRack {
  idRack: number;
  chasis: string;
  motor: string;
  color: string;
  descripcionVehiculo: string;
  partidaArancelaria: string;
  codigoReferenciaSolicitudPrevia: string;
  latitud: number;
  longitud: number;
}

export interface RackDto {
  id?: number | string;
  fechaHoraRegistro?: string;
  fechaHoraActualizacion?: string;
  codigo: string;
  letra: string;
  fila: number;
  columna: number;
  latitud: number;
  longitud: number;
  estado: number;
  idBodega?: number;
  idTarjaRecepcionActual?: number;
}
