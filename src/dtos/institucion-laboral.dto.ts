export interface InstitucionLaboralDto {
    id: number;
    fechaHoraRegistro: string;
    fechaHoraActualizacion: string;
    cargo: string;
    area: string;
    proceso: string;
    subproceso: string;
    tipoServidor: string;
    fechaIngreso?: string;
    fechaSalida?: string;
    causaSalida: string;
    salario: number;
    partida: number;
    jefe: string;
    tipoContrato: string;
    detalle: string;
    id_empresa:number
  }