import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IncidenteFormularioEntity } from './incidente-formulario.entity';


@Entity('incidente')
export class IncidenteEntity {
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

  @Column({ length: 50, nullable: true })
  tipo_incidente: string;

  @Column({ nullable: false })
  icono: string;

  @Column({ nullable: true })
  prioridad: number;

  @Column({ nullable: true })
  estado: number;

  @Column({ nullable: true })
  duracion_evento: number;

  @Column({ nullable: true })
  cantidad_procesos: number;

  @Column({ nullable: true })
  detalle_incidente: string;

  @OneToMany(() => IncidenteFormularioEntity, incidenteformulario => incidenteformulario.incidente)
  incidentesFormularios: IncidenteFormularioEntity[];

}
