import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BusinessIntelligenceService } from '../../services/business-intelligence.service';
import { DatabaseRepository } from '../../repositories/database.repository';

@Controller('business-intelligence')
export class BusinessIntelligenceController {
  constructor(private readonly businessIntelligenceService: BusinessIntelligenceService,
              private readonly databaseRepository: DatabaseRepository) {
  }

  @Get('cerrarConexion')
  getCerrarConexión() {
    return this.businessIntelligenceService.verificarConexion();
  }

  @Get('tables/:idDatabase')
  getSelectAllTables(@Param('idDatabase') idDatabase) {
    return this.businessIntelligenceService.selectAllTables(+idDatabase);
  }

  @Get('tables/:tableName/columns')
  getSelectAllColumns(@Param('tableName') tableName) {
    return this.businessIntelligenceService.selectAllColumns(tableName);
  }

  @Get('test-query')
  getTestQuery(@Query('sql') sql) {
    return this.businessIntelligenceService.testQuery(sql);
  }

  @Post('generar')
  postGenerar(@Body() generateQueryDto) {
    return this.businessIntelligenceService.generarQuery(generateQueryDto);
  }

  @Get('databases/join-tipo')
  getSelectJoinTipoDatabase() {
    return this.databaseRepository.selectJoinTipoDatabase();
  }

  @Get('databases/columns/:table')
  getSelectColumns(@Param('table') table) {
    return this.businessIntelligenceService.selectColumnName(table);
  }

  @Post('generar-vista-previa')
  postGenerarVistaPrevia(@Body() generateQueryDto) {
    return this.businessIntelligenceService.generarVistaPrevia(generateQueryDto);
  }

  @Post('verificar-join-tables')
  postVerificarJoinTables(@Body() tables) {
    return this.businessIntelligenceService.verificarJoin(tables);
  }
}
