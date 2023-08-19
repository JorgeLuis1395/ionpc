import {PersonaAutorizadaDto} from './persona-autorizada.dto';
import {DetalleItemProductoDto} from './detalle-item-producto.dto';
import {TarjetaRecepcionDto} from './tarjeta-recepcion.dto';
import {UsuarioDto} from './usuario.dto';
import {SolicitudPreviaDetalleDto} from './solicitud-previa-detalle.dto';


export interface NotificacionRetiroDto {
  id: number | string;
  codigoReferencia: string;
  tipoRetiro: string;
  fechaNotificacion: string;
  personaFirma: string;
  observaciones: string;
  numeroParcial: number;
  idPersonaAutorizada: number;
  idUsuario: number;
  personaAutorizada?: PersonaAutorizadaDto;
  estado: number;
}

export interface EditarNotificacionRetiroDto {
  fechaNotificacion: Date;
  personaFirma: string;
  observaciones: string;
  idPersonaAutorizada: number;
}

export interface ItemDetalleNotificacionRetiroDto {
  detalleItem: DetalleItemProductoDto;
  solicitudPreviaDetalle: SolicitudPreviaDetalleDto;
}

export interface CrearNotificacionRetiroDto {
  notificacionRetiro: NotificacionRetiroDto;
  detallesItem: DetalleItemProductoDto[];
}

export interface NotificacionRetiroAllInformation extends NotificacionRetiroDto {
  tarjasRecepcion: TarjetaRecepcionDto[];
  usuario: UsuarioDto;
  personaAutorizada: PersonaAutorizadaDto;
}


