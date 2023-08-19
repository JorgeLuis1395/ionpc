import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import {TallasCamaronEnteroRepository} from '../../repositories/tallas-camaron-entero.repository';


@Controller('tallascamaronentero')
export class TallasCamaronEnteroController {
  constructor(private tallasCamaronesEnteroRepository: TallasCamaronEnteroRepository) {
  }

  @Post()
  create(@Body() tiposCamaronEnteroDto) {
    return this.tallasCamaronesEnteroRepository.insert(tiposCamaronEnteroDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.tallasCamaronesEnteroRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.tallasCamaronesEnteroRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.tallasCamaronesEnteroRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.tallasCamaronesEnteroRepository.delete(id);
  }
}
