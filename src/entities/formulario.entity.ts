import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type FormularioDocument = Formulario & Document;

@Schema()
export class Formulario {
    @Prop()
    fechaFactura?: any;

    @Prop()
    comprobante?: any;

    @Prop()
    proveedor?: any;

    @Prop()
    descripcion?: any;

    @Prop()
    subtotal?: any;

    @Prop()
    iva?: any;

    @Prop()
    totalFactura?: any;

    @Prop()
    retRenta?: any;

    @Prop()
    retIva?: any;

    @Prop()
    totalPagar?: any;

}

export const FormularioSchema = SchemaFactory.createForClass(Formulario);
