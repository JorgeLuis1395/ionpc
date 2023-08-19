import { Column } from 'typeorm';

export class IncidenteFormularioDto {
  id?: number;
  idIncidente: number;
  idFormulario: number;
}
