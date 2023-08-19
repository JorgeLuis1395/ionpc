import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DanioMaterialDocument = DanioMaterial & Document;

@Schema()
export class DanioMaterial {
  @Prop()
  tipovivirnda?: string;

  @Prop()
  uso?: string;

  @Prop()
  tipoNegocio?: string;

  @Prop()
  metalicaTC: boolean;

  @Prop()
  hormigoArmadoTC: boolean;

  @Prop()
  adobeTC: boolean;

  @Prop()
  maderaTC: boolean;

  @Prop()
  mixtaTC: boolean;

  @Prop()
  otrosTC: boolean;

  @Prop()
  pisoTierra: boolean;

  @Prop()
  pisoCemento: boolean;

  @Prop()
  pisoMadera: boolean;

  @Prop()
  pisoLadrillo: boolean;

  @Prop()
  pisoCeramica: boolean;

  @Prop()
  pisoOtros: boolean;

  @Prop()
  paredBloque: boolean;

  @Prop()
  paredLadrillo: boolean;

  @Prop()
  paredAdobe: boolean;

  @Prop()
  paredMadera: boolean;

  @Prop()
  paredMixtos: boolean;

  @Prop()
  paredOtros: boolean;

  @Prop()
  techoLoza: boolean;

  @Prop()
  techoLozeta: boolean;

  @Prop()
  techoAsbesto: boolean;

  @Prop()
  techoTeja: boolean;

  @Prop()
  techoZinc: boolean;

  @Prop()
  mamposteriaVestibulo?: string;

  @Prop()
  mamposteriaComedor?: string;

  @Prop()
  mamposteriaPasillo?: string;

  @Prop()
  mamposteriaCocina?: string;

  @Prop()
  mamposteriaSSHH?: string;

  @Prop()
  mamposteriaDormitorios?: string;

  @Prop()
  mamposteriaGarage?: string;

  @Prop()
  mamposteriaEdAdicionales?: string;

  @Prop()
  mamposteriaPatioJardin?: string;

  @Prop()
  cubiertaVestibulo?: string;

  @Prop()
  cubiertaComedor?: string;

  @Prop()
  cubiertaPasillo?: string;

  @Prop()
  cubiertaCocina?: string;

  @Prop()
  cubiertaSSHH?: string;

  @Prop()
  cubiertaDormitorios?: string;

  @Prop()
  cubiertaGarage?: string;

  @Prop()
  cubiertaEdAdicionales?: string;

  @Prop()
  cubiertaPatioJardin?: string;

  @Prop()
  pisoVestibulo?: string;

  @Prop()
  pisoComedor?: string;

  @Prop()
  pisoPasillo?: string;

  @Prop()
  pisoCocina?: string;

  @Prop()
  pisoSSHH?: string;

  @Prop()
  pisoDormitorios?: string;

  @Prop()
  pisoGarage?: string;

  @Prop()
  pisoEdAdicionales?: string;

  @Prop()
  pisoPatioJardin?: string;

  @Prop()
  entrepisoVestibulo?: string;

  @Prop()
  entrepisoComedor?: string;

  @Prop()
  entrepisoPasillo?: string;

  @Prop()
  entrepisoCocina?: string;

  @Prop()
  entrepisoSSHH?: string;

  @Prop()
  entrepisoDormitorios?: string;

  @Prop()
  entrepisoGarage?: string;

  @Prop()
  entrepisoEdAdicionales?: string;

  @Prop()
  entrepisoPatioJardin?: string;

  @Prop()
  columnasVestibulo?: string;

  @Prop()
  columnasComedor?: string;

  @Prop()
  columnasPasillo?: string;

  @Prop()
  columnasCocina?: string;

  @Prop()
  columnasSSHH?: string;

  @Prop()
  columnasDormitorios?: string;

  @Prop()
  columnasGarage?: string;

  @Prop()
  columnasEdAdicionales?: string;

  @Prop()
  columnasPatioJardin?: string;

  @Prop()
  ventanasVestibulo?: string;

  @Prop()
  ventanasComedor?: string;

  @Prop()
  ventanasPasillo?: string;

  @Prop()
  ventanasCocina?: string;

  @Prop()
  ventanasSSHH?: string;

  @Prop()
  ventanasDormitorios?: string;

  @Prop()
  ventanasGarage?: string;

  @Prop()
  ventanasEdAdicionales?: string;

  @Prop()
  ventanasPatioJardin?: string;

  @Prop()
  foto1?: string;

  @Prop()
  foto2?: string;

  @Prop()
  foto3?: string;

  @Prop()
  BienesMuebles?: string;
}

export const DanioMaterialSchema = SchemaFactory.createForClass(DanioMaterial);
