import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessIntelligenceEntity } from './business-intelligence.entity';

@Entity('filter')
export class FilterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  type: number;

  @Column()
  column: string;

  @Column()
  value: number;

  @Column({ name: 'logicalOperator' })
  logicalOperator: string;

  @ManyToOne(type => BusinessIntelligenceEntity, businessIntelligence => businessIntelligence.filters)
  businessIntelligenceEntity: BusinessIntelligenceEntity;
}
