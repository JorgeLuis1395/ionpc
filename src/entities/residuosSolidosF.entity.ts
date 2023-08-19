import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type ResiduosSolidosDatosDocument = ResiduosSolidosDatos & Document;

@Schema()
export class ResiduosSolidosDatos {

    @Prop()
    tipo?: string;

    @Prop()
    cantidad?: string;


}

export const ResiduosSolidosDatosSchema = SchemaFactory.createForClass(ResiduosSolidosDatos);
