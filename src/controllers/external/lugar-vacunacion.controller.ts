import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { VacunacionService } from '../../services/external/vacunacion.service';


@Controller('vacunacion')
export class lugarVacunacionController {
  constructor(private vacunacionService: VacunacionService
  ) {
  }

  @Post()

  create(@Body() bodegaDto) {


    return this.vacunacionService.postLugarVacunacion(bodegaDto);

  }

}
