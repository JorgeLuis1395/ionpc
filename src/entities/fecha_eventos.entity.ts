import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ControlVehiculoEntity } from "./control-vehiculo.entity";
import { ControlFisicoEntity } from "./control-fisico.entity";
import { RolEntity } from './rol.entity';
import { EventosEntity } from './eventos.entity';

@Entity('fecha_eventos')
// tslint:disable-next-line:class-name
export class Fecha_eventosEntity {
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

  @Column({ name: 'fecha_notificacion' })
  fecha_notificacion: Date;


  @ManyToOne(() => EventosEntity, evento => evento.fechas, { eager: true })
  @JoinColumn({ name: 'id_evento' })
  evento?: EventosEntity;

  @Column({ name: 'id_usuario' })
  usuario: number;
}
