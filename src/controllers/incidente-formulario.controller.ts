import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { RolGuard } from "../common/guards/rol.guard";
import { IncidenteFormularioRepository } from "../repositories/incidente-formulario.repository";
import { IncidenteFormularioDto } from "../dtos/incidente-formulario.dto";
import { IncidenteFormularioEntity } from "../entities/incidente-formulario.entity";

//@UseGuards(RolGuard)
@Controller('incidente-formulario')
export class IncidenteFormularioController {
  constructor(private incidenteFormularioRepository: IncidenteFormularioRepository) {
  }

  @Post()
  create(@Body() incidenteFormularioDto: IncidenteFormularioDto): Promise<IncidenteFormularioEntity> {
    return this.incidenteFormularioRepository.insert(incidenteFormularioDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.incidenteFormularioRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.incidenteFormularioRepository.selectById(id));
  }

  @Get('id_incidente/:id')
  async buscarIncidente(@Param('id') id) {
    return await this.incidenteFormularioRepository.buscarIncidente(id);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() incidenteFormularioDto) {
    return await this.incidenteFormularioRepository.update(id, incidenteFormularioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.incidenteFormularioRepository.delete(id);
  }
}
