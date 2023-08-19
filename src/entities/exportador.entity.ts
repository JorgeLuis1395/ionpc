import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {SolicitudPreviaEntity} from "./solicitud-previa.entity";

@Entity('exportador')
export class ExportadorEntity {
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

  @Column({length: 25, nullable: true})
  ruc: string;

  @Column({length: 100, nullable: false})
  nombre: string;

  @Column({length: 250, nullable: true})
  direccion: string;

  @Column({length: 50, nullable: true})
  telefono: string;

  @Column({length: 150, nullable: false})
  email: string;

  @Column({name: 'pais_origen', length: 50, nullable: false})
  paisOrigen: string;

  @Column({nullable: false})
  estado: number;

  @OneToMany(type => SolicitudPreviaEntity, solicitudPrevia => solicitudPrevia.exportador)
  solicitudesPrevias: SolicitudPreviaEntity[];
}
