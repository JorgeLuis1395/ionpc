import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import {OtrasEspeciesRepository} from "../../repositories/otras-especies.repository";


@Controller('otrasespecies')
export class OtrasespeciesController {
  constructor(private otrasEspecoesRepository: OtrasEspeciesRepository) {
  }

  @Post()
  create(@Body() otrasespeciesDto) {
    return this.otrasEspecoesRepository.insert(otrasespeciesDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.otrasEspecoesRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.otrasEspecoesRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.otrasEspecoesRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.otrasEspecoesRepository.delete(id);
  }
}
