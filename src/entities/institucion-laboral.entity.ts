import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  }from 'typeorm';
import { EmpresaEntity } from './empresa.entity';
import { UsuarioEntity } from './usuario.entity';
@Entity('institucion-laboral')
export class InstitucionLaboralEntity {

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

  @Column({ length: 100 })
  cargo: string;

  @Column({ length: 100 })
  area: string;

  @Column({ length: 150 })
  proceso: string;

  @Column({ length: 150 })
  subproceso: string;

  @Column({ length: 100 })
  tipoServidor: string;

  @Column ({nullable: true})
  fechaIngreso?: Date;

  @Column ({nullable: true})
  fechaSalida?: Date;

  @Column({ length: 600 })
  causaSalida: string;

  @Column({ nullable: true })
  salario: number;

  @Column({ nullable: true })
  partida: number;

  @Column({ length: 20 })
  jefe: string;

  @Column({ length: 50 })
  tipoContrato: string;

  @Column({ name: 'id_empresa' })
  id_empresa: number;
  
  @Column({ length: 150 })
  detalle: string;
  @ManyToOne(() => EmpresaEntity, empresa => empresa.institucion, { eager: true })
  @JoinColumn({ name: 'id_empresa' })
  empresa?: EmpresaEntity;

  @OneToMany(() => UsuarioEntity, usuario => usuario.institucion)
  usuarios?: Promise<UsuarioEntity[]>;
}
