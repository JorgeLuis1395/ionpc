import { ApiProperty } from '@nestjs/swagger';

export class AnalisisCalidadDto {
  @ApiProperty()
  readonly text: string;
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly fecha_creacion: Date;
  @ApiProperty()
  readonly fecha_actualizacion: Date;
  @ApiProperty()
  readonly jsonObject: object;
  @ApiProperty()
  readonly lote: string;
}
