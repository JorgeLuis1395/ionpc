import {ControlVehiculoDto, CrearControlVehiculoDto} from './control-vehiculo.dto';
import {ControlFisicoDto, CrearControlFisicoDto} from './control-fisico.dto';
import {CrearFotoDto, EditarFotoDto, FotoDto} from './foto.dto';
import {DetalleItemProductoDto} from './detalle-item-producto.dto';
import {NotificacionRetiroDto} from './notificacion-retiro.dto';
import {RackDto} from './rack.dto';

export interface TarjaRecepcionVehiculoDto {
  id: number;
  fechaHoraRegistro: string;
  fechaHoraActualizacion: string;
  fechaHoraHistorial?: Date;
  fechaTarja: string;
  numeroTarja: string;
  kilometraje: number;
  combustible: number;
  observaciones: string;
  fechaRecepcion: string;
  fechaEntrega: string;
  idDetalleItemProducto: number;
  idRack?: number;
  idNotificacionRetiro?: number;
  notificacionRetiro?: NotificacionRetiroDto;
  fotos?: FotoDto[];
  detalleItemProducto?: DetalleItemProductoDto;
  controlesVehiculo?: ControlVehiculoDto[];
  controlesFisicos?: ControlFisicoDto[];
  rack?: RackDto;
}

export interface CrearTarjaRecepcionVehiculoDto {
  fechaTarja: Date;
  numeroTarja: string;
  kilometraje: number;
  combustible: number;
  observaciones: string;
  fechaRecepcion: Date;
  fechaEntrega: Date;
  idDetalleItemProducto: number;
  idRack: number;
  crearControlesVehiculoDtos: CrearControlVehiculoDto[];
  crearControlesFisicosDtos: CrearControlFisicoDto[];
  crearFotosDtos: CrearFotoDto[];
  estadoDetalleItemProducto: number;
}

export interface EditarTarjaRecepcionVehiculoDto {
  fechaTarja: Date;
  kilometraje: number;
  combustible: number;
  observaciones: string;
  fechaRecepcion: Date;
  fechaEntrega: Date;
  idRack: number;
  editarControlesVehiculoDtos: ControlVehiculoDto[];
  editarControlesFisicosDtos: ControlFisicoDto[];
  editarFotosDtos: EditarFotoDto[];
}
