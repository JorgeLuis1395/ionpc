import { DetalleItemProductoEntity } from '../entities/detalle-item-producto.entity';
import { FacturaInformativaEntity } from '../entities/factura-informativa.entity';
import { ClienteEntity } from '../entities/cliente.entity';
import { ExportadorEntity } from '../entities/exportador.entity';
import { MatriculaAfianzadaEntity } from '../entities/matricula-afianzada.entity';
import { SolicitudPreviaEntity } from '../entities/solicitud-previa.entity';
import {DetalleItemProductoDto, EditarDetalleItemProductoFacturaInformativaDto} from './detalle-item-producto.dto';

export interface FacturaInformativaAllInformacionDto {
  facturaInformativa: FacturaInformativaEntity;
  detallesItem: DetalleItemProductoEntity[];
  solicitudPrevia: SolicitudPreviaEntity;
  cliente: ClienteEntity;
  exportador: ExportadorEntity;
  matriculaAfianzada: MatriculaAfianzadaEntity;
  numeroParcial: number;
}

export interface CrearFacturaInformativaDto {
  pesoBruto: number;
  pesoNeto: number;
  idNotificacionRetiro: number;
  fechaEmision: Date;
  marcas: string;
  importador: string;
  daiImportacion: string;
  conocimientoEmbarque: string;
  direccion: string;
  llegadoPorVapor: string;
  de: string;
  saldoBultos: number;
  saldoUnidades: number;
  saldoUnidadesEgreso: number;
  detallesItemProductoDtos: DetalleItemProductoDto[];
}

export interface EditarFacturaInformativaDto {
  fechaEmision: Date;
  marcas: string;
  importador: string;
  daiImportacion: string;
  conocimientoEmbarque: string;
  direccion: string;
  llegadoPorVapor: string;
  de: string;
  editarDetallesItemProductoDtos: EditarDetalleItemProductoFacturaInformativaDto[];
}
