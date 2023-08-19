import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { RolGuard } from "../common/guards/rol.guard";
import { IncidenteSubtareaRepository } from "../repositories/incidente-subtarea.repository";
import { IncidenteSubtareaDto } from "../dtos/incidente-subtarea.dto";
import { IncidenteSubtareaEntity } from "../entities/incidente-subtarea.entity";

//@UseGuards(RolGuard)
@Controller('incidente-subtarea')
export class IncidenteSubtareaController {
  constructor(private incidenteSubtareaRepository: IncidenteSubtareaRepository) {
  }

  @Post()
  create(@Body() incidenteSubtareaDto: IncidenteSubtareaDto): Promise<IncidenteSubtareaEntity> {
    return this.incidenteSubtareaRepository.insert(incidenteSubtareaDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.incidenteSubtareaRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.incidenteSubtareaRepository.selectById(id));
  }

  @Get('id_incidente/:id')
  async buscarIncidente(@Param('id') id) {
    return await this.incidenteSubtareaRepository.buscarIncidente(id);
  }

  @Get('id_proceso/:id')
  async buscarProceso(@Param('id') id) {
    return await this.incidenteSubtareaRepository.buscarProceso(id);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() incidenteSubtareaDto) {
    return await this.incidenteSubtareaRepository.update(id, incidenteSubtareaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.incidenteSubtareaRepository.delete(id);
  }
}
