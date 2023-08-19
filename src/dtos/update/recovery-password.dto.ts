import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class RecoveryPasswordDto {

  @IsEmail()
  nombre_login: string;

  @IsString()
  @IsOptional()
  nombre_rol: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsInt()
  @IsOptional()
  id_usuario: number;

}
