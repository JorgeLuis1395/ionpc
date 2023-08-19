import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import {TallasCamaronColaRepository} from '../../repositories/tallas-camaron-cola.repository';
import {TallasPescadoCongeladoRepository} from "../../repositories/tallas-pescado-congelado.repository";


@Controller('tallaspescadocongelado')
export class TallasPescadoCongeladoController {
  constructor(private tallasPescadoCongeladoRepository: TallasPescadoCongeladoRepository) {
  }

  @Post()
  create(@Body() tallasPescadoCongeladoDto) {
    return this.tallasPescadoCongeladoRepository.insert(tallasPescadoCongeladoDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.tallasPescadoCongeladoRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.tallasPescadoCongeladoRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.tallasPescadoCongeladoRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.tallasPescadoCongeladoRepository.delete(id);
  }
}
