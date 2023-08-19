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

import moment = require('moment');
import { AnalisisCalidadRepository } from '../../repositories/mongo/analisis-calidad.repository';
import { AnalisisCalidadDto } from '../../dtos/Mongo/analisis-calidad.dto';
import { EmailMongoRepository } from '../../repositories/mongo/email.repository';
import { EmailDto } from '../../dtos/Mongo/email.dto';


@Controller('email')
export class EmailController {
  constructor(private readonly analisisCalidadRepository: EmailMongoRepository) {
  }

  @Post('/create')
  async addCustomer(@Res() res, @Body() crearInicidenteDto: any) {
    const lists = await this.analisisCalidadRepository.create(crearInicidenteDto);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been created successfully',
      lists,
    });
  }

  @Get('all')
  async findAll(@Res() res) {
    const lists = await this.analisisCalidadRepository.findAll();
    return res.status(HttpStatus.OK).json(lists);
  }



  @Get('id/:id')
  async findById(@Res() res, @Param('id') id: string) {
    const lists = await this.analisisCalidadRepository.findById(id);
    if (!lists) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json(lists);
  }



  @Put('update/:id')
  async update(@Res() res, @Param('id') id: string, @Body() crearInicidenteDto: EmailDto) {

    const lists = await this.analisisCalidadRepository.update(id, crearInicidenteDto);
    if (!lists) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      lists,
    });
  }

  @Delete('/delete/:id')
  async delete(@Res() res, @Param('id') id: string) {
    const lists = await this.analisisCalidadRepository.delete(id);
    if (!lists) throw new NotFoundException('Post does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted',
      lists,
    });
  }

}
