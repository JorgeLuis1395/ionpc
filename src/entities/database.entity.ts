import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessIntelligenceEntity } from './business-intelligence.entity';
import { TipoDatabaseEntity } from './tipo-database.entity';

@Entity('database')
export class DatabaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({})
  descripcion: string;

  @Column({})
  host: string;

  @Column({})
  port: number;

  @Column({})
  username: string;

  @Column({})
  password: string;

  @Column({})
  database: string;

  @Column({ name: 'id_tipo_database' })
  idTipoDatabase: number;

  @ManyToOne(type => TipoDatabaseEntity, tipoDatabase => tipoDatabase.databases)
  @JoinColumn({ name: 'id_tipo_database' })
  tipoDatabase?: TipoDatabaseEntity;

  @OneToMany(type => BusinessIntelligenceEntity, businessIntelligence => businessIntelligence.database)
  businessIntelligences?: BusinessIntelligenceEntity[];
}
