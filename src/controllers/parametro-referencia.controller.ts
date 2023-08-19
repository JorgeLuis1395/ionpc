import { Body, Controller, Get, Param, Put, Res, UseGuards } from '@nestjs/common';
import { RolGuard } from '../common/guards/rol.guard';
import { ParametroReferenciaRepository } from '../repositories/parametro-referencia.repository';

//@UseGuards(RolGuard)
@Controller('parametro-referencia')
export class ParametroReferenciaController {
  constructor(
    private parametroReferenciaRepository: ParametroReferenciaRepository) {
  }

  /*@Post()
  create(@Body() parametroReferenciaDto) {
    return this.parametroReferenciaRepository.insert(parametroReferenciaDto);
  }*/

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.parametroReferenciaRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.parametroReferenciaRepository.selectById(id));
  }

  @Get('parametro-actual/:codigoProceso')
  async getSelectOneParametroActual(@Param('codigoProceso') codigoProceso, @Res() response) {
    const parametroActual = await this.parametroReferenciaRepository.selectOneParametroActual(codigoProceso);
    return response.send({ parametroActual: parametroActual.codigoActual });
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.parametroReferenciaRepository.update(id, nuevo);
  }

  /*@Delete(':id')
  async remove(@Param('id') id) {
    return await this.parametroReferenciaRepository.delete(id);
  }*/
}
