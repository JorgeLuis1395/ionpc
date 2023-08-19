import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EmergenciaEntity } from './emergencia.entity';
import { RecursosEntidadesEntity } from './recursos-entidades.entity';

@Entity('recursos')
export class RecursosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double precision' })
  cantidad: number;

  @Column({ name: 'id_estacion' })
  estacion: number;

  @ManyToOne(() => EmergenciaEntity, emergencia => emergencia.recursos)
  @JoinColumn({ name: 'id_emergencia' })
  emergencia: EmergenciaEntity;

  @OneToMany(
    () => RecursosEntidadesEntity,
    recursosentidades => recursosentidades.recursos,
  )
  recursosentidades: RecursosEntidadesEntity;
}
