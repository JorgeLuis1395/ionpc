import {IsBoolean, IsNumber, IsOptional, IsString} from 'class-validator';

export class CrearUsuarioDto {
    @IsString()
    cedula: string;

    @IsString()
    nombre: string;

    @IsString()
    apellido: string;

    @IsString()
    @IsOptional()
    numeroContacto: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    nickname: string;

    @IsString()
    password: string;

    @IsBoolean()
    estado: boolean;

    @IsBoolean()
    estadoLogueado: boolean;

    @IsString()
    @IsOptional()
    latitud: string;

    @IsString()
    @IsOptional()
    longitud: string;

    @IsString()
    @IsOptional()
    provincia: string;
    @IsString()
    @IsOptional()
    canton: string;
    @IsString()
    @IsOptional()
    parroquia: string;
    @IsString()
    @IsOptional()
    recinto: string;
    @IsString()
    @IsOptional()
    sufragio: string;
    @IsString()
    @IsOptional()
    jrv: string;

    @IsString()
    @IsOptional()
    jrv1: string;


    @IsString()
    @IsOptional()
    nombreFoto: string;

    @IsString()
    @IsOptional()
    empresa: string;

    @IsString()
    @IsOptional()
    direccion: string;

    @IsString()
    @IsOptional()
    estadoCivil: string;

    @IsString()
    @IsOptional()
    etnia: string;


    @IsString()
    @IsOptional()
    discapacidad: string;

    @IsBoolean()
    @IsOptional()
    carnet: string;

    @IsString()
    @IsOptional()
    porcentaje: string;

    @IsNumber()
    @IsOptional()
    id_tipoSangre: string;

    @IsNumber()
    @IsOptional()
    id_genero: string;

    @IsNumber()
    @IsOptional()
    id_institucion: string;

    @IsNumber()
    idRol: number;
}
