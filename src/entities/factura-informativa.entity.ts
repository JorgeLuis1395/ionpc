import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {NotificacionRetiroEntity} from './notificacion-retiro.entity';
import {NotificacionEgresoVehiculoEntity} from "./notificacion-egreso-vehiculo.entity";

@Entity('factura_informativa')
export class FacturaInformativaEntity {
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

  @Column({name: 'numero_fi', nullable: true})
  numeroFI: string;

  @Column({name: 'peso_neto', nullable: false})
  pesoNeto: number;

  @Column({name: 'peso_bruto', nullable: false})
  pesoBruto: number;

  @Column({length: 200, nullable: true})
  marcas: string;

  @Column({name: 'dai_importacion', length: 200, nullable: true})
  daiImportacion: string;

  @Column({name: 'conocimiento_embarque', length: 200, nullable: true})
  conocimientoEmbarque: string;

  @Column({
    name: 'fecha_emision',
    type: 'date',
    nullable: false,
  })
  fechaEmision: Date;

  @Column({type: 'double precision', nullable: false})
  flete: number;

  @Column({name: 'total_cif', type: 'double precision', nullable: true})
  totalCIF: number;

  @Column({name: 'total_fob', type: 'double precision', nullable: true})
  totalFOB: number;

  @Column({type: 'double precision', nullable: false})
  seguro: number;

  @Column({name: 'valor_c_and_f', type: 'double precision', nullable: true})
  valorCAndF?: number;

  @Column({name: 'total_unidades', type: 'double precision', nullable: true})
  totalUnidades?: number;

  @Column({name: 'saldo_unidades_egreso', type: 'double precision', nullable: true})
  saldoUnidadesEgreso: number;

  @Column({name: 'id_notificacion_retiro', nullable: true})
  idNotificacionRetiro: number;

  @Column({ name: 'id_notificacion_retiro_anulado', nullable: true })
  idNotificacionRetiroAnulado?: number;

  @Column({length: 250, nullable: true})
  importador: string;

  @Column({length: 250, nullable: true})
  direccion: string;

  @Column({length: 150, nullable: true})
  llegadoPorVapor: string;

  @Column({length: 150, nullable: true})
  de: string;

  @Column({name: 'saldo_unidades', type: 'double precision', nullable: true})
  saldoUnidades: number;

  @Column({name: 'saldo_bultos', type: 'double precision', nullable: true})
  saldoBultos: number;

  @Column({name: 'codigo_tipo_entrega', nullable: true})
  codigoTipoEntrega: number;

  @Column({nullable: true})
  estado: number;

  @OneToOne(type => NotificacionRetiroEntity)
  @JoinColumn({name: 'id_notificacion_retiro'})
  notificacionRetiro?: NotificacionRetiroEntity;

  @OneToMany(type => NotificacionEgresoVehiculoEntity, notificacionEgresoVehiculo => notificacionEgresoVehiculo.facturaInformativa)
  notificacionesEgresosVehiculos?: NotificacionEgresoVehiculoEntity[];

}
