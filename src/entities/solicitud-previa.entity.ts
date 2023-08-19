import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ClienteEntity } from './cliente.entity';
import { SolicitudPreviaDetalleEntity } from './solicitud-previa-detalle.entity';
import { MatriculaAfianzadaEntity } from './matricula-afianzada.entity';
import { ExportadorEntity } from './exportador.entity';
import { PuertoEmbarqueEntity } from './puerto-embarque.entity';
import { PuertoDespachoEntity } from './puerto-despacho.entity';

@Entity('solicitud_previa')
export class SolicitudPreviaEntity {
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
    name: 'fecha_emision',
    type: 'date',
    nullable: true,
  })
  fechaEmision: Date;

  @Column({ name: 'codigo_referencia', length: 25, nullable: false })
  codigoReferencia: string;

  @Column({ name: 'numero_pedido', length: 100, nullable: false })
  numeroPedido: string;

  @Column({ length: 250, nullable: true })
  direccion: string;

  @Column({
    name: 'fecha_aproximada_llegada',
    type: 'date',
  })
  fechaAproximadaLlegada?: Date;

  @Column({ name: 'total_fob', type: 'double precision', nullable: false })
  totalFOB: number;

  @Column({ name: 'flete_y_gastos', type: 'double precision', nullable: false })
  fleteYGastos: number;

  @Column({ name: 'valor_c_and_f', type: 'double precision', nullable: false })
  valorCAndF: number;

  @Column({ type: 'double precision', nullable: false })
  seguro: number;

  @Column({ name: 'total_cif', type: 'double precision', nullable: false })
  totalCIF: number;

  @Column({ name: 'total_unidades', type: 'double precision', nullable: false })
  totalUnidades: number;

  @Column({ name: 'saldo_unidades', type: 'double precision', nullable: true })
  saldoUnidades?: number;

  @Column({ name: 'saldo_bultos', type: 'double precision', nullable: true })
  saldoBultos?: number;

  @Column({ length: 100, nullable: true })
  importador: string;

  @Column({ length: 100, nullable: true })
  almacenera: string;

  @Column({ nullable: false })
  estado: number;

  @Column({ name: 'id_exportador', nullable: true })
  idExportador?: number;

  @Column({ name: 'id_cliente', nullable: true })
  idCliente?: number;

  @ManyToOne(type => ClienteEntity, cliente => cliente.solicitudesPrevias)
  @JoinColumn({ name: 'id_cliente' })
  cliente: ClienteEntity;

  @ManyToOne(type => ExportadorEntity, exportador => exportador.solicitudesPrevias)
  @JoinColumn({ name: 'id_exportador' })
  exportador: ExportadorEntity;

  @Column({ name: 'id_puerto_embarque', nullable: true })
  idPuertoEmbarque?: number;

  @Column({ name: 'id_factura_informativa_anulado', nullable: true })
  idFacturaInformativaAnulado?: number;

  @ManyToOne(type => PuertoEmbarqueEntity, puertoEmbarque => puertoEmbarque.solicitudesPrevias)
  @JoinColumn({ name: 'id_puerto_embarque' })
  puertoEmbarque?: PuertoEmbarqueEntity;

  @Column({ name: 'id_puerto_despacho', nullable: true })
  idPuertoDespacho?: number;

  @ManyToOne(type => PuertoDespachoEntity, puertoDespacho => puertoDespacho.solicitudesPrevias)
  @JoinColumn({ name: 'id_puerto_despacho' })
  puertoDespacho?: PuertoDespachoEntity;

  @OneToMany(type => SolicitudPreviaDetalleEntity, solicitudPreviaDetalle => solicitudPreviaDetalle.solicitudPrevia)
  solicitudPreviaDetalles: SolicitudPreviaDetalleEntity[];

  @OneToMany(type => MatriculaAfianzadaEntity, matriculaAfianzada => matriculaAfianzada.solicitudPrevia)
  matriculasAfianzadas: MatriculaAfianzadaEntity[];
}
