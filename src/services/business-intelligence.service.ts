import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {
    FilterTypeEnum,
    LogicalOperatorEnum,
    OptionQueryEnum,
    OrderModeEnum,
    TypeDatabaseEnum,
} from '../app.enum';
import {DatabaseRepository} from '../repositories/database.repository';
import {DatabaseEntity} from '../entities/database.entity';
import {ConnectionDatabaseService} from './connection-database.service';
import {ConnectionDatabaseDto} from '../dtos/connection-database.dto';

@Injectable()
export class BusinessIntelligenceService {
    private connection = null;

    constructor(
        private readonly databaseRepository: DatabaseRepository,
        private readonly databaseConnection: ConnectionDatabaseService) {
        this.selectAllTables(2);
    }

    async selectAllTables(idDatabase) {
        const BDfind: DatabaseEntity = await this.databaseRepository.selectById(idDatabase).then((result) => {
            return result;
        });

        const parametersConnection: ConnectionDatabaseDto = {
            host: BDfind?.host ? BDfind?.host : '',
            port: BDfind?.port ? BDfind?.port : 0,
            user: BDfind?.username ? BDfind?.username : '',
            password: BDfind?.password ? BDfind?.password : '',
            database: BDfind?.database ? BDfind?.database : '',
        };

        switch (BDfind?.idTipoDatabase) {
            case TypeDatabaseEnum.POSTGRES:
                this.connection = await this.databaseConnection.createConnectionPG(parametersConnection);
                this.connection.connect();
                break;
            case TypeDatabaseEnum.MYSQL:
                break;
            case TypeDatabaseEnum.SQLSERVER:
                break;
            default:
                throw new BadRequestException('La base de datos solicitada no se encuentra registrada.');
        }

        const tables = await this.connection.query(`select table_name as "name" from information_schema.tables where table_schema = 'public' and table_type = 'BASE TABLE' order by table_name asc;`)
            .then(result => result.rows);
        if (tables) {
            return tables;
        }
        throw new InternalServerErrorException(`Error al consultar las tablas, intente nuevamente.`);
    }

    async selectAllColumns(table: string) {
        const columns = await this.connection.query(`select column_name from information_schema.columns where table_schema = 'public' and table_name = '${table}' order by column_name asc;`)
            .then(r => r.rows);
        if (columns) {
            return columns.map(it => it.column_name);
        }
        throw new InternalServerErrorException(`Error al consultar las columnas, intente nuevamente.`);
    }

    generarQuery(generateQueryDto: any) {
        const {table, columnX, columnY, option, filters, order, joins} = generateQueryDto;
        let sql = '';

        if (option && option.length > 0) {
            let res = this.generateQueryFuntionAggregate(option, table, columnX);
            sql += res[0];
            sql += ' ' + this.generateQueryFilter(filters, joins);
            sql += ` group by "${columnX}"`;
            if (res[1]) sql += ' ' + res[1];
        } else {
            sql = `select "${columnX}", "${columnY}" from ${table}`;
            sql += ' ' + this.generateQueryFilter(filters, joins);
        }
        if (order) {
            sql += ` order by "${order.column}" ${order.mode === OrderModeEnum.ASC ? 'asc' : 'desc'}`;
        }
        return sql;
    }

    private generateQueryFuntionAggregate(options: any [], tables, columnX) {
        let sqlOption = '';
        let sqlOption_Filters = '';
        if (options) {
            sqlOption = `select `;
            for (const [index, option] of options.entries()) {
                const {column, type, alias, filters} = option;
                switch (type) {
                    case OptionQueryEnum.COUNT:
                        sqlOption += `"${columnX}", count("${column}") as ${alias} from ${tables}`;
                        sqlOption_Filters = this.generateQueryHaving(filters, 'count');
                        break;
                    case OptionQueryEnum.SUM_BY_MONTH:
                        sqlOption += `to_char(${column},'MM') as month, extract(year from ${column}) as year, sum(${column}) from ${tables}`;
                        break;
                    case OptionQueryEnum.SUM_BY_DAY:
                        break;
                    case OptionQueryEnum.AVG:
                        sqlOption += `"${columnX}", avg("${column}") as ${alias} from ${tables}`;
                        sqlOption_Filters = this.generateQueryHaving(filters, 'avg');
                        break;
                    case OptionQueryEnum.SUM:
                        sqlOption += `"${columnX}", sum("${column}") as ${alias} from ${tables}`;
                        sqlOption_Filters = this.generateQueryHaving(filters, 'sum');
                        break;
                    case OptionQueryEnum.MIN:
                        sqlOption += `"${columnX}", min("${column}") as ${alias} from ${tables}`;
                        sqlOption_Filters = this.generateQueryHaving(filters, 'min');
                        break;
                    case OptionQueryEnum.MAX:
                        sqlOption += `"${columnX}", max("${column}") as ${alias} from ${tables}`;
                        sqlOption_Filters = this.generateQueryHaving(filters, 'max');
                        break;
                    default:
                        break;
                }
            }
        }

        return [sqlOption, sqlOption_Filters]
    }

    private generateQueryFilter(filters: any[], joins) {
        let sqlFilters = '';
        if ((filters && filters.length > 0) || (joins && joins.length > 0)) {
            sqlFilters = 'where'
        }
        if (filters && filters.length > 0) {
            for (const [index, filter] of filters.entries()) {
                const {logicalOperator, column, value_a, value_b, type} = filter;
                if (index !== 0) {
                    sqlFilters += ` ${logicalOperator === LogicalOperatorEnum.AND ? 'and' : 'or'}`;
                }
                switch (type) {
                    case FilterTypeEnum.CONTAIN:
                        sqlFilters += ` "${column}" like '%${value_a}%'`;
                        break;
                    case FilterTypeEnum.EQUAL:
                        sqlFilters += ` "${column}" = '${value_a}'`;
                        break;
                    case FilterTypeEnum.NOT_EQUAL:
                        sqlFilters += ` "${column}" != '${value_a}'`;
                        break;
                    case FilterTypeEnum.LESS_THAN:
                        sqlFilters += ` "${column}" < '${value_a}'`;
                        break;
                    case FilterTypeEnum.LESS_THAN_OR_EQUAL:
                        sqlFilters += ` "${column}" <= '${value_a}'`;
                        break;
                    case FilterTypeEnum.MORE_THAN:
                        sqlFilters += ` "${column}" > '${value_a}'`;
                        break;
                    case FilterTypeEnum.MORE_THAN_OR_EQUAL:
                        sqlFilters += ` "${column}" >= '${value_a}'`;
                        break;
                    case FilterTypeEnum.BETWEEN:
                        sqlFilters += ` "${column}" between '${value_a}' and '${value_b}'`;
                        break;
                    case FilterTypeEnum.NOT_BETWEEN:
                        sqlFilters += ` "${column}" not between '${value_a}' and '${value_b}'`;
                        break;
                    default:
                        throw new BadRequestException(`Filtro ${type} inválido.`);
                }
            }
        }


        let sqlFiltersJoin = this.generateQueryJoin(joins);

        if (sqlFiltersJoin != null) {
            if (filters && filters.length > 0) {
                sqlFilters += ` and `;
            }
            sqlFilters += sqlFiltersJoin;
        }

        return sqlFilters;
    }

    private generateQueryJoin(joins: any[]) {
        let sqlJoin = null;
        if (joins && joins.length > 0) {
            sqlJoin = " ";
            for (const [index, join] of joins.entries()) {
                const {table_fk, fk, table, pk} = join;
                sqlJoin += `${table_fk}."${fk}" = ${table}."${pk}"`;
            }
        }
        return sqlJoin;
    }

    private generateQueryHaving(filters: any[], type_having) {
        let sqlHaving = '';
        if (filters && filters.length > 0) {
            sqlHaving = 'having';
            for (const [index, filter] of filters.entries()) {
                const {logicalOperator, column, value_a, value_b, type} = filter;
                if (index !== 0) {
                    sqlHaving += ` ${logicalOperator === LogicalOperatorEnum.AND ? 'and' : 'or'}`;
                }
                switch (type) {
                    case FilterTypeEnum.CONTAIN:
                        sqlHaving += ` ${type_having}("${column}") like '%${value_a}%'`;
                        break;
                    case FilterTypeEnum.EQUAL:
                        sqlHaving += `  ${type_having}("${column}") = '${value_a}'`;
                        break;
                    case FilterTypeEnum.NOT_EQUAL:
                        sqlHaving += `  ${type_having}("${column}") != '${value_a}'`;
                        break;
                    case FilterTypeEnum.LESS_THAN:
                        sqlHaving += `  ${type_having}("${column}") < '${value_a}'`;
                        break;
                    case FilterTypeEnum.LESS_THAN_OR_EQUAL:
                        sqlHaving += `  ${type_having}("${column}") <= '${value_a}'`;
                        break;
                    case FilterTypeEnum.MORE_THAN:
                        sqlHaving += `  ${type_having}("${column}") > '${value_a}'`;
                        break;
                    case FilterTypeEnum.MORE_THAN_OR_EQUAL:
                        sqlHaving += `  ${type_having}("${column}") >= '${value_a}'`;
                        break;
                    case FilterTypeEnum.BETWEEN:
                        sqlHaving += `  ${type_having}("${column}") between '${value_a}' and '${value_b}'`;
                        break;
                    case FilterTypeEnum.NOT_BETWEEN:
                        sqlHaving += `  ${type_having}("${column}") not between '${value_a}' and '${value_b}'`;
                        break;
                    default:
                        throw new BadRequestException(`Filtro ${type} inválido.`);
                }
            }
        }

        return sqlHaving;
    }

    async testQuery(sql: string) {
        const test = await this.connection.query(sql).then(r => r.rows);
        return test;
    }

    async selectColumnName(table: string) {
        const columnNames = await this.connection.query(`select c.column_name as name from information_schema.columns as c
    where c.table_name = '${table}' and c.table_schema = 'public' and c.column_name not in (select kcu.column_name 
    FROM information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema 
    JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name AND ccu.table_schema = tc.table_schema 
    WHERE tc.table_name='${table}' and tc.constraint_type in('FOREIGN KEY','PRIMARY KEY')) and c.table_schema = 'public'
    order by c.column_name asc;`)
            .then(r => r.rows);
        if (columnNames.length > 0) {
            return columnNames;
        } else {
            throw new InternalServerErrorException(`La entidad ${table} es producto de una relación de muchos a muchos`);
        }
    }

    generarVistaPrevia(generateQueryDto: any) {
        const query = this.generarQuery(generateQueryDto);
        console.log('hola', generateQueryDto, query);
        return this.testQuery(query + 'LIMIT 50');
    }

    async verificarJoin(tables) {
        const tablesJoin = await this.connection.query(`SELECT tc.table_name as table_fk, kcu.column_name as fk, ccu.table_name AS table, ccu.column_name AS pk, tc.constraint_type as tipo
    FROM information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name AND ccu.table_schema = tc.table_schema
    WHERE tc.table_name in (${tables.tables}) and tc.constraint_type in ('FOREIGN KEY') and tc.table_schema = 'public';`)
            .then(r => r.rows);

        return tablesJoin;
    }

    async verificarConexion() {
        if (this.connection) {
            return await this.databaseConnection.endConnectionPG(this.connection).then((res) => {
                return true;
            }).catch((error) => {
                console.log(error, 'error');
                return false;
            });
        }
    }
}
