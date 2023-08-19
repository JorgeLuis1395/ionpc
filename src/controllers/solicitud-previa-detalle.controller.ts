import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards} from "@nestjs/common";
import {SolicitudPreviaDetalleRepository} from "../repositories/solicitud-previa-detalle.repository";
import {InsertResult} from "typeorm";
import {RolGuard} from "../common/guards/rol.guard";

//@UseGuards(RolGuard)
@Controller('solicitud-previa-detalle')
export class SolicitudPreviaDetalleController {
  constructor(private solicitudPreviaDetalleRepository: SolicitudPreviaDetalleRepository) {
  }

  @Post()
  create(@Body() dto): Promise<InsertResult> {
    return this.solicitudPreviaDetalleRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.solicitudPreviaDetalleRepository.selectAll());
  }

  @Get('por-cabecera/:idCabecera')
  async findAllPorCabecera(@Param('idCabecera') idCabecera, @Res() response) {
    return response.send(await this.solicitudPreviaDetalleRepository.selectAllByCabecera(idCabecera));
  }

  @Get('por-rack/:idRack')
  async findAllPorRack(@Param('idRack') idRack, @Res() response) {
    return response.send(await this.solicitudPreviaDetalleRepository.selectAllByRack(idRack));
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.solicitudPreviaDetalleRepository.selectById(id));
  }

  @Get('producto/:idSolicitudPreviaDetalle')
  async findProductoByIdDetalleSP(@Param('idSolicitudPreviaDetalle') idSolicitudPreviaDetalle, @Res() response) {
    return response.send(await this.solicitudPreviaDetalleRepository.selectProductoByIdDetalleSP(idSolicitudPreviaDetalle));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() dto) {
    return await this.solicitudPreviaDetalleRepository.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.solicitudPreviaDetalleRepository.delete(id);
  }
}
