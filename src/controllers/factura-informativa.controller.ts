import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards} from '@nestjs/common';
import {RolGuard} from '../common/guards/rol.guard';
import {FacturaInformativaRepository} from '../repositories/factura-informativa.repository';

//@UseGuards(RolGuard)
@Controller('factura-informativa')
export class FacturaInformativaController {
  constructor(private facturaInformativaRepository: FacturaInformativaRepository) {
  }

  @Post()
  create(@Body() facturaInformativaDto) {
    return this.facturaInformativaRepository.insert(facturaInformativaDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.facturaInformativaRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.facturaInformativaRepository.selectById(id));
  }

  @Get('allInformacion/:id')
  async findAllInformation(@Param('id') id, @Res() response) {
    return response.send(await this.facturaInformativaRepository.selectByIdAllInformation(id));
  }

  @Get('sin-notificacion-egreso-vehiculo')
  getSelectAllSinNotificacionEgresoVehiculo() {
    return this.facturaInformativaRepository.selectAllSinNotificacionEgresoVehiculoCompletado();
  }

  @Get('datos-notificacion-egreso-vehiculo/:id')
  getSelectDatosNotificacionEgreso(@Param('id') id) {
    return this.facturaInformativaRepository.selectDatosNotificacionEgreso(+id);
  }

  @Get('datos-notificacion-egreso-vehiculo-en-retiro/:id')
  getSelectDatosNotificacionEgresoConVehiculosEnRetiro(@Param('id') id) {
    return this.facturaInformativaRepository.selectDatosNotificacionEgresoConVehiculosEnRetiro(+id);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.facturaInformativaRepository.update(id, nuevo);
  }

  @Put('anular/:id')
  async putAnular(@Param('id') id) {
    return await this.facturaInformativaRepository.anular(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.facturaInformativaRepository.delete(id);
  }
}
