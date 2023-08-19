import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IncidenteFormularioEntity } from './incidente-formulario.entity';


@Entity('formulario')
export class FormularioEntity {
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
  nombre: string;

  @Column({ nullable: false })
  formulario: string;

  @OneToMany(type => IncidenteFormularioEntity, formularioincidente => formularioincidente.formulario)
  incidentesFormularios: IncidenteFormularioEntity[];
}
