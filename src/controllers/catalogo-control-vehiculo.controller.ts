import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards} from "@nestjs/common";
import {CatalogoControlVehiculoRepository} from "../repositories/catalogo-control-vehiculo.repository";
import {RolGuard} from "../common/guards/rol.guard";

//@UseGuards(RolGuard)
@Controller('catalogo-control-vehiculo')
export class CatalogoControlVehiculoController {
  constructor(private catalogoControlVehiculoRepository: CatalogoControlVehiculoRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.catalogoControlVehiculoRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.catalogoControlVehiculoRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.catalogoControlVehiculoRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() dto) {
    return await this.catalogoControlVehiculoRepository.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.catalogoControlVehiculoRepository.delete(id);
  }
}
