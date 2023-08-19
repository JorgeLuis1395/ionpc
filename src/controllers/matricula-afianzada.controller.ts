import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards} from '@nestjs/common';
import {RolGuard} from '../common/guards/rol.guard';
import {MatriculaAfianzadaRepository} from '../repositories/matricula-afianzada.repository';

//@UseGuards(RolGuard)
@Controller('matricula-afianzada')
export class MatriculaAfianzadaController {
  constructor(private matriculaAfianzadaRepository: MatriculaAfianzadaRepository) {
  }

  @Post()
  create(@Body() matriculaAfianzadato) {
    return this.matriculaAfianzadaRepository.insert(matriculaAfianzadato);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.matriculaAfianzadaRepository.selectAll());
  }

  @Get('sinFinalizarNotificacionRetiro')
  async findAllSinFinalizarNotificacionRetiro(@Res() response) {
    return response.send(await this.matriculaAfianzadaRepository.selectAllSinFinalizarNotificacionRetiro());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.matriculaAfianzadaRepository.selectById(id));
  }

  @Get('exportarPDF/:id')
  async findAllInformation(@Param('id') id, @Res() response) {
    return response.send(await this.matriculaAfianzadaRepository.selectByIdAllInformation(id));
  }

  @Get('paraNotificacionRetiro/:id')
  async findAllInformationNotificacion(@Param('id') id, @Res() response) {
    return response.send(await this.matriculaAfianzadaRepository.selectByIdAllInformationToCreateNotificacion(id));
  }

  @Put('anular/:id')
  putAnular(@Param('id') id) {
    return this.matriculaAfianzadaRepository.anular(id);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() matriculaAfianzadato) {
    return await this.matriculaAfianzadaRepository.update(id, matriculaAfianzadato);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.matriculaAfianzadaRepository.delete(id);
  }
}
