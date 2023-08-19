export class SolicitudPreviaDetalleDto {
  id?: number;
  item: number;
  descripcion: string;
  partidaArancelaria: string;
  cantidad: number;
  precioUnitario: number;
  fletePorUnidad: number;
  seguroPorItem: number;
  valorFOB: number;
  valorCIF: number;
  estado: number;
  idProducto: number;
}
