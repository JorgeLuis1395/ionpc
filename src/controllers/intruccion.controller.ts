import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { InstruccionRepository } from '../repositories/instruccion.repository';

@Controller('instruccion')
export class InstruccionController {
  constructor(private instruccionRepository: InstruccionRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.instruccionRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.instruccionRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.instruccionRepository.selectById(id));
  }

 /* @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.instruccionRepository.selectByIdUsuario(id));
  }*/

  @Get('idUsuario/:id')
  async findUsuario(@Param('id') id, @Res() response) {
    return response.send(await this.instruccionRepository.selectUsuario(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.instruccionRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.instruccionRepository.delete(id);
  }
}
