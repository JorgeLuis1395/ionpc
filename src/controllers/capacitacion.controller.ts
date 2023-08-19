import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { CapacitacionRepository } from '../repositories/capacitacion.repository';

@Controller('capacitacion')
export class CapacitacionController {
  constructor(private capacitacionRepository: CapacitacionRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.capacitacionRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.capacitacionRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.capacitacionRepository.selectById(id));
  }

 /* @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.capacitacionRepository.selectByIdUsuario(id));
  }*/

  @Get('idUsuario/:id')
  async findUsuario(@Param('id') id, @Res() response) {
    return response.send(await this.capacitacionRepository.selectUsuario(id));
  }



  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.capacitacionRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.capacitacionRepository.delete(id);
  }
}
