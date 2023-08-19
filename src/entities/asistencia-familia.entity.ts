import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AsistenciaFamiliaDocument = AsistenciaFamilia & Document;

@Schema()
export class AsistenciaFamilia {
  @Prop()
  nombrebeneficiario?: string;

  @Prop()
  numerointegrantes?: string;

  @Prop()
  numerofamilias?: string;

  @Prop()
  ascistenciabasicainicial: boolean;

  @Prop()
  fechaascistenciabasicainicial?: string;

  @Prop()
  bienesMuebles: boolean;

  @Prop()
  fechaasbienesMuebles?: string;

  @Prop()
  fechabienesInMuebles?: string;

  @Prop()
  gastosmortuorios: boolean;

  @Prop()
  fechagastosmortuorios?: string;

  @Prop()
  suministrosymateriales: boolean;

  @Prop()
  fechasuministrosymateriales?: string;

  @Prop()
  cuadrillasemergencias?: boolean;

  @Prop()
  kitsdenoperecible?: string;

  @Prop()
  kitdehigiene?: string;

  @Prop()
  bolsos?: string;

  @Prop()
  almohadas?: string;

  @Prop()
  articulosadquiridos?: string;

  @Prop()
  observaciones?: string;

  @Prop()
  kitsperecible?: string;

  @Prop()
  kitslimpieza?: string;

  @Prop()
  kitsescolar?: string;

  @Prop()
  frazadas?: string;

  @Prop()
  toallas?: string;

  @Prop()
  vestimenta?: string;

  @Prop()
  calzado?: string;
}


export const AsistenciaFamiliaSchema = SchemaFactory.createForClass(AsistenciaFamilia);
