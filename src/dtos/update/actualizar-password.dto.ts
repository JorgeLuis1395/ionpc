import { IsNumber, IsString } from 'class-validator';

export class ActualizarPasswordDto {

  @IsString()
  old_pass: string;

  @IsString()
  new_pass: string;

  @IsNumber()
  id_login: number;

}