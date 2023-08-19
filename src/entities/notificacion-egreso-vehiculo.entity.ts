import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {FacturaInformativaEntity} from "./factura-informativa.entity";
import {TarjaRecepcionVehiculoEntity} from "./tarja-recepcion-vehiculo.entity";

@Entity('notificacion_egreso_vehiculo')
export class NotificacionEgresoVehiculoEntity {
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
    name: 'fecha_hora_nev',
    type: 'timestamp without time zone',
  })
  fechaHoraNEV: Date;

  @Column({name: 'numero_nev', length: 50})
  numeroNEV: string;

  @Column({name: 'numero_deposito', length: 50})
  numeroDeposito: string;

  @Column({
    name: 'fecha_emision',
    type: 'date',
  })
  fechaEmision: Date;

  @Column({type: 'double precision', name: 'saldo_total_egreso'})
  saldoTotalEgreso: number;

  @Column({type: 'double precision', name: 'total_general_entrega_cantidad'})
  totalGeneralEntregaCantidad: number;

  @Column({type: 'double precision', name: 'total_general_entrega_cif'})
  totalGeneralEntregaCIF: number;

  @Column()
  area: number;

  @Column({type: 'double precision', name: 'saldo_area'})
  saldoArea: number;

  @Column({name: 'observaciones', length: 250, nullable: true})
  observaciones: string;

  @Column({name: 'id_factura_informativa', nullable: true})
  idFacturaInformativa: number;

  @Column({name: 'id_factura_informativa_anulado', nullable: true})
  idFacturaInformativaAnulado?: number;

  @Column({nullable: true})
  estado?: number;

  @ManyToOne(type => FacturaInformativaEntity, facturaInformativa => facturaInformativa.notificacionesEgresosVehiculos)
  @JoinColumn({name: 'id_factura_informativa'})
  facturaInformativa?: FacturaInformativaEntity;

  @OneToMany(type => TarjaRecepcionVehiculoEntity, tarjaRecepcionVehiculo => tarjaRecepcionVehiculo.notificacionEgresoVehiculo)
  tarjasRecepcionVehiculos?: TarjaRecepcionVehiculoEntity[];
}
