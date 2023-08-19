import { Document } from 'mongoose';
export interface ImapInterface extends Document {
    readonly id: string;
    readonly fecha_creacion: Date;
    readonly fecha_actualizacion: Date;
    readonly atributes: string;
    readonly body2: string;
    readonly headers: string;
    readonly text: string;
    readonly body: string;
    readonly parsed: string;
    readonly seq: string;
}
