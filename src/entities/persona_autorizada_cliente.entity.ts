import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClienteEntity } from './cliente.entity';
import { NotificacionRetiroEntity } from './notificacion-retiro.entity';

@Entity('persona_autorizada_cliente')
export class PersonaAutorizadaClienteEntity {
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

  @Column({ length: 13, nullable: false})
  cedula: string;

  @Column({ nullable: true })
  estado: number;

  @Column({ name: 'id_cliente' })
  idCliente: number;

  @ManyToOne(() => ClienteEntity, cliente => cliente.personasAutorizadas)
  @JoinColumn({ name: 'id_cliente' })
  cliente?: ClienteEntity;

  @OneToMany(() => NotificacionRetiroEntity, notificacionesRetiro => notificacionesRetiro.personaAutorizada)
  notificacionesRetiro?: NotificacionRetiroEntity[];

}
