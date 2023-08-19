import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import {MaterialesRepository} from "../../repositories/materiales.repository";
import {ClienteTranscityRepository} from "../../repositories/cliente-transcity.repository";


@Controller('clienteTrasncity')
export class ClienteTranscityController {
  constructor(private clienteTranscityRepository: ClienteTranscityRepository) {
  }

  @Post()
  create(@Body() clienteTranscityDto) {
    return this.clienteTranscityRepository.insert(clienteTranscityDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.clienteTranscityRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.clienteTranscityRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.clienteTranscityRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.clienteTranscityRepository.delete(id);
  }
}
