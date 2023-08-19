import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import {TallasPescadoCongeladoRepository} from "../../repositories/tallas-pescado-congelado.repository";
import {TallasPescadoFrescoRepository} from "../../repositories/tallas-pescado-fresco.repository";


@Controller('tallaspescadofresco')
export class TallasPescadoFrescoController {
  constructor(private tallasPescadoFrescoRepository: TallasPescadoFrescoRepository) {
  }

  @Post()
  create(@Body() tallasPescadoFrescoDto) {
    return this.tallasPescadoFrescoRepository.insert(tallasPescadoFrescoDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.tallasPescadoFrescoRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.tallasPescadoFrescoRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.tallasPescadoFrescoRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.tallasPescadoFrescoRepository.delete(id);
  }
}
