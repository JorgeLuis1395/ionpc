import {TarjaRecepcionVehiculoEntity} from "../entities/tarja-recepcion-vehiculo.entity";
import {FacturaInformativaEntity} from "../entities/factura-informativa.entity";

export class NotificacionEgresoVehiculoDto {
  id: number;
  fechaHoraRegistro: Date;
  fechaHoraActualizacion: Date;
  fechaHoraNEV: Date;
  numeroNEV: string;
  numeroDeposito: string;
  fechaEmision: Date;
  cantidad: number;
  saldo: number;
  totalGeneralEntregaCantidad: number;
  totalGeneralEntregaSaldo: number;
  area: number;
  saldoArea: number;
  entregadoA: string;
  observaciones: string;
  idTarjaRecepcionVehiculo: number;
  facturaInformativa?: FacturaInformativaEntity;
}

export class CrearNotificacionEgresoVehiculoDto {
  fechaHoraNEV: Date;
  numeroDeposito: string;
  fechaEmision: Date;
  codigoTipoEntrega: number;
  saldoTotalEgreso: number;
  totalGeneralEntregaCantidad: number;
  totalGeneralEntregaCIF: number;
  area: number;
  saldoArea: number;
  observaciones: string;
  idFacturaInformativa: number;
  placas: EditarPlacaDto[];
}

export class EditarNotificacionEgresoVehiculoDto {
  fechaHoraNEV: Date;
  fechaEmision: Date;
  observaciones: string;
  editarPlacasDtos: EditarPlacaDto[];
}

export class EditarPlacaDto {
  idDetalleItemProducto: number;
  placa: string;
}
