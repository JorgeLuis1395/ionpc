import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {NotificacionEgresoVehiculoRepository} from "../repositories/notificacion-egreso-vehiculo.repository";

@Controller('notificacion-egreso-vehiculo')
export class NotificacionEgresoVehiculoController {
  constructor(private readonly notificacionEgresoVehiculoRepository: NotificacionEgresoVehiculoRepository) {
  }

  @Post()
  postInsert(@Body() crearDto) {
    return this.notificacionEgresoVehiculoRepository.insert(crearDto);
  }

  @Get()
  getSelect() {
    return this.notificacionEgresoVehiculoRepository.select();
  }

  @Get('datos-reporte/:id')
  getSelectDatosReporte(@Param('id') id) {
    return this.notificacionEgresoVehiculoRepository.selectDatosReporte(+id);
  }

  @Get(':id')
  getSelectById(@Param('id') id) {
    return this.notificacionEgresoVehiculoRepository.selectById(+id);
  }

  @Put(':id')
  putUpdate(@Param('id') id, @Body() editarDto) {
    return this.notificacionEgresoVehiculoRepository.update(+id, editarDto);
  }

  @Put('anular/:id')
  putAnular(@Param('id') id) {
    return this.notificacionEgresoVehiculoRepository.anular(+id);
  }

}
