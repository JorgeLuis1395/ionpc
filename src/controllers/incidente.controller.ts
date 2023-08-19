import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { RolGuard } from '../common/guards/rol.guard';
import { IncidenteRepository } from '../repositories/incidente.repository';

//@UseGuards(RolGuard)
@Controller('incidente')
export class IncidenteController {
  constructor(private incidenteRepository: IncidenteRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.incidenteRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.incidenteRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.incidenteRepository.selectById(id));
  }

  @Get('id_incidente/:id')
  async findOneIncidenteSubtarea(@Param('id') id, @Res() response) {
    return response.send(await this.incidenteRepository.selectByIdIncidente(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() dto) {
    return await this.incidenteRepository.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.incidenteRepository.delete(id);
  }

  @Delete('formulario/:id')
  async removeformulario(@Param('id') id) {
    return await this.incidenteRepository.deleteFormulario(id);
  }

  @Delete('subtarea/:id')
  async removesubtarea(@Param('id') id) {
    return await this.incidenteRepository.deleteSubtarea(id);
  }

}
