import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type FaunaDatosDocument = FaunaDatos & Document;

@Schema()
export class FaunaDatos {

    @Prop()
    cantidad?: string;

}

export const FaunaDatosSchema = SchemaFactory.createForClass(FaunaDatos);
