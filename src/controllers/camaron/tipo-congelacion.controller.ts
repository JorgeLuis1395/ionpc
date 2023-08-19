import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import {TipoCongelacionRepository} from '../../repositories/tipo-congelacion.repository';


@Controller('tipocongelacion')
export class TipoCongelacionController {
  constructor(private tipoCongelacionRepository: TipoCongelacionRepository) {
  }

  @Post()
  create(@Body() tipoCongelacionDto) {
    return this.tipoCongelacionRepository.insert(tipoCongelacionDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.tipoCongelacionRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.tipoCongelacionRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.tipoCongelacionRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.tipoCongelacionRepository.delete(id);
  }
}
