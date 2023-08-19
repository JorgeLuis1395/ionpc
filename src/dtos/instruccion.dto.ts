export interface IntruccionDto {
    id: number;
    fechaHoraRegistro: string;
    fechaHoraActualizacion: string;
    titulo: string;
    nivel: number;
    codigoSenescyt: string;
    institucion: string;
    fecha?: string;
    idUsuario:number
  }