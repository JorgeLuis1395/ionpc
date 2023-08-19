export class CreateBusinessIntelligenceDto {
  reportName: string;
  table: string;
  columnX: string;
  columnY: string;
  option: number;
  filters: CreateFilterDto[];
  orderColumn: string;
  orderMode: string;
  idDatabase: number;
}

export class CreateFilterDto {
  type: number;
  column: string;
  value: number;
  logicalOperator: string;
}
