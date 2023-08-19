import * as mongoose from 'mongoose';


const Schema = mongoose.Schema;
export const EmailSchema = new mongoose.Schema({
  id: String,
  fecha_creacion: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now },
  atributes: String,
  body2: String,
  headers: String,
  text: String,
  body: Object,
  parsed: Object,
  seq: String,
});
