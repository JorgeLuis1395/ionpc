import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CorreoRepository } from "../repositories/correo.repository";
import { RolGuard } from "../common/guards/rol.guard";

//@UseGuards(RolGuard)
@Controller('correo')
export class CorreoController {
  constructor(private readonly correoRepository: CorreoRepository) {
  }

  @Post()
  postInsert(@Body() crearParametroDto) {
    return this.correoRepository.insert(crearParametroDto);
  }

  @Get()
  getSelect() {
    return this.correoRepository.select();
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.correoRepository.delete(id);
  }
}
