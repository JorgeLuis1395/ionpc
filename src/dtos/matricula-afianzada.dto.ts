import {SolicitudPreviaDto} from './solicitud-previa.dto';
import {SolicitudPreviaDetalleDto} from './solicitud-previa-detalle.dto';

export interface MatriculaAfianzadaDto {
  id: number;
  solicitudPrevia: SolicitudPreviaDto;
  fechaMatriculaAfianzada: Date;
  fechaVencimiento: Date;
  numeroTitulo: string;
  valorTotalTitulo: number;
  observaciones: string;
  referendo: string;
  idSolicitudPrevia: number;
  totalParcial: number;
  solicitudPreviaDetalles?: SolicitudPreviaDetalleDto[];
  estado?: number;
}

export interface EditarMatriculaAfianzadaDto {
  fechaVencimiento: Date;
  observaciones: string;
  referendo: string;
}
