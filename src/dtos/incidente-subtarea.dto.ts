import { Column } from 'typeorm';

export class IncidenteSubtareaDto {
  id?: number;
  idIncidente: number;
  idSubtarea: number;
  idProceso: number;
  opcional: boolean;
  estado: boolean;
}
