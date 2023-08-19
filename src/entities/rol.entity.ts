import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {UsuarioEntity} from './usuario.entity';
import {PermisoEntity} from './permiso.entity';

@Entity('rol')
export class RolEntity {
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

  @Column({name: 'nombre', length: 50})
  nombre: string;

  @Column({name: 'descripcion', length: 100, nullable: true})
  descripcion: string;

  @ManyToMany(() => PermisoEntity, {eager: true, cascade: true})
  @JoinTable({
    name: 'rol_permiso',
    joinColumn: {
      name: 'rol_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permiso_id',
      referencedColumnName: 'id',
    },
  })
  permisos?: PermisoEntity[];

  @OneToMany(() => UsuarioEntity, usuario => usuario.rol)
  usuarios?: Promise<UsuarioEntity[]>;
}
