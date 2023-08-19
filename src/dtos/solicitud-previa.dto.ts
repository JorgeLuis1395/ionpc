import { SolicitudPreviaDetalleDto } from "./solicitud-previa-detalle.dto";
import { Column } from 'typeorm';

export class SolicitudPreviaDto {
  id?: number;
  codigoReferencia: string;
  numeroPedido: string;
  direccion: string;
  idPuertoEmbarque: number;
  idPuertoDespacho: number;
  fechaAproximadaLlegada: Date;
  fechaEmision: Date;
  totalFOB: number;
  fleteYGastos: number;
  valorCAndF: number;
  seguro: number;
  totalCIF: number;
  totalUnidades: number;
  saldoUnidades?: number;
  saldoBultos?: number;
  importador?: any;
  almacenera?: any;
  estado: number;
  idCliente: number;
  idExportador: number;
  solicitudPreviaDetallesDtos?: SolicitudPreviaDetalleDto[];
}
