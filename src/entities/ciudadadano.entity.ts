import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IncidenteNowForce } from './incidente-now-force.entity';

export type CiudadanoDocument = Ciudadano & Document;

@Schema()
export class Ciudadano {
  @Prop()
  nombre: string;

  @Prop()
  edad: string;

  @Prop()
  sexo: string;

  @Prop()
  nacionalidad: string;

  @Prop()
  afectada: boolean;

  @Prop()
  albergada: boolean;

  @Prop()
  damnificada: boolean;

  @Prop()
  desaparecida: boolean;

  @Prop()
  enfamiliaacogiente: boolean;

  @Prop()
  evacuada: boolean;

  @Prop()
  fallecido: boolean;

  @Prop()
  herido: boolean;

  @Prop()
  reubicada: boolean;

  @Prop()
  tipoalbergue?: string;

  @Prop()
  albergue?: string;

  @Prop()
  familia?: string;

  @Prop()
  parentesco: string;

  @Prop()
  medicoacargo?: string;

  @Prop()
  casasalud?: string;

  @Prop()
  diagnosticomedico?: string;

  @Prop()
  jefehogar: boolean;

  @Prop()
  vestimenta: boolean;

  @Prop()
  vestimentaTalla: string;

  @Prop()
  vestimentaEntregado: boolean;

  @Prop()
  vestimentaFecEnt?: string;

  @Prop()
  calzado: boolean;

  @Prop()
  calzadoTalla: string;

  @Prop()
  calzadoEntregado: boolean;

  @Prop()
  calzadoFecEnt?: string;

  @Prop()
  frazada: boolean;

  @Prop()
  frazadaTalla?: string;

  @Prop()
  frazadaEntregado: boolean;

  @Prop()
  frazadaFecEnt?: string;

  @Prop()
  alimentosPerecibles: boolean;

  @Prop()
  alimentosPereciblesTalla?: string;

  @Prop()
  alimentosPereciblesEntregado: boolean;

  @Prop()
  alimentosPereciblesFecEnt?: string;

  @Prop()
  alimentosNoPerecibles: boolean;

  @Prop()
  alimentosNoPereciblesTalla?: string;

  @Prop()
  alimentosNoPereciblesEntregado: boolean;

  @Prop()
  alimentosNoPereciblesFecEnt?: string;

  @Prop()
  kitHigiene: boolean;

  @Prop()
  kitHigieneTalla?: string;

  @Prop()
  kitHigieneEntregado: boolean;

  @Prop()
  kitHigieneFecEnt?: string;

  @Prop()
  kitEscolar: boolean;

  @Prop()
  kitEscolarTalla?: string;

  @Prop()
  kitEscolarEntregado: boolean;

  @Prop()
  kitEscolarFecEnt?: string;

  @Prop()
  toallas: boolean;

  @Prop()
  toallasTalla?: string;

  @Prop()
  toallasEntregado: boolean;

  @Prop()
  toallasFecEnt?: string;

  @Prop()
  medicinas: boolean;

  @Prop()
  medicinasTalla?: string;

  @Prop()
  medicinasEntregado: boolean;

  @Prop()
  medicinasFecEnt?: string;

  @Prop()
  gastosMortuorios: boolean;

  @Prop()
  gastosMortuoriosEntregado: boolean;

  @Prop()
  gastosMortuoriosFecEnt?: string;

  @Prop()
  otros?: string;

  @Prop()
  otrosEntregado: boolean;

  @Prop()
  otrosFecEnt?: string;

  @Prop()
  cedula: string;

  @Prop()
  ingresoMensual?: string;

  @Prop()
  ingresoAdicional?: string;

  @Prop()
  bienesMuebles: boolean;

  @Prop()
  bienesMueblesEntregado: boolean;

  @Prop()
  bienesMueblesFecEnt?: string;

  @Prop()
  bienesInMuebles: boolean;

  @Prop()
  bienesInMueblesEntregado: boolean;

  @Prop()
  bienesInMueblesFecEnt?: string;
}

export const CiudadanoSchema = SchemaFactory.createForClass(Ciudadano);
