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
import {SolicitudPreviaEntity} from "./solicitud-previa.entity";
import {ProductoEntity} from "./producto.entity";
import {MatriculaAfianzadaEntity} from "./matricula-afianzada.entity";
import {DetalleItemProductoEntity} from "./detalle-item-producto.entity";

@Entity('solicitud_previa_detalle')
export class SolicitudPreviaDetalleEntity {
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

  @Column({nullable: false})
  item: number;

  @Column({length: 100, nullable: false})
  descripcion: string;

  @Column({name: 'partida_arancelaria', length: 100, nullable: false})
  partidaArancelaria: string;

  @Column({type: 'double precision', nullable: false})
  cantidad: number;

  @Column({name: 'precio_unitario', type: 'double precision', nullable: false})
  precioUnitario: number;

  @Column({name: 'flete_por_unidad', type: 'double precision', nullable: false})
  fletePorUnidad: number;

  @Column({name: 'seguro_por_item', type: 'double precision', nullable: false})
  seguroPorItem: number;

  @Column({name: 'valor_fob', type: 'double precision', nullable: false})
  valorFOB: number;

  @Column({name: 'valor_cif', type: 'double precision', nullable: false})
  valorCIF: number;

  @Column({nullable: false})
  estado: number;

  @Column({name: 'id_solicitud_previa', nullable: true})
  idSolicitudPrevia?: number;

  @Column({name: 'id_matricula_afianzada', nullable: true})
  idMatriculaAfianzada?: number;

  @Column({name: 'id_matricula_afianzada_cancelado', nullable: true})
  idMatriculaAfianzadaCancelado?: number;

  @Column({name: 'id_producto', nullable: true})
  idProducto?: number;

  @Column({type: 'double precision', nullable: true})
  saldo?: number;

  @ManyToOne(type => SolicitudPreviaEntity, solicitudPrevia => solicitudPrevia.solicitudPreviaDetalles)
  @JoinColumn({name: 'id_solicitud_previa'})
  solicitudPrevia: SolicitudPreviaEntity;

  @ManyToOne(type => ProductoEntity, producto => producto.solicitudPreviaDetalles)
  @JoinColumn({name: 'id_producto'})
  producto?: ProductoEntity;

  @ManyToOne(type => MatriculaAfianzadaEntity, matriculaAfianzada => matriculaAfianzada.solicitudPreviaDetalles)
  @JoinColumn({name: 'id_matricula_afianzada'})
  matriculaAfianzada: MatriculaAfianzadaEntity;

  @OneToMany(type => DetalleItemProductoEntity, detalleItemProducto => detalleItemProducto.solicitudPreviaDetalle)
  detallesItemProducto: DetalleItemProductoEntity[];
}
