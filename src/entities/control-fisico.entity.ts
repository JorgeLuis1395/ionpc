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
import {CatalogoControlFisicoEntity} from "./catalogo-control-fisico.entity";

@Entity('control_fisico')
export class ControlFisicoEntity {
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

  @Column({name: 'etiqueta', length: 50, nullable: true})
  etiqueta: string;

  @Column({name: 'id_tarja_recepcion_vehiculo', nullable: true})
  idTarjaRecepcionVehiculo?: number;

  @Column({name: 'id_catalogo_control_fisico'})
  idCatalogoControlFisico: number;

  @ManyToOne(type => TarjaRecepcionVehiculoEntity, tarjaRecepcionVehiculo => tarjaRecepcionVehiculo.controlesFisicos)
  @JoinColumn({name: 'id_tarja_recepcion_vehiculo'})
  tarjaRecepcionVehiculo?: TarjaRecepcionVehiculoEntity;

  @ManyToOne(type => CatalogoControlFisicoEntity, catalogoControlFisico => catalogoControlFisico.controlesFisicos)
  @JoinColumn({name: 'id_catalogo_control_fisico'})
  catalogoControlFisico?: CatalogoControlFisicoEntity;
}
