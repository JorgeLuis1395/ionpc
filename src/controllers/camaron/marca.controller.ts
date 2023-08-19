import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import {MaterialesRepository} from "../../repositories/materiales.repository";
import {ClienteTranscityRepository} from "../../repositories/cliente-transcity.repository";
import {MarcaRepository} from "../../repositories/marca.repository";


@Controller('marca')
export class MarcaController {
  constructor(private marcaRepository: MarcaRepository) {
  }

  @Post()
  create(@Body() marcaRepositoryDto) {
    return this.marcaRepository.insert(marcaRepositoryDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.marcaRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.marcaRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.marcaRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.marcaRepository.delete(id);
  }
}
