import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import {TipoPermisoEntity} from './tipo-permiso.entity';
import {RutaEntity} from "./ruta.entity";

@Entity('permiso')
export class PermisoEntity {
  @PrimaryColumn({length: 25})
  id?: string;

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

  @Column({length: 250})
  descripcion: string;

  @Column({name: 'id_permiso', nullable: true})
  idPermiso: number;

  @OneToMany(type => PermisoEntity, permiso => permiso.permiso)
  permisos?: PermisoEntity[];

  @ManyToOne(type => PermisoEntity, permiso => permiso.permisos)
  @JoinColumn({name: 'id_permiso'})
  permiso?: PermisoEntity;

  @Column({name: 'id_tipo_permiso'})
  idTipoPermiso: number;

  @ManyToOne(type => TipoPermisoEntity, tipoPermiso => tipoPermiso.permisos)
  @JoinColumn({name: 'id_tipo_permiso'})
  tipoPermiso?: TipoPermisoEntity;

  @ManyToMany(() => RutaEntity, ruta => ruta.permisos, {lazy: true, cascade: true})
  @JoinTable({
    name: 'permiso_ruta',
    joinColumn: {
      name: 'id_permiso',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_ruta',
      referencedColumnName: 'id',
    },
  })
  rutas: Promise<RutaEntity[]>;

}
