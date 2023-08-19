import { ApiProperty } from '@nestjs/swagger';

export class CreateIncidenteDTO {
  @ApiProperty()
  readonly text: string;
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly incidente: string;
  @ApiProperty()
  readonly fecha_creacion: Date;
  @ApiProperty()
  readonly fecha_actualizacion: Date;
  @ApiProperty()
  readonly fecha_incidente: Date;
  @ApiProperty()
  readonly fecha_posible_cierre: Date;
  @ApiProperty()
  readonly evento_padre: string;

  @ApiProperty()
  readonly geocerca: string;

  @ApiProperty()
  readonly fecha_cierre: Date;
  @ApiProperty()
  readonly estado_incidente: string;
  @ApiProperty()
  readonly ubicacion: string;
  @ApiProperty()
  readonly descripcion_ubicacion: string;
  @ApiProperty()
  readonly tipo_incidente: string;
  @ApiProperty()
  readonly categoria: string;
  @ApiProperty()
  readonly comentario_incidente: string;
  @ApiProperty()
  readonly latitud: Array<string>;
  @ApiProperty()
  readonly longitud: string;
  @ApiProperty()
  readonly formulario: Array<string>;
  @ApiProperty()
  readonly subtareas: Array<string>;
  @ApiProperty()
  readonly formularioDatos: Array<string>;
  @ApiProperty()
  readonly idEventoAnterior: string;
  @ApiProperty()
  readonly cantidad_procesos: number;
  @ApiProperty()
  readonly id_usuario_pcr: number;
  @ApiProperty()
  readonly nombre_usuario_pcr: string;
  @ApiProperty()
  readonly id_usuario_vepidemiologica: number;
  @ApiProperty()
  readonly nombre_usuario_vepidemiologica: string;
  @ApiProperty()
  readonly resultado_prueba: string;

  @ApiProperty()
  readonly trabajador_afiliado: string;

  @ApiProperty()
  readonly correo_usuario: string;

  @ApiProperty()
  readonly telefono_usuario: string;

  @ApiProperty()
  readonly ficha_ecu: string;

}
