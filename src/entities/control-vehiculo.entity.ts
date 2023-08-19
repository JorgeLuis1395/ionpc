import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {TarjaRecepcionVehiculoEntity} from "./tarja-recepcion-vehiculo.entity";
import {CatalogoControlVehiculoEntity} from "./catalogo-control-vehiculo.entity";

@Entity('control_vehiculo')
export class ControlVehiculoEntity {
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

  @Column({name: 'estado_control'})
  estadoControl: number;

  @Column({length: 250, nullable: true})
  observaciones: string;

  @Column({name: 'id_tarja_recepcion_vehiculo', nullable: true})
  idTarjaRecepcionVehiculo?: number;

  @Column({name: 'id_catalogo_control_vehiculo'})
  idCatalogoControlVehiculo: number;

  @ManyToOne(type => TarjaRecepcionVehiculoEntity, tarjaRecepcionVehiculo => tarjaRecepcionVehiculo.controlesVehiculo)
  @JoinColumn({name: 'id_tarja_recepcion_vehiculo'})
  tarjaRecepcionVehiculo?: TarjaRecepcionVehiculoEntity;

  @ManyToOne(type => CatalogoControlVehiculoEntity, catalogoControlVehiculo => catalogoControlVehiculo.controlesVehiculo)
  @JoinColumn({name: 'id_catalogo_control_vehiculo'})
  catalogoControlVehiculo?: CatalogoControlVehiculoEntity;
}
