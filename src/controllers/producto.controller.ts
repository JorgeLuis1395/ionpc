import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards} from "@nestjs/common";
import {ProductoRepository} from "../repositories/producto.repository";
import {RolGuard} from "../common/guards/rol.guard";

//@UseGuards(RolGuard)
@Controller('producto')
export class ProductoController {
  constructor(private productoRepository: ProductoRepository) {
  }

  @Post()
  create(@Body() productoDto) {
    return this.productoRepository.insert(productoDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.productoRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.productoRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.productoRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.productoRepository.delete(id);
  }
}
