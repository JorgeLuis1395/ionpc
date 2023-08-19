import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { PermisoEntity } from './permiso.entity';

@Entity('tipo_permiso')
export class TipoPermisoEntity {
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
  nombre: string;

  @OneToMany(type => PermisoEntity, permiso => permiso.tipoPermiso)
  permisos: PermisoEntity[];
}
