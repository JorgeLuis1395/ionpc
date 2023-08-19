import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import {MaterialesRepository} from "../../repositories/materiales.repository";


@Controller('materiales')
export class MaterialesController {
  constructor(private materialesRepository: MaterialesRepository) {
  }

  @Post()
  create(@Body() materialesDto) {
    return this.materialesRepository.insert(materialesDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.materialesRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.materialesRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.materialesRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.materialesRepository.delete(id);
  }
}
