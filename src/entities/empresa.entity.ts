import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  }from 'typeorm';
import { InstitucionLaboralEntity } from './institucion-laboral.entity';
@Entity('empresa')
export class EmpresaEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({
    name: 'fecha_hora_registro',
    type: 'timestamp without time zone',
  })
  fechaHoraRegistro?: Date;

  @UpdateDateColumn({
    name: 'fecha_hora_actualizacion',
    type: 'timestamp without time zone',
  })
  fechaHoraActualizacion?: Date;

  @Column({ length: 200 })
  direccion: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  ruc: string;

  @Column({ length: 100 })
  responsable: string;

  @Column({ length: 100 })
  email: string;

  @Column({ nullable: true })
  telefono: number;
  @OneToMany(() => InstitucionLaboralEntity, institucion => institucion.empresa)
  institucion?: Promise<EmpresaEntity[]>;



}
