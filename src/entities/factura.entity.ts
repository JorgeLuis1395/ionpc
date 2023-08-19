import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type FacturaDocument = Factura & Document;

@Schema()
export class Factura {
    @Prop()
    fechaFactura?: string;

    @Prop()
    comprobante?: string;

    @Prop()
    proveedor?: string;

    @Prop()
    descripcion?: string;

    @Prop()
    subtotal?: string;

    @Prop()
    iva?: string;

    @Prop()
    totalFactura?: string;

    @Prop()
    retRenta?: string;

    @Prop()
    retIva?: string;

    @Prop()
    totalPagar?: string;

}

export const FacturaSchema = SchemaFactory.createForClass(Factura);
