import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards} from '@nestjs/common';
import {RolGuard} from '../common/guards/rol.guard';
import {NotificacionRetiroRepository} from '../repositories/notificacion-retiro.repository';

//@UseGuards(RolGuard)
@Controller('notificacion-retiro')
export class NotificacionRetiroController {
  constructor(
    private notificacionRetiroRepository: NotificacionRetiroRepository) {
  }

  @Post()
  create(@Body() notificacionRetiroDto) {
    return this.notificacionRetiroRepository.insert(notificacionRetiroDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.notificacionRetiroRepository.selectAll());
  }

  @Get('sinFacturaInformativa')
  async findAllSinFacturaInformativa(@Res() response) {
    return response.send(await this.notificacionRetiroRepository.selectAllSinFacturaInformativa());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.notificacionRetiroRepository.selectById(id));
  }

  @Get('detalleItem/:id')
  async findDetallesItem(@Param('id') id, @Res() response) {
    return response.send(await this.notificacionRetiroRepository.selectByIdDetalles(id));
  }

  @Get('allInformacion/:id')
  async findAllInformation(@Param('id') id, @Res() response) {
    return response.send(await this.notificacionRetiroRepository.selectByIdAllInformation(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.notificacionRetiroRepository.update(id, nuevo);
  }

  @Put('anular/:id')
  putAnular(@Param('id') id) {
    return this.notificacionRetiroRepository.anular(id);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.notificacionRetiroRepository.delete(id);
  }
}
