import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards} from "@nestjs/common";
import {ClienteRepository} from "../repositories/cliente.repository";
import {RolGuard} from "../common/guards/rol.guard";

//@UseGuards(RolGuard)
@Controller('cliente')
export class ClienteController {
  constructor(private clienteRepository: ClienteRepository) {
  }

  @Post()
  create(@Body() clienteDto) {
    return this.clienteRepository.insert(clienteDto);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.clienteRepository.selectAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.clienteRepository.selectById(id));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.clienteRepository.update(id, nuevo);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.clienteRepository.delete(id);
  }
}
