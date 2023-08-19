export interface DatosFamiliaresDto {
    id: number;
    fechaHoraRegistro: string;
    fechaHoraActualizacion: string;
    cargas: number;
    nombres: string;
    apellidos: string;
    relacion: string;
    fechaNacimiento?: string;
    id_usuarios:number
  }