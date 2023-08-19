import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards} from '@nestjs/common';
import {RolGuard} from '../common/guards/rol.guard';
import { PuertoDespachoRepository } from '../repositories/puerto-despacho.repository';

//@UseGuards(RolGuard)
@Controller('puerto-despacho')
export class PuertoDespachoController {
  constructor(private puertoDespachoRepository: PuertoDespachoRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.puertoDespachoRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.puertoDespachoRepository.selectAll());
  }

  @Get('habilitados')
  async findAllHabilitados(@Res() response) {
    return response.send(await this.puertoDespachoRepository.selectAllHabilitados());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.puertoDespachoRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.puertoDespachoRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.puertoDespachoRepository.delete(id);
  }
}
