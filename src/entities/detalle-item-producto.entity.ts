import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {SolicitudPreviaDetalleEntity} from './solicitud-previa-detalle.entity';

@Entity('detalle_item_producto')
export class DetalleItemProductoEntity {
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

  @Column({length: 100, nullable: false})
  chasis: string;

  @Column({length: 250, nullable: false})
  motor: string;

  @Column({name: 'partida_arancelaria', length: 250, nullable: false})
  color: string;

  @Column({length: 50, nullable: true})
  placa?: string;

  @Column({name: 'item_salida', nullable: true})
  itemSalida?: number;

  @Column({name: 'precio_unitario_salida', type: 'double precision', nullable: true})
  precioUnitarioSalida?: number;

  @Column({name: 'flete_por_unidad_salida', type: 'double precision', nullable: true})
  fletePorUnidadSalida?: number;

  @Column({name: 'seguro_por_item_salida', type: 'double precision', nullable: true})
  seguroPorItemSalida?: number;

  @Column({name: 'valor_fob_salida', type: 'double precision', nullable: true})
  valorFOBSalida?: number;

  @Column({name: 'valor_cif_salida', type: 'double precision', nullable: true})
  valorCIFSalida?: number;

  @Column({name: 'peso_salida', type: 'double precision', nullable: true})
  pesoSalida?: number;

  @Column({nullable: false})
  estado: number;

  @Column({name: 'id_solicitud_previa_detalle', nullable: true})
  idSolicitudPreviaDetalle: number;

  @Column({name: 'id_solicitud_previa_detalle_anulado', nullable: true})
  idSolicitudPreviaDetalleAnulado?: number;

  @Column({name: 'id_notificacion_retiro_anulado', nullable: true})
  idNotificacionRetiroAnulado?: number;

  @Column({name: 'id_factura_informativa_anulado', nullable: true})
  idFacturaInformativaAnulado?: number;

  @ManyToOne(type => SolicitudPreviaDetalleEntity, solicitudPreviaDetalle => solicitudPreviaDetalle.detallesItemProducto)
  @JoinColumn({name: 'id_solicitud_previa_detalle'})
  solicitudPreviaDetalle: SolicitudPreviaDetalleEntity;
}
