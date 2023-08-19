import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';

import { DocumentosFamiliaresRepository } from '../repositories/documentos-familiares.repository';

@Controller('documentos-familiares')
export class DocumentosFamiliaresController {
  constructor(private documentosFamiliaresRepository: DocumentosFamiliaresRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.documentosFamiliaresRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.documentosFamiliaresRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.documentosFamiliaresRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.documentosFamiliaresRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.documentosFamiliaresRepository.delete(id);
  }
}
