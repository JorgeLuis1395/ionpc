import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { RolEntity } from './rol.entity';
import { NotificacionRetiroEntity } from './notificacion-retiro.entity';
import { TipoSangreEntity } from './tipo-sangre.entity';
import { GeneroEntity } from './genero.entity';
import { InstitucionLaboralEntity } from './institucion-laboral.entity';
import { DatosFamiliaresEntity } from './datos-familiares.entity';
import { InstruccionEntity } from './instruccion.entity';
import { CapacitacionEntity } from './capacitacion.entity';

@Unique(['nickname'])
@Entity('usuario')
export class UsuarioEntity {
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

  @Column({ length: 25 })
  cedula: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ length: 50 })
  nickname: string;

  @Column({ length: 512 })
  password: string;

  @Column({ length: 25, nullable: true })
  numeroContacto: string;

  @Column({ length: 50, nullable: true })
  email: string;

  @Column({ nullable: true })
  fechaNacimiento?: Date;

  @Column({ length: 200, nullable: true })
  direccion: string;

  @Column({ length: 200, nullable: true })
  estadoCivil: string;

  @Column({ length: 200, nullable: true })
  etnia: string;

  @Column()
  estado: boolean;

  @Column({ name: 'estado_logueado', nullable: true })
  estadoLogueado: boolean;

  @UpdateDateColumn({
    name: 'fecha_hora_ultima_conexion',
    type: 'timestamp without time zone',
  })
  fecha_hora_ultima_conexion?: Date;

  @Column({  nullable: true })
  latitud: string;

  @Column({  nullable: true })
  provincia: string;

  @Column({  nullable: true })
  canton: string;

  @Column({  nullable: true })
  parroquia: string;

  @Column({  nullable: true })
  recinto: string;

  @Column({  nullable: true })
  sufragio: string;

  @Column({  nullable: true })
  jrv: string;

  @Column({  nullable: true })
  form1: boolean;

  @Column({  nullable: true })
  form2: boolean;

  @Column({  nullable: true })
  form3: boolean;

  @Column({  nullable: true })
  jrv1: string;

  @Column({  nullable: true })
  longitud: string;

  @Column({ nullable: true })
  empresa: string;

  @Column({ nullable: true })
  discapacidad: string;

  @Column({ nullable: true })
  carnet: boolean;

  @Column({ nullable: true })
  porcentaje: number;

  @Column({ name: 'nombre_foto', nullable: true })
  nombreFoto: string;

  @Column({ name: 'id_rol' })
  idRol: number;

  @Column({ name: 'id_tipoSangre', nullable: true })
  id_tipoSangre: number;

  @Column({ name: 'id_genero', nullable: true })
  id_genero: number;

  @Column({ name: 'id_institucion', nullable: true })
  id_institucion: number;

  @ManyToOne(() => RolEntity, rol => rol.usuarios, { eager: true })
  @JoinColumn({ name: 'id_rol' })
  rol?: RolEntity;


  @ManyToOne(() => TipoSangreEntity, tipo => tipo.usuarios, { eager: true })
  @JoinColumn({ name: 'id_tipoSangre' })
  tipo?: TipoSangreEntity;

  @ManyToOne(() => GeneroEntity, genero => genero.usuarios, { eager: true })
  @JoinColumn({ name: 'id_genero' })
  genero?: GeneroEntity;

  @ManyToOne(() => InstitucionLaboralEntity, institucion => institucion.usuarios, { eager: true })
  @JoinColumn({ name: 'id_institucion' })
  institucion?: InstitucionLaboralEntity;


  @OneToMany(() => NotificacionRetiroEntity, notificacionesRetiro => notificacionesRetiro.usuario)
  notificacionesRetiro?: NotificacionRetiroEntity[];

  @OneToMany(() => DatosFamiliaresEntity, datos => datos.usuarios)
  datos?: DatosFamiliaresEntity[];

  @OneToMany(() => InstruccionEntity, instruccion => instruccion.usuarios)
  instruccion?: InstruccionEntity[];

  @OneToMany(() => CapacitacionEntity, capacitacion => capacitacion.usuario)
  capacitacion?: CapacitacionEntity[];
}
