import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type BioseguridadDatosDocument = BioseguridadDatos & Document;

@Schema()
export class BioseguridadDatos {
    @Prop()
    tipo?: string;

    @Prop()
    cantidad?: string;

    @Prop()
    subtipo?: string;

    @Prop()
    personas?: string;

}

export const BioseguridadDatosSchema = SchemaFactory.createForClass(BioseguridadDatos);
