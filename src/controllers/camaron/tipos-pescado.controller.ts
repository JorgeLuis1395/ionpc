import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import {TiposCamaronRepository} from '../../repositories/tipos-camaron.repository';
import {TiposPescadoRepository} from "../../repositories/tipos-pescado.repository";


@Controller('tipospescado')
export class TiposPescadoController {
  constructor(private tiposPescadoRepository: TiposPescadoRepository) {
  }

  @Post()
  create(@Body() tiposPescadoDto) {
    return this.tiposPescadoRepository.insert(tiposPescadoDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.tiposPescadoRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.tiposPescadoRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.tiposPescadoRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.tiposPescadoRepository.delete(id);
  }
}
