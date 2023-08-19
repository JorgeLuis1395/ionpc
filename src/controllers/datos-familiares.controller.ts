import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';

import { DatosFamiliaresRepository } from '../repositories/datos-familiares.repository';

@Controller('datos-familiares')
export class DatosFamiliaresController {
  constructor(private datosFamiliaresRepository: DatosFamiliaresRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.datosFamiliaresRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.datosFamiliaresRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.datosFamiliaresRepository.selectById(id));
  }

  @Get('idUsuario/:id')
  async findUsuario(@Param('id') id, @Res() response) {
    return response.send(await this.datosFamiliaresRepository.selectUsuario(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.datosFamiliaresRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.datosFamiliaresRepository.delete(id);
  }
}
