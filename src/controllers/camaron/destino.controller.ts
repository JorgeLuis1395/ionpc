import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import {MaterialesRepository} from "../../repositories/materiales.repository";
import {ClienteTranscityRepository} from "../../repositories/cliente-transcity.repository";
import {MarcaRepository} from "../../repositories/marca.repository";
import {DestinoRepository} from "../../repositories/destino.repository";


@Controller('destino')
export class DestinoController {
  constructor(private destinoRepository: DestinoRepository) {
  }

  @Post()
  create(@Body() destinoDto) {
    return this.destinoRepository.insert(destinoDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.destinoRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.destinoRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.destinoRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.destinoRepository.delete(id);
  }
}
