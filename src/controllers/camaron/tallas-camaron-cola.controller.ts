import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import {TallasCamaronColaRepository} from '../../repositories/tallas-camaron-cola.repository';


@Controller('tallascamaroncola')
export class TallasCamaronColaController {
  constructor(private tallasCamaronesColaRepository: TallasCamaronColaRepository) {
  }

  @Post()
  create(@Body() tiposCamaronColaDto) {
    return this.tallasCamaronesColaRepository.insert(tiposCamaronColaDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.tallasCamaronesColaRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.tallasCamaronesColaRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.tallasCamaronesColaRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.tallasCamaronesColaRepository.delete(id);
  }
}
