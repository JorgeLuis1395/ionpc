import { BadRequestException, Body, Controller, Get, Post, Put, Query, Res, UseGuards } from '@nestjs/common';


import * as moment from 'moment';
import { Dhis2Service } from '../../services/external/dhis2.service';


@Controller('dhis2')
export class Dhis2Controller {
  constructor(private readonly _dhis2Service: Dhis2Service) {
  }



  @Get('esri')
  getIncidententesAbiertosMapeados(
    @Query('fechaHoraInicio') fechaHoraInicio?,
    @Query('fechaHoraFin') fechaHoraFin?,
  ) {
    if (fechaHoraInicio && fechaHoraFin) {
      const formato = 'YYYY-MM-DD';
      fechaHoraInicio = moment(fechaHoraInicio, formato).toDate();
      fechaHoraFin = moment(fechaHoraFin, formato).toDate();
      return this._dhis2Service.getHttpIncidentesAbiertos(
        fechaHoraInicio,
        fechaHoraFin,
      );
    }
  }
}
