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
import {SolicitudPreviaEntity} from './solicitud-previa.entity';
import {SolicitudPreviaDetalleEntity} from './solicitud-previa-detalle.entity';

@Entity('matricula_afianzada')
export class MatriculaAfianzadaEntity {
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
    name: 'fecha_matricula_afianzada',
    type: 'date',
  })
  fechaMatriculaAfianzada: Date;

  @Column({
    name: 'fecha_vencimiento',
    type: 'date',
  })
  fechaVencimiento: Date;

  @Column({length: 50})
  numeroTitulo: string;

  @Column({name: 'total_parcial', type: 'double precision', nullable: true})
  totalParcial: number;

  @Column({name: 'valor_total_titulo', type: 'double precision', nullable: false})
  valorTotalTitulo: number;

  @Column({length: 250, nullable: true})
  observaciones: string;

  @Column({length: 150, nullable: true})
  referendo?: string;

  @Column({name: 'id_solicitud_previa', nullable: true})
  idSolicitudPrevia?: number;

  @Column({name: 'id_solicitud_previa_anulado', nullable: true})
  idSolicitudPreviaAnulado?: number;

  @Column({name: 'id_notificacion_retiro_anulado', nullable: true})
  idNotificacionRetiroAnulado?: number;

  @Column({nullable: true})
  estado: number;

  @ManyToOne(type => SolicitudPreviaEntity, solicitudPrevia => solicitudPrevia.matriculasAfianzadas)
  @JoinColumn({name: 'id_solicitud_previa'})
  solicitudPrevia: SolicitudPreviaEntity;

  @OneToMany(type => SolicitudPreviaDetalleEntity, solicitudPreviaDetalle => solicitudPreviaDetalle.matriculaAfianzada)
  solicitudPreviaDetalles: SolicitudPreviaDetalleEntity[];
}
