import {
  Controller,
  Res,
  Query,
  Get,
  HttpStatus,
  Post,
  Body,
  Param,
  NotFoundException,
  Put,
  Delete,
} from '@nestjs/common';

import { IncidenteDataRepository } from '../../repositories/mongo/incidente-data.repository';
import { CreateIncidenteDTO } from '../../dtos/Mongo/crear-inicidente.dto';
import moment = require('moment');
import { UsuarioUbicacionRepository } from '../../repositories/mongo/usuario-ubicacion.repository';
import { UbicacionUsuarioDTO } from '../../dtos/ubicacion-usuario.dto';


@Controller('usuario-lectura-qr')
export class UsuarioUbicacionController {
  constructor(private readonly IncidenteDatService: UsuarioUbicacionRepository) {
  }

  @Post('/create')
  async addCustomer(@Res() res, @Body() crearUbicacionDto: UbicacionUsuarioDTO) {
    const lists = await this.IncidenteDatService.create(crearUbicacionDto);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been created successfully',
      lists,
    });
  }

  @Get('all')
  async findAll(@Res() res) {
    const lists = await this.IncidenteDatService.findAll();
    return res.status(HttpStatus.OK).json(lists);
  }

  @Get('id/:id')
  async findById(@Res() res, @Param('id') id: string) {
    const lists = await this.IncidenteDatService.findById(id);
    if (!lists) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json(lists);
  }

  @Get('padre/:id')
  async seleccionarEventoPadreControl(@Res() res, @Param('id') id: string) {
    const lists = await this.IncidenteDatService.seleccionarPorEventoPadre(id);
    if (!lists) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json(lists);
  }

  @Get('type/:tipo')
  async findByType(@Res() res, @Param('tipo') tipo: string) {
    const lists = await this.IncidenteDatService.find(tipo);
    if (!lists) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json(lists);
  }

  /*
    @Put('update/:id')
    async update(@Res() res, @Param('id') id: string, @Body() UsuarioUbicacionDto: UbicacionUsuarioDTO) {

      const lists = await this.IncidenteDatService.update(id, UsuarioUbicacionDto );
      if (!lists) throw new NotFoundException('Id does not exist!');
      return res.status(HttpStatus.OK).json({
        message: 'Post has been successfully updated',
        lists,
      });
    }*/

  @Delete('/delete')
  async delete(@Res() res, @Param('id') id: string) {
    const lists = await this.IncidenteDatService.delete(id);
    if (!lists) throw new NotFoundException('Post does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted',
      lists,
    });
  }

  @Get('visitaLocales')
  getIncidententesFechasTipoMapeados(
    @Query('fechaHoraInicio') fechaHoraInicio?,
    @Query('idUsuario') idUsuario?,
  ) {
    if (fechaHoraInicio) {
      const formato = 'YYYY-MM-DD HH:mm:ss';
      let fechaHoraFin;
      const auxFechaFinValor = new Date(fechaHoraInicio);
      const auxFecha = new Date(auxFechaFinValor.setDate(auxFechaFinValor.getDate() - 15));
      fechaHoraInicio = moment(fechaHoraInicio, formato).toDate();
      fechaHoraFin = moment(auxFecha, formato).toDate();
      return this.IncidenteDatService.seleccionarPorFechasUsuarioPositivo(
        fechaHoraInicio,
        fechaHoraFin,
        idUsuario,
      );
    } else {
      return;
    }
  }

  @Get('localesUsuarios')
  seleccionarLocalFecha(
    @Query('fechaHoraInicio') fechaHoraInicio?,
    @Query('local') local?,
  ) {
    if (fechaHoraInicio) {
      const formato = 'YYYY-MM-DD HH:mm:ss';
      let fechaHoraFin;
      const auxFechaFinValor = new Date(fechaHoraInicio);
      const auxFecha = new Date(auxFechaFinValor.setDate(auxFechaFinValor.getHours() + 2));
      fechaHoraInicio = moment(fechaHoraInicio, formato).toDate();
      fechaHoraFin = moment(auxFecha, formato).toDate();
      return this.IncidenteDatService.seleccionarLocalFecha(
        fechaHoraInicio,
        fechaHoraFin,
        local,
      );
    } else {
      return;
    }
  }

  @Get('localesTrabajadores')
  seleccionarLocalTrabajadorFecha(
    @Query('fechaHoraInicio') fechaHoraInicio?,
    @Query('local') local?,
  ) {
    if (fechaHoraInicio) {
      const formato = 'YYYY-MM-DD HH:mm:ss';
      let fechaHoraFin;
      const auxFechaFinValor = new Date(fechaHoraInicio);
      const auxFecha = new Date(auxFechaFinValor.setDate(auxFechaFinValor.getHours() + 8));
      fechaHoraInicio = moment(fechaHoraInicio, formato).toDate();
      fechaHoraFin = moment(auxFecha, formato).toDate();
      return this.IncidenteDatService.seleccionarLocalFecha(
        fechaHoraInicio,
        fechaHoraFin,
        local,
      );
    } else {
      return;
    }
  }

}
