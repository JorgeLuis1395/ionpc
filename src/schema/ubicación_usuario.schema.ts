import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const UbicacionUsuarioSchema = new mongoose.Schema({
  id: String,
  local: String,
  fecha_lectura: { type: Date, default: Date.now },
  estado_usuario: String,
  latitud: { type: Array, default: [] },
  id_usuario: String,
  nombre_usuario: String,
  trabajador_afiliado: String,
  correo_usuario: String,
  telefono_usuario: String,
});
