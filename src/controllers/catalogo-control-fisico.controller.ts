import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards} from "@nestjs/common";
import {RolGuard} from "../common/guards/rol.guard";
import {CatalogoControlFisicoRepository} from "../repositories/catalogo-control-fisico.repository";

//@UseGuards(RolGuard)
@Controller('catalogo-control-fisico')
export class CatalogoControlFisicoController {
  constructor(private catalogoControlFisicoRepository: CatalogoControlFisicoRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.catalogoControlFisicoRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.catalogoControlFisicoRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.catalogoControlFisicoRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.catalogoControlFisicoRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.catalogoControlFisicoRepository.delete(id);
  }
}
