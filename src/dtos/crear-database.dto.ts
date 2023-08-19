import { IsNumber, IsString } from 'class-validator';

export class CrearDatabaseDto {
  @IsString()
  descripcion: string;

  @IsString()
  host: string;

  @IsNumber()
  port: number;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  database: string;

  @IsNumber()
  idTipoDatabase: number;
}