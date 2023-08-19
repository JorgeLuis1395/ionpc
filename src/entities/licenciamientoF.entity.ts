import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type LicenciamientoDatosDocument = LicenciamientoDatos & Document;

@Schema()
export class LicenciamientoDatos {
    @Prop()
    tipo?: string;

    @Prop()
    cantidad?: string;

}

export const LicenciamientoDatosSchema = SchemaFactory.createForClass(LicenciamientoDatos);
