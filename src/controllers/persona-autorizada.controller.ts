import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { RolGuard } from '../common/guards/rol.guard';
import { PersonaAutorizadaRepository } from '../repositories/persona-autorizada.repository';

//@UseGuards(RolGuard)
@Controller('persona-autorizada')
export class PersonaAutorizadaController {
  constructor(private personaAutorizadaRepository: PersonaAutorizadaRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.personaAutorizadaRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.personaAutorizadaRepository.selectAll());
  }

  @Get('habilitados')
  async findAllHabilitados(@Res() response) {
    return response.send(await this.personaAutorizadaRepository.selectAllHabilitados());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.personaAutorizadaRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.personaAutorizadaRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.personaAutorizadaRepository.delete(id);
  }
}
