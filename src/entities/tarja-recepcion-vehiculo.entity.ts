import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {ControlVehiculoEntity} from "./control-vehiculo.entity";
import {FotoEntity} from "./foto.entity";
import {ControlFisicoEntity} from "./control-fisico.entity";
import {RackEntity} from "./rack.entity";
import {DetalleItemProductoEntity} from "./detalle-item-producto.entity";
import {NotificacionRetiroEntity} from './notificacion-retiro.entity';
import {NotificacionEgresoVehiculoEntity} from "./notificacion-egreso-vehiculo.entity";

@Entity('tarja_recepcion_vehiculo')
export class TarjaRecepcionVehiculoEntity {
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

  @Column({
    name: 'fecha_tarja',
    type: 'date',
  })
  fechaTarja: Date;

  @Column({
    name: 'fecha_hora_historial',
    type: 'timestamp without time zone',
    nullable: true
  })
  fechaHoraHistorial?: Date;

  @Column({name: 'numero_tarja', length: 50})
  numeroTarja: string;

  @Column({type: 'double precision', nullable: false})
  kilometraje: number;

  @Column({type: 'double precision', nullable: false})
  combustible: number;

  @Column({length: 250})
  observaciones: string;

  @Column({
    name: 'fecha_recepcion',
    type: 'date',
  })
  fechaRecepcion: Date;

  @Column({
    name: 'fecha_entrega',
    type: 'date',
  })
  fechaEntrega: Date;

  @Column({name: 'id_detalle_item_producto', nullable: true})
  idDetalleItemProducto: number;

  @Column({name: 'id_rack', nullable: true})
  idRack: number;

  @OneToOne(type => DetalleItemProductoEntity)
  @JoinColumn({name: 'id_detalle_item_producto'})
  detalleItemProducto: DetalleItemProductoEntity;

  @OneToMany(type => ControlVehiculoEntity, controlVehiculo => controlVehiculo.tarjaRecepcionVehiculo)
  controlesVehiculo: ControlVehiculoEntity[];

  @OneToMany(type => ControlFisicoEntity, controlFisico => controlFisico.tarjaRecepcionVehiculo)
  controlesFisicos: ControlFisicoEntity[];

  @OneToMany(type => FotoEntity, foto => foto.tarjaRecepcionVehiculo)
  fotos: FotoEntity[];

  @ManyToOne(type => RackEntity, rack => rack.tarjasRecepcionVehiculo)
  @JoinColumn({name: 'id_rack'})
  rack: RackEntity;

  @Column({name: 'id_notificacion_retiro', nullable: true})
  idNotificacionRetiro?: number;

  @Column({name: 'id_notificacion_retiro_anulado', nullable: true})
  idNotificacionRetiroAnulado?: number;

  @Column({name: 'id_notificacion_egreso_anulado', nullable: true})
  idNotificacionEgresoAnulado?: number;

  @ManyToOne(() => NotificacionRetiroEntity, notificacionRetiro => notificacionRetiro.tarjasRecepcion)
  @JoinColumn({name: 'id_notificacion_retiro'})
  notificacionRetiro?: NotificacionRetiroEntity;

  @Column({name: 'id_notificacion_egreso', nullable: true})
  idNotificacionEgreso?: number;

  @Column({name: 'id_tarja_recepcion_vehiculo', nullable: true})
  idTarjaRecepcionVehiculo?: number;

  @ManyToOne(type => NotificacionEgresoVehiculoEntity, notificacionEgresoVehiculo => notificacionEgresoVehiculo.tarjasRecepcionVehiculos)
  @JoinColumn({name: 'id_notificacion_egreso'})
  notificacionEgresoVehiculo?: NotificacionEgresoVehiculoEntity;

  @OneToMany(type => TarjaRecepcionVehiculoEntity, tarjaRecepcionVehiculo => tarjaRecepcionVehiculo.tarjaRecepcionVehiculo)
  tarjasRecepcionVehiculos?: TarjaRecepcionVehiculoEntity[];

  @ManyToOne(type => TarjaRecepcionVehiculoEntity, tarjaRecepcionVehiculo => tarjaRecepcionVehiculo.tarjasRecepcionVehiculos)
  @JoinColumn({name: 'id_tarja_recepcion_vehiculo'})
  tarjaRecepcionVehiculo?: TarjaRecepcionVehiculoEntity;
}
