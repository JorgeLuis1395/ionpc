import { ApiProperty } from '@nestjs/swagger';

export class EmailDto {
  @ApiProperty()
  readonly text?: string;
  @ApiProperty()
  readonly id?: string;
  @ApiProperty()
  readonly fecha_creacion: Date;
  @ApiProperty()
  readonly fecha_actualizacion: Date;

  @ApiProperty()
  readonly atributes?: string;

  @ApiProperty()
  readonly body?: string;

  @ApiProperty()
  readonly headers?: string;
  @ApiProperty()
  readonly parsed?: string;
  @ApiProperty()
  readonly seq?: string;

}
