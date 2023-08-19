import {Column, CreateDateColumn, Entity, ManyToMany, PrimaryColumn, UpdateDateColumn} from 'typeorm';
import {PermisoEntity} from "./permiso.entity";

@Entity('ruta')
export class RutaEntity {
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

  @Column({length: 100})
  path: string;

  @Column({length: 25})
  metodo: string;

  @ManyToMany(type => PermisoEntity, permiso => permiso.rutas, {lazy: true})
  permisos: Promise<PermisoEntity[]>;
}
