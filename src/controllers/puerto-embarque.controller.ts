import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards} from "@nestjs/common";
import {RolGuard} from '../common/guards/rol.guard';
import { PuertoEmbarqueRepository } from '../repositories/puerto-embarque.repository';

//@UseGuards(RolGuard)
@Controller('puerto-embarque')
export class PuertoEmbarqueController {
  constructor(private puertoEmbarqueRepository: PuertoEmbarqueRepository) {
  }

  @Post()
  create(@Body() dto) {
    return this.puertoEmbarqueRepository.insert(dto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.puertoEmbarqueRepository.selectAll());
  }

  @Get('habilitados')
  async findAllHabilitados(@Res() response) {
    return response.send(await this.puertoEmbarqueRepository.selectAllHabilitados());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.puertoEmbarqueRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.puertoEmbarqueRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.puertoEmbarqueRepository.delete(id);
  }
}
