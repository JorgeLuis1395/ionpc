import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { GeneroRepository } from '../repositories/genero.repository';

@Controller('genero')
export class GeneroController {
  constructor(private generoRepository: GeneroRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.generoRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.generoRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.generoRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.generoRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.generoRepository.delete(id);
  }
}
