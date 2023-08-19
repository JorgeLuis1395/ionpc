import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { VacunacionService } from '../../services/external/vacunacion.service';
import { ImapService } from '../../services/external/imap.service';


@Controller('imap')
export class ImapController {
  constructor(private imap: ImapService
  ) {
  }

  @Get()
  async findAll(@Res() response, @Query() email:string) {
    return response.send(this.imap.ejectutar(email));
  }

}
