import { Document } from 'mongoose';
export interface IncidenteDataInterface extends Document {
    readonly id: string;
    readonly incidente: string;
    readonly fecha_creacion: Date;
    readonly fecha_actualizacion: Date;
    readonly fecha_incidente: Date;
    readonly fecha_posible_cierre: Date;
    readonly fecha_cierre: Date;
    readonly estado_incidente: string;
    readonly ubicacion: string;
    readonly descripcion_ubicacion: string;
    readonly tipo_incidente: string;
    readonly categoria: string;
    readonly comentario_incidente: string;
    readonly latitud: Array<string>;
    readonly longitud: string;
    readonly evento_padre: string;
    readonly formulario: Array<string>;
    readonly usuariosEntrada: Array<string>;
    readonly usuariosSalida: Array<string>;
    readonly idEventoAnterior: string;
    readonly cantidad_procesos: number;
    readonly subtareas: Array<string>;
    readonly id_usuario_pcr: number;
    readonly nombre_usuario_pcr: string;
    readonly id_usuario_vepidemiologica: number;
    readonly nombre_usuario_vepidemiologica: string;
    readonly resultado_prueba: string;

    readonly trabajador_afiliado: string;
    readonly correo_usuario: string;
    readonly telefono_usuario: string;
    readonly ficha_ecu: string;
}
