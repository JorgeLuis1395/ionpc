import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards} from "@nestjs/common";
import {ClienteRepository} from "../repositories/cliente.repository";
import {RolGuard} from "../common/guards/rol.guard";
import {ControlVehiculoRepository} from "../repositories/control-vehiculo.repository";

//@UseGuards(RolGuard)
@Controller('control-vehiculo')
export class ControlVehiculoController {
  constructor(private controlVehiculoRepository: ControlVehiculoRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.controlVehiculoRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.controlVehiculoRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.controlVehiculoRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.controlVehiculoRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.controlVehiculoRepository.delete(id);
  }
}
