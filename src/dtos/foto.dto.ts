export interface FotoDto {
  id: number;
  fechaHoraRegistro: Date;
  fechaHoraActualizacion: Date;
  url: string;
}

export interface CrearFotoDto {
  url: string;
}

export interface EditarFotoDto {
  url: string;
}
