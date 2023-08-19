import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ControlVehiculoEntity} from "./control-vehiculo.entity";
import {ControlFisicoEntity} from "./control-fisico.entity";
import { UsuarioEntity } from './usuario.entity';
import { Fecha_eventosEntity } from './fecha_eventos.entity';

@Entity('eventos')
export class EventosEntity {
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

  @Column({name: 'nombre', length: 50})
  nombre: string;

  @Column({name: 'descripcion', length: 250})
  descripcion: string;

  @OneToMany(() => Fecha_eventosEntity, fechas => fechas.evento)
  fechas?: Promise<Fecha_eventosEntity[]>;
}
