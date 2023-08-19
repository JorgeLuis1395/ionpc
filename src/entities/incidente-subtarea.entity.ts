import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IncidenteEntity } from './incidente.entity';
import { FormularioEntity } from './formularios.entity';

@Entity('incidente-subtarea')
export class IncidenteSubtareaEntity {
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

  @Column({ name: 'id_incidente', nullable: true })
  idIncidente?: number;

  @Column({ name: 'id_subtarea', nullable: true })
  idSubtarea?: number;

  @Column({ name: 'id_proceso', nullable: true })
  idProceso?: number;

  @Column({ name: 'opcional', nullable: true })
  opcional?: boolean;

  @Column({ name: 'estado', nullable: true })
  estado?: boolean;

  /* @ManyToOne(type => IncidenteEntity, incidentesubtarea => incidentesubtarea.incidentesSubtarea)
   @JoinColumn({ name: 'id_incidente' })
   incidente: IncidenteEntity;
 
   @ManyToOne(type => IncidenteEntity, subtareaincidente => subtareaincidente.incidentesSubtarea)
   @JoinColumn({ name: 'id_subtarea' })
   subtarea: FormularioEntity;*/
}
