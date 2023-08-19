import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type EspacioPublicoDatosDocument = EspacioPublicoDatos & Document;

@Schema()
export class EspacioPublicoDatos {
    @Prop()
    tipo?: string;

    @Prop()
    cantidad?: string;

    @Prop()
    personas?: string;

}

export const EspacioPublicoDatosSchema = SchemaFactory.createForClass(EspacioPublicoDatos);
