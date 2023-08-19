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



@Controller('incidente-data')
export class IncidenteDataController {
  constructor(private readonly IncidenteDatService: IncidenteDataRepository) {
  }

  @Post('/create')
  async addCustomer(@Res() res, @Body() crearInicidenteDto: CreateIncidenteDTO) {
    const lists = await this.IncidenteDatService.create(crearInicidenteDto);
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

  @Put('update/:id')
  async update(@Res() res, @Param('id') id: string, @Body() crearInicidenteDto: CreateIncidenteDTO) {

    const lists = await this.IncidenteDatService.update(id, crearInicidenteDto);
    if (!lists) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      lists,
    });
  }

  @Delete('/delete')
  async delete(@Res() res, @Param('id') id: string) {
    const lists = await this.IncidenteDatService.delete(id);
    if (!lists) throw new NotFoundException('Post does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted',
      lists,
    });
  }

  @Get('incidente')
  getIncidententesCreacionMapeados(
    @Query('fechaHoraInicio') fechaHoraInicio?,
    @Query('fechaHoraFin') fechaHoraFin?,
  ) {
    if (fechaHoraInicio && fechaHoraFin) {
      const formato = 'YYYY-MM-DD HH:mm:ss';
      fechaHoraInicio = moment(fechaHoraInicio, formato).toDate();
      fechaHoraFin = moment(fechaHoraFin, formato).toDate();
      return this.IncidenteDatService.seleccionarPorFechasCreacion(
        fechaHoraInicio,
        fechaHoraFin,
      );
    } else {
      return;
    }
  }

  @Get('incidenteactualizado')
  getIncidententesAbiertosMapeados(
    @Query('fechaHoraInicio') fechaHoraInicio?,
    @Query('fechaHoraFin') fechaHoraFin?,
  ) {
    if (fechaHoraInicio && fechaHoraFin) {
      const formato = 'YYYY-MM-DD HH:mm:ss';
      fechaHoraInicio = moment(fechaHoraInicio, formato).toDate();
      fechaHoraFin = moment(fechaHoraFin, formato).toDate();
      return this.IncidenteDatService.seleccionarPorFechasActualizacion(
        fechaHoraInicio,
        fechaHoraFin,
      );
    } else {
      return;
    }
  }

  @Get('incidentefechatipo')
  getIncidententesFechasTipoMapeados(
    @Query('fechaHoraInicio') fechaHoraInicio?,
    @Query('fechaHoraFin') fechaHoraFin?,
    @Query('tipo') tipo?,
  ) {
    if (fechaHoraInicio && fechaHoraFin) {
      const formato = 'YYYY-MM-DD HH:mm:ss';
      fechaHoraInicio = moment(fechaHoraInicio, formato).toDate();
      fechaHoraFin = moment(fechaHoraFin, formato).toDate();
      return this.IncidenteDatService.seleccionarPorFechasCreacionTipo(
        fechaHoraInicio,
        fechaHoraFin,
        tipo,
      );
    } else {
      return;
    }
  }


  @Get('usuarioSalida')
  getIncidententesSalida(
    @Query('id') id?,
  ) {
    if (id) {
      return this.IncidenteDatService.seleccionarPorUsuarioTipoSalida(
        id,
      );
    } else {
      return;
    }
  }


  @Get('usuarioEntrada')
  getIncidententesEntrada(
    @Query('id') id?,
  ) {
    if (id) {
      return this.IncidenteDatService.seleccionarPorUsuarioTipoEntrada(
        id,
      );
    } else {
      return;
    }
  }

  @Get('datosPruebaPCR')
  getDatosPruebaPcr(
    @Query('id') id?,
  ) {
    if (id) {
      const formato = 'YYYY-MM-DD HH:mm:ss';
      let fechaHoraInicio = new Date();
      let fechaHoraFin = new Date();
      fechaHoraInicio.setDate(fechaHoraInicio.getDate() - 15);
      fechaHoraInicio = moment(fechaHoraInicio, formato).toDate();
      fechaHoraFin = moment(fechaHoraFin, formato).toDate();

      return this.IncidenteDatService.DatosPruebaPcrPorIdUsuarios(
        fechaHoraInicio,
        fechaHoraFin,
        id,
      );
    } else {
      return;
    }
  }

  @Get('resultadoPruebaVepidemiologica')
  getResultadoPruebaVepidemiologica(
    @Query('id') id?,
  ) {
    if (id) {
      const formato = 'YYYY-MM-DD HH:mm:ss';
      let fechaHoraInicio = new Date();
      let fechaHoraFin = new Date();
      fechaHoraInicio.setDate(fechaHoraInicio.getDate() - 15);
      fechaHoraInicio = moment(fechaHoraInicio, formato).toDate();
      fechaHoraFin = moment(fechaHoraFin, formato).toDate();

      return this.IncidenteDatService.ResultadoPruebaVepidemiologicaPorIdUsuarios(
        fechaHoraInicio,
        fechaHoraFin,
        id,
      );
    } else {
      return;
    }
  }

  @Get('estadoUsuarioEntrada')
  getIncidententesEntradaEstado(
    @Query('id') id?,
  ) {
    if (id) {
      return this.IncidenteDatService.seleccionarPorUsuarioTipoEntradaEstado(
        id,
      );
    } else {
      return;
    }
  }

  @Get('estadoUsuarioAbierto')
  getIncidententesIdEstadoAbiertos(
    @Query('id') id?,
  ) {
    if (id) {
      return this.IncidenteDatService.seleccionarPorUsuarioEstadoAbiertoEntrada(
        id,
      );
    } else {
      return;
    }
  }

  @Get('estadoUsuarioSalida')
  getIncidententesSalidaEstado(
    @Query('id') id?,
  ) {
    if (id) {
      return this.IncidenteDatService.seleccionarPorUsuarioTipoSalidaEstado(
        id,
      );
    } else {
      return;
    }
  }

  @Post('cabeceraTabla')
  getConsultaTablas(@Res() res, @Body() dato) {
    if (dato) {
      return this.IncidenteDatService.generarConsulta(dato);
    } else {
      return;
    }
  }
}
