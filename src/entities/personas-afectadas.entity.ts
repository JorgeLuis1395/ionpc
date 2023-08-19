import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AfectacionesEntity } from './afectaciones.entity';
import { EmergenciaEntity } from './emergencia.entity';

@Entity('persona_afectada')
export class PersonasAfectadasEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  edad: number;

  @Column()
  genero: number;

  @Column()
  estado: number;

  @Column({ name: 'nombre_medico' })
  nombreMedico: string;

  @Column({ name: 'casa_salud' })
  casaSalud: string;

  @Column()
  diagnostico: string;

  @Column()
  familia: string;

  @Column()
  albergue: string;

  @Column()
  nacionalidad: string;


  @ManyToOne(() => EmergenciaEntity, emergencia => emergencia.personasafectadas)
  @JoinColumn({ name: 'id_emergencia' })
  emergencia: EmergenciaEntity;
}
