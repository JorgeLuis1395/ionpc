import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ProductoTranscityRepository } from '../../repositories/producto-transcity.repository';


@Controller('productoTranscity')
export class ProductoTranscityController {
  constructor(private productoTrancityRepository: ProductoTranscityRepository) {
  }

  @Post()
  create(@Body() productoTranscityDto) {
    return this.productoTrancityRepository.insert(productoTranscityDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.productoTrancityRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.productoTrancityRepository.selectById(id));
  }

  @Get('lote/:lote')
  async findOneLote(@Param('lote') lote, @Res() response) {
    return response.send(await this.productoTrancityRepository.selectByLote(lote));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.productoTrancityRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.productoTrancityRepository.delete(id);
  }
}
