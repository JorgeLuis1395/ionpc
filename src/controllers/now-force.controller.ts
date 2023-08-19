import { BadRequestException, Body, Controller, Get, Post, Put, Query, Res, UseGuards } from '@nestjs/common';

import * as moment from 'moment';
import {NowForceService} from '../services/external/now-force.service';

@Controller('now-force')
export class NowForceController {
  constructor(private readonly _nowForceService: NowForceService) {
  }


  @Get('incidente/mapeado')
  getIncidententesAbiertosMapeados(
    @Query('fechaHoraInicio') fechaHoraInicio?,
    @Query('fechaHoraFin') fechaHoraFin?,
  ) {
    if (fechaHoraInicio && fechaHoraFin) {
      const formato = 'YYYY-MM-DD HH:mm:ss';
      fechaHoraInicio = moment(fechaHoraInicio, formato).toDate();
      fechaHoraFin = moment(fechaHoraFin, formato).toDate();
      return this._nowForceService.obtenerIncidentesMapeados(
        fechaHoraInicio,
        fechaHoraFin,
      );
    } else {
      return this._nowForceService.obtenerIncidentesMapeados();
    }
  }
}
