import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RackEntity } from './rack.entity';
import { SolicitudPreviaEntity } from './solicitud-previa.entity';

@Entity('puerto_despacho')
export class PuertoDespachoEntity {
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

  @Column({ length: 100, nullable: false })
  nombre: string;

  @Column({ length: 100, nullable: true })
  horas: string;

  @Column({ length: 100, nullable: true })
  costo: string;

  @Column({ length: 100, nullable: true })
  detalle: string;

  @Column({ length: 100, nullable: true })
  tipo: string;

  @Column({ nullable: true })
  estado: number;

  @OneToMany(() => SolicitudPreviaEntity, solicitudPrevia => solicitudPrevia.puertoDespacho)
  solicitudesPrevias?: SolicitudPreviaEntity[];
}
