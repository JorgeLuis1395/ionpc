import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DatabaseEntity } from './database.entity';

@Entity('tipo_database')
export class TipoDatabaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  nombre: string;

  @OneToMany(type => DatabaseEntity, database => database.tipoDatabase)
  databases: DatabaseEntity[];
}
