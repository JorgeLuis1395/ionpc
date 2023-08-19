import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import {MaterialesRepository} from "../../repositories/materiales.repository";
import {ClienteTranscityRepository} from "../../repositories/cliente-transcity.repository";
import {MarcaRepository} from "../../repositories/marca.repository";
import {TratamientosRepository} from "../../repositories/tratamientos.repository";


@Controller('tratamiento')
export class TratamientoController {
  constructor(private tratamientosRepository: TratamientosRepository) {
  }

  @Post()
  create(@Body() tratamientoDto) {
    return this.tratamientosRepository.insert(tratamientoDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.tratamientosRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.tratamientosRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.tratamientosRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.tratamientosRepository.delete(id);
  }
}
