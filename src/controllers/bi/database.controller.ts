import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { DatabaseRepository } from '../../repositories/database.repository';
import { CrearDatabaseDto } from '../../dtos/crear-database.dto';

@Controller('databases')
export class DatabaseController {
  constructor(private readonly databaseRepository: DatabaseRepository) {
  }

  @Post()
  insertNewDatabase(@Body() crearDatabase: CrearDatabaseDto) {
    return this.databaseRepository.insert(crearDatabase);
  }

  @Get()
  async getAllDatabases(@Res() response) {
    return response.send(await this.databaseRepository.selectAll());
  }

  @Get(':id')
  async getSelectDatabaseById(@Param('id') id, @Res() response) {
    return response.send(await this.databaseRepository.selectById(id));
  }

  @Get('join-tipo')
  getSelectJoinTipoDatabase(@Res() response) {
    return response.send(this.databaseRepository.selectJoinTipoDatabase());
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo, @Res() response) {
    return response.send(this.databaseRepository.update(id, nuevo));
  }

  @Delete(':id')
  async remove(@Param('id') id, @Res() response) {
    return response.send(this.databaseRepository.delete(id));
  }
}
