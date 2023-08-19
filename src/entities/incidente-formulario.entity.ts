import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IncidenteEntity } from './incidente.entity';
import { FormularioEntity } from './formularios.entity';

@Entity('incidente_formulario')
export class IncidenteFormularioEntity {
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

  @Column({ name: 'id_formulario', nullable: true })
  idFormulario?: number;

  @ManyToOne(type => IncidenteEntity, incidenteformulario => incidenteformulario.incidentesFormularios)
  @JoinColumn({ name: 'id_incidente' })
  incidente: IncidenteEntity;

  @ManyToOne(type => FormularioEntity, formularioincidente => formularioincidente.incidentesFormularios)
  @JoinColumn({ name: 'id_formulario' })
  formulario: FormularioEntity;
}
