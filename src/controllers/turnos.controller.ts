import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { TurnosRepository } from "../repositories/turnos.repository";

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosRepository: TurnosRepository) {
  }

  @Post()
  postInsert(@Body() crearParametroDto) {
    console.log(crearParametroDto);

    return this.turnosRepository.insert(crearParametroDto);
  }

  @Get()
  getSelect() {
    return this.turnosRepository.select();
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.turnosRepository.delete(id);
  }
  @Get('turnos_centros/:centro_salud/:fecha_turno/:hora_turno')
  async buscarTurnosCentroSalud(@Param('centro_salud') centro_salud, @Param('fecha_turno') fecha_turno, @Param('hora_turno') hora_turno) {
    return await this.turnosRepository.BuscarTurnosPorCentroSalud(centro_salud, fecha_turno, hora_turno);
  }
}