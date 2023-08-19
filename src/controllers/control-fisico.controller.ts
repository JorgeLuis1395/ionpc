import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards} from '@nestjs/common';
import {RolGuard} from '../common/guards/rol.guard';
import {ControlFisicoRepository} from '../repositories/control-fisico.repository';

//@UseGuards(RolGuard)
@Controller('control-fisico')
export class ControlFisicoController {
  constructor(private controlFisicoRepository: ControlFisicoRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.controlFisicoRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.controlFisicoRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.controlFisicoRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.controlFisicoRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.controlFisicoRepository.delete(id);
  }
}
