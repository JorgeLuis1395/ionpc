import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import {TiposCamaronRepository} from '../../repositories/tipos-camaron.repository';


@Controller('tiposcamaron')
export class TiposCamaronController {
  constructor(private tiposCamaronRepository: TiposCamaronRepository) {
  }

  @Post()
  create(@Body() tiposCamaronDto) {
    return this.tiposCamaronRepository.insert(tiposCamaronDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.tiposCamaronRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.tiposCamaronRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.tiposCamaronRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.tiposCamaronRepository.delete(id);
  }
}
