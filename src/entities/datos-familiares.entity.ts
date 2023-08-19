import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  }from 'typeorm';
  import { CargasFamiliaresEntity } from './cargas-familiares.entity';
import { UsuarioEntity } from './usuario.entity';
@Entity('datos-familiares')
export class DatosFamiliaresEntity {

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
  @Column({ nullable: true })
  cargas: number;
  @Column({ length: 100, nullable:true })
  nombres: string;
  @Column({ length: 100, nullable:true })
  apellidos: string;
  @Column({ length: 100 })
  relacion: string;
  @Column ({nullable: true})
  fechaNacimiento?: Date;
  @Column({ name: 'id_usuarios', nullable:true })
  id_usuarios: number;

  @OneToMany(() => CargasFamiliaresEntity, cargas => cargas.datos)
  datos?: Promise<DatosFamiliaresEntity[]>;

  @ManyToOne(() => UsuarioEntity, usuarios => usuarios.datos, { eager: true })
  @JoinColumn({ name: 'id_usuarios' })
  usuarios?: UsuarioEntity;


}
