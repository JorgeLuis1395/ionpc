import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import {TallasCamaronEnteroRepository} from '../../repositories/tallas-camaron-entero.repository';
import {ModalidadCamaronRepository} from "../../repositories/modalidad-camaron.repository";


@Controller('modalidadcamaron')
export class ModalidadCamaronController {
  constructor(private modalidadCamaronRepository: ModalidadCamaronRepository) {
  }

  @Post()
  create(@Body() modalidadCamaronDto) {
    return this.modalidadCamaronRepository.insert(modalidadCamaronDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.modalidadCamaronRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.modalidadCamaronRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.modalidadCamaronRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.modalidadCamaronRepository.delete(id);
  }
}
