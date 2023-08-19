import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards} from "@nestjs/common";
import {InsertResult} from 'typeorm';
import {DetalleItemProductoRepository} from '../repositories/detalle-item-producto.repository';
import {RolGuard} from '../common/guards/rol.guard';

//@UseGuards(RolGuard)
@Controller('detalle-item-producto')
export class DetalleItemProductoController {
  constructor(private detalleItemProductoRepository: DetalleItemProductoRepository) {
  }

  @Post()
  create(@Body() dto): Promise<InsertResult> {
    return this.detalleItemProductoRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.detalleItemProductoRepository.selectAll());
  }

  @Get('por-detalle-sp/:idDetalleSP')
  async findAllPorCabecera(@Param('idDetalleSP') idDetalleSP, @Res() response) {
    return response.send(await this.detalleItemProductoRepository.selectAllByDetalleSP(idDetalleSP));
  }

  @Get('por-patron/:patron')
  async findAllPorPatron(@Param('patron') patron, @Res() response) {
    return response.send(await this.detalleItemProductoRepository.selectAllByPatron(patron));
  }

  @Get(':id')
  async findOneById(@Param('id') id, @Res() response) {
    return response.send(await this.detalleItemProductoRepository.selectById(id));
  }

  @Get('por-chasis/:chasis')
  async findOneByChasisId(@Param('chasis') chasis, @Res() response) {
    return response.send(await this.detalleItemProductoRepository.selectOneByChasis(chasis));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() dto) {
    return await this.detalleItemProductoRepository.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.detalleItemProductoRepository.delete(id);
  }
}
