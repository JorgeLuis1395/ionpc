import { Document } from 'mongoose';
export interface AnalisiscalidadInterface extends Document {
    readonly id: string;
    readonly fecha_creacion: Date;
    readonly fecha_actualizacion: Date;
    readonly jsonObject: object;
    readonly lote: string;

}
