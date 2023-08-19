import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TurnosEntity } from "../entities/turnos.entity";
import { Repository } from "typeorm";

@Injectable()
export class TurnosRepository {
  constructor(@InjectRepository(TurnosEntity) private readonly repository: Repository<TurnosEntity>) {
  }

  insert(crearTurnosDto) {
    return this.repository.insert({
      fecha_turno: crearTurnosDto.fecha_turno,
      hora_inicio_turno: crearTurnosDto.hora_inicio_turno,
      hora_fin_turno: crearTurnosDto.hora_fin_turno,
      nombres: crearTurnosDto.nombres,
      apellidos: crearTurnosDto.apellidos,
      genero: crearTurnosDto.genero,
      tipo_documento: crearTurnosDto.tipo_documento,
      numero_documento: crearTurnosDto.cedula,
      correo: crearTurnosDto.correo,
      celular: crearTurnosDto.celular,
      convencional: crearTurnosDto.convencional,
      poblacion_pertenece: crearTurnosDto.poblacion,
      tipo_turno: crearTurnosDto.tipo_turno,
      centro_salud: crearTurnosDto.centroSalud,
      direccion_centro_salud: crearTurnosDto.direccionCentroSalud,
    });
  }

  select() {
    return this.repository.find();
  }

  delete(id: number) {
    return this.repository.delete(id);
  }

  async BuscarTurnosPorCentroSalud(centro_salud: string, fecha_turno: string, hora_turno: string): Promise<TurnosEntity | undefined> {
    return await this.repository.query("select * from turnos where centro_salud ='" + centro_salud + "' AND fecha_turno ='" + fecha_turno + "' AND hora_inicio_turno = '" + hora_turno + "'");
  }
}
