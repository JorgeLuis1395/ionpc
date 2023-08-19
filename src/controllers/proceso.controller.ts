import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { RolGuard } from '../common/guards/rol.guard';
import { ProcesoRepository } from '../repositories/proceso.repository';

//@UseGuards(RolGuard)
@Controller('proceso')
export class ProcesoController {
  constructor(private procesoRepository: ProcesoRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.procesoRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.procesoRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.procesoRepository.selectById(id));
  }


  @Put(':id')
  async update(@Param('id') id, @Body() dto) {
    return await this.procesoRepository.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.procesoRepository.delete(id);
  }

}
