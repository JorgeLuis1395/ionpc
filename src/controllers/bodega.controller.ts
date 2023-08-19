import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { RolGuard } from '../common/guards/rol.guard';
import { BodegaRepository } from '../repositories/bodega.repository';

//@UseGuards(RolGuard)
@Controller('bodega')
export class BodegaController {
  constructor(private bodegaRepository: BodegaRepository) {
  }

  @Post()
  create(@Body() bodegaDto) {
    return this.bodegaRepository.insert(bodegaDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.bodegaRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.bodegaRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.bodegaRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.bodegaRepository.delete(id);
  }
}
