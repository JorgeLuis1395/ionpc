export enum OptionQueryEnum {
  COUNT = 0,
  SUM_BY_MONTH = 1,
  SUM_BY_DAY = 2,
  AVG = 3,
  SUM = 4,
  MIN = 5,
  MAX = 6
}

export enum FilterTypeEnum {
  CONTAIN = 0,
  EQUAL = 1,
  NOT_EQUAL = 2,
  LESS_THAN = 3,
  LESS_THAN_OR_EQUAL = 4,
  MORE_THAN = 5,
  MORE_THAN_OR_EQUAL = 6,
  BETWEEN = 7,
  NOT_BETWEEN = 8
}

export enum LogicalOperatorEnum {
  AND = 'Y',
  OR = 'O',
}

export enum OrderModeEnum {
  ASC,
  DESC,
}

export enum DatabaseEnum {
  LATINIUM = 1,
  DATAPASS = 2,
  PARQUEADEROS = 3,
}

export enum TypeDatabaseEnum {
  POSTGRES = 1,
  MYSQL = 2,
  SQLSERVER = 3
}