import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type PersonalIncidenteFEDocument = PersonalIncidenteFE & Document;

@Schema()
export class PersonalIncidenteFE {
    @Prop()
    nombre?: string;

    @Prop()
    fechaArribo1?: string;

    @Prop()
    fechaSalida1?: string;

    @Prop()
    fechaArribo2?: string;

    @Prop()
    fechaSalida2?: string;

    @Prop()
    fechaArribo3?: string;

    @Prop()
    fechaSalida3?: string;


}

export const PersonalIncidenteFESchema = SchemaFactory.createForClass(PersonalIncidenteFE);
