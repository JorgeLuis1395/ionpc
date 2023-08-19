import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards} from "@nestjs/common";
import {SolicitudPreviaRepository} from "../repositories/solicitud-previa.repository";
import {SolicitudPreviaDto} from "../dtos/solicitud-previa.dto";
import {SolicitudPreviaEntity} from "../entities/solicitud-previa.entity";
import {RolGuard} from "../common/guards/rol.guard";

//@UseGuards(RolGuard)
@Controller('solicitud-previa')
export class SolicitudPreviaController {
  constructor(private solicitudPreviaRepository: SolicitudPreviaRepository) {
  }

  @Post()
  create(@Body() solicitudPreviaDto: SolicitudPreviaDto): Promise<SolicitudPreviaEntity> {
    return this.solicitudPreviaRepository.insert(solicitudPreviaDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.solicitudPreviaRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.solicitudPreviaRepository.selectById(id));
  }

  @Get('exportarPDF/:id')
  async findAllInformation(@Param('id') id, @Res() response) {
    return response.send(await this.solicitudPreviaRepository.selectByIdAllInformation(id));
  }

  @Get('idSolicitudPrevia/:id')
  async findSolicitudDetalleByIdSolicitudPrevia(@Param('id') id, @Res() response) {
    return response.send(await this.solicitudPreviaRepository.selectSolicitudesDetalleByIdSolicitudPrevia(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() solicitudPreviaDto) {
    return await this.solicitudPreviaRepository.update(id, solicitudPreviaDto);
  }

  @Put('cancelar/:id')
  putUpdateEstadoToCancelado(@Param('id') id) {
    return this.solicitudPreviaRepository.updateEstadoToCancelado(id);
  }

  @Put('habilitar/:id')
  putUpdateEstadoToCreado(@Param('id') id) {
    return this.solicitudPreviaRepository.updateEstadoToCreado(id);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.solicitudPreviaRepository.delete(id);
  }
}
