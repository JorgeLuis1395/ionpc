import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { EventosRepository } from '../repositories/eventos.repository';

//@UseGuards(RolGuard)
@Controller('eventos')
export class EventosController {
  constructor(private eventosRepository: EventosRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.eventosRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.eventosRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.eventosRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.eventosRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.eventosRepository.delete(id);
  }
}
