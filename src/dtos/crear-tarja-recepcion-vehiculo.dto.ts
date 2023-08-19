import {CrearControlVehiculoDto} from "./control-vehiculo.dto";
import {CrearControlFisicoDto} from "./control-fisico.dto";
import {CrearFotoDto} from "./foto.dto";

export interface CrearTarjaRecepcionVehiculoDto {
  fechaTarja: Date,
  numeroTarja: string,
  kilometraje: number,
  combustible: number,
  observaciones: string,
  fechaRecepcion: Date,
  fechaEntrega: Date,
  idDetalleItemProducto: number,
  idRack: number,
  crearControlesVehiculoDtos: CrearControlVehiculoDto[],
  crearControlesFisicosDtos: CrearControlFisicoDto[],
  crearFotosDtos: CrearFotoDto[],
  estadoDetalleItemProducto: number
}
