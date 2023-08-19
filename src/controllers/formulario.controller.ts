import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { RolGuard } from "../common/guards/rol.guard";
import { FormularioRepository } from '../repositories/formulario.repository';

//@UseGuards(RolGuard)
@Controller('formulario')
export class FormularioController {
  constructor(private formularioRepository: FormularioRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.formularioRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.formularioRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.formularioRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() dto) {
    return await this.formularioRepository.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.formularioRepository.delete(id);
  }
}
