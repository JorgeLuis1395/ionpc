import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards} from "@nestjs/common";
import {RolGuard} from "../common/guards/rol.guard";
import { ExportadorRepository } from '../repositories/exportador.repository';

//@UseGuards(RolGuard)
@Controller('exportador')
export class ExportadorController {
  constructor(private exportadorRepository: ExportadorRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.exportadorRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.exportadorRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.exportadorRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() dto) {
    return await this.exportadorRepository.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.exportadorRepository.delete(id);
  }
}
