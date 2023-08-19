import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
}from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
@Entity('instruccion')
export class InstruccionEntity {

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
titulo: string;
@Column({ nullable: true })
nivel: number;
@Column({ length: 50 })
codigoSenescyt: string;
@Column({ length: 100 })
institucion: string;
@Column ({nullable: true})
fecha?: Date;

@Column({ name: 'id_usuarios' })
idUsuario: number;

@ManyToOne(() => UsuarioEntity, usuarios => usuarios.instruccion, { eager: true })
@JoinColumn({ name: 'id_usuarios' })
usuarios?: UsuarioEntity;



}
