import * as mongoose from 'mongoose';


const Schema = mongoose.Schema;
export const AnalisisCalidadSchema = new mongoose.Schema({
  id: String,
  fecha_creacion: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now },
  jsonObject: Object,
  lote: String,


});
