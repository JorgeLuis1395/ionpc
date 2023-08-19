import { ApiProperty } from '@nestjs/swagger';

export class UbicacionUsuarioDTO {
  @ApiProperty()
  readonly text: string;

  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly fecha_lectura: Date;

  @ApiProperty()
  readonly local: string;

  @ApiProperty()
  readonly estado_usuario: string;

  @ApiProperty()
  readonly latitud: string;

  @ApiProperty()
  readonly id_usuario: string;


  @ApiProperty()
  readonly nombre_usuario: string;

  @ApiProperty()
  readonly trabajador_afiliado: string;

  @ApiProperty()
  readonly correo_usuario: string;

  @ApiProperty()
  readonly telefono_usuario: string;




}
