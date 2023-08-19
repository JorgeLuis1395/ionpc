import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PersonaAutorizadaClienteEntity } from './persona_autorizada_cliente.entity';
import { TarjaRecepcionVehiculoEntity } from './tarja-recepcion-vehiculo.entity';
import { UsuarioEntity } from './usuario.entity';

@Entity('notificacion_retiro')
export class NotificacionRetiroEntity {
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

  @Column({ name: 'codigo_referencia', length: 150, nullable: false })
  codigoReferencia: string;

  @Column({ name: 'tipo_retiro', length: 100, nullable: false })
  tipoRetiro: string;

  @Column({
    name: 'fecha_notificacion_retiro',
    type: 'date',
  })
  fechaNotificacion: Date;

  @Column({ name: 'persona_firma', length: 200, nullable: false })
  personaFirma: string;

  @Column({ name: 'numero_parcial', type: 'double precision', nullable: true })
  numeroParcial: number;

  @Column({ length: 300, nullable: true })
  observaciones: string;

  @Column({nullable: false})
  estado: number;

  @Column({ name: 'id_persona_autorizada', nullable: true })
  idPersonaAutorizada?: number;

  @ManyToOne(() => PersonaAutorizadaClienteEntity, personaAutorizada => personaAutorizada.notificacionesRetiro)
  @JoinColumn({ name: 'id_persona_autorizada' })
  personaAutorizada?: PersonaAutorizadaClienteEntity;

  @OneToMany(() => TarjaRecepcionVehiculoEntity, tarjaRecepcionVehiculo => tarjaRecepcionVehiculo.notificacionRetiro)
  tarjasRecepcion?: TarjaRecepcionVehiculoEntity[];

  @Column({ name: 'id_usuario' })
  idUsuario: number;

  @ManyToOne(() => UsuarioEntity, usuario => usuario.notificacionesRetiro)
  @JoinColumn({ name: 'id_usuario' })
  usuario?: UsuarioEntity;

}
