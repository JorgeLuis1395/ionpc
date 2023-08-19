import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards} from '@nestjs/common';
import {RolGuard} from '../common/guards/rol.guard';
import {RackRepository} from '../repositories/rack.repository';

//@UseGuards(RolGuard)
@Controller('rack')
export class RackController {
  constructor(private rackRepository: RackRepository) {
  }

  @Post()
  create(@Body() rackDto) {
    return this.rackRepository.insert(rackDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.rackRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.rackRepository.selectById(id));
  }

  @Get('por-bodega/:idBodega')
  async findAllByBodega(@Param('idBodega') idBodega, @Res() response) {
    return response.send(await this.rackRepository.selectAllByBodega(idBodega));
  }

  @Get('saldo-area/:idBodega')
  async getSelectSaldoArea(@Param('idBodega') idBodega, @Res() response) {
    return response.send({saldoArea: await this.rackRepository.selectSaldoArea(+idBodega)});
  }

  @Get('numero-racks/:idBodega')
  async getSelectNumeroRacks(@Param('idBodega') idBodega, @Res() response) {
    return response.send({numeroRacks: await this.rackRepository.selectNumeroRacksPorIdBodega(+idBodega)});
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.rackRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.rackRepository.delete(id);
  }
}
