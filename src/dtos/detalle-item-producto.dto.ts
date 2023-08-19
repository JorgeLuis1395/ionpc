import { SolicitudPreviaDetalleDto } from './solicitud-previa-detalle.dto';

export interface DetalleItemProductoDto {
  id: number;
  fechaHoraRegistro: string;
  fechaHoraActualizacion: string;
  chasis: string;
  motor: string;
  color: string;
  placa?: string;
  itemSalida: number;
  precioUnitarioSalida?: number;
  fletePorUnidadSalida?: number;
  seguroPorItemSalida?: number;
  valorFOBSalida?: number;
  valorCIFSalida?: number;
  pesoSalida?: number;
  estado: number;
  idSolicitudPreviaDetalle: number;
  solicitudPreviaDetalle?: SolicitudPreviaDetalleDto;
}

export interface EditarDetalleItemProductoFacturaInformativaDto {
  id: number;
  itemSalida: number;
  precioUnitarioSalida: number;
  valorFOBSalida: number;
  valorCIFSalida: number;
  seguroPorItemSalida: number;
  fletePorUnidadSalida: number;
  pesoSalida: number;
}
