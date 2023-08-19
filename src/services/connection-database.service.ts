import { Injectable } from '@nestjs/common';
import { ConnectionDatabaseDto } from '../dtos/connection-database.dto';

const { Client } = require('pg');
const { Cliente_MYSQL } = require('mysql');

@Injectable()
export class ConnectionDatabaseService {

  async createConnectionPG(parametros: ConnectionDatabaseDto) {
    return await new Client(parametros);
  }

  async endConnectionPG(clientePg) {
    return await clientePg.end();
  }

  async createConnectionMySQL(parametros: ConnectionDatabaseDto) {
    console.log(parametros);
  }

  async endConnectionMySQL() {

  }

}