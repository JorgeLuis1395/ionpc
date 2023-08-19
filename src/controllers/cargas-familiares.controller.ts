import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';

import { CargasFamiliaresRepository } from '../repositories/cargas-familiares.repository';

@Controller('cargas-familiares')
export class CargasFamiliaresController {
  constructor(private cargasFamiliaresRepository: CargasFamiliaresRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.cargasFamiliaresRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.cargasFamiliaresRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.cargasFamiliaresRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.cargasFamiliaresRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.cargasFamiliaresRepository.delete(id);
  }
}
