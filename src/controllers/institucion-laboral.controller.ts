import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { InstitucionLaboralRepository } from '../repositories/institucion-laboral.repository';

@Controller('institucion-laboral')
export class InstitucionLaboralController {
  constructor(private institucionLaboralRepository: InstitucionLaboralRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.institucionLaboralRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.institucionLaboralRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.institucionLaboralRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.institucionLaboralRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.institucionLaboralRepository.delete(id);
  }
}
