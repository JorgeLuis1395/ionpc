import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type ConstruccionesDatosDocument = ConstruccionesDatos & Document;

@Schema()
export class ConstruccionesDatos {

    @Prop()
    cantidad?: string;

}

export const ConstruccionesDatosSchema = SchemaFactory.createForClass(ConstruccionesDatos);
