import {SolicitudPreviaDetalleDto} from './solicitud-previa-detalle.dto';

export interface TarjetaRecepcionDto {
  id: number | string;
  descripcion: string;
  solicitudPreviaDetalle: number | string | SolicitudPreviaDetalleDto;
}
