import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';

import { EmpresaRepository } from '../repositories/empresa.repository';

@Controller('empresa')
export class EmpresaController {
  constructor(private empresaRepository: EmpresaRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.empresaRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.empresaRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.empresaRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.empresaRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.empresaRepository.delete(id);
  }
}
