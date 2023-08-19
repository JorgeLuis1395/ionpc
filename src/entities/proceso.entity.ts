import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity('proceso')
export class ProcesoEntity {
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

  @Column({ nullable: true })
  estado: number;

  @Column({ length: 50, nullable: true })
  nombre_proceso: string;

  @Column({ nullable: true })
  detalle_proceso: string;
  /* @OneToMany(() => IncidenteFormularioEntity, incidenteformulario => incidenteformulario.incidente)
   incidentesFormularios: IncidenteFormularioEntity[];*/

}
