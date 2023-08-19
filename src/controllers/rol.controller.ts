import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { RolGuard } from '../common/guards/rol.guard';
import { RolRepository } from '../repositories/rol.repository';

//@UseGuards(RolGuard)
@Controller('rol')
export class RolController {

  constructor(private readonly rolRepository: RolRepository) {
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.rolRepository.selectAll());
  }

  @Get(':id')
  async findById(@Res() response, @Param('id')id) {
    return response.send(await this.rolRepository.selectById(id));
  }

  @Put(':id')
  putRol(@Param('id') id, @Body() updateRolDto) {
    return this.rolRepository.update(+id, updateRolDto);
  }

  @Post()
  postRol(@Body() crearRolDto) {
    return this.rolRepository.insert(crearRolDto);
  }

  @Delete(':id')
  deleteRol(@Param('id') id: number) {
    return this.rolRepository.delete(+id);
  }
}
