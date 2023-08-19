import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FilterEntity } from './filter.entity';
import { DatabaseEntity } from './database.entity';

@Entity('business-intelligence')
export class BusinessIntelligenceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'report_name' })
  reportName: string;

  @Column({})
  table: string;

  @Column({ name: 'column_x' })
  columnX: string;

  @Column({ name: 'column_y' })
  columnY: string;

  @Column({})
  option: number;

  @OneToMany(type => FilterEntity, filter => filter.businessIntelligenceEntity)
  filters: FilterEntity[];

  @Column({ name: 'order_column' })
  orderColumn: string;

  @Column({ name: 'order_mode' })
  orderMode: string;

  @ManyToOne(type => DatabaseEntity, database => database.businessIntelligences)
  @JoinColumn({ name: 'id_database' })
  database: DatabaseEntity;
}
