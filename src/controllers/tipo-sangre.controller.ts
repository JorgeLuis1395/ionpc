import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { TipoSangreRepository } from '../repositories/tipo-sangre.repository';

@Controller('tipo-sangre')
export class TipoSangreController {
  constructor(private tipoSangreRepository: TipoSangreRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.tipoSangreRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.tipoSangreRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.tipoSangreRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.tipoSangreRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.tipoSangreRepository.delete(id);
  }
}
