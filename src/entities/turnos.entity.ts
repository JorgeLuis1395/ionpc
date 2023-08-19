import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('turnos')
export class TurnosEntity {
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

  @Column({ length: 250, nullable: false })
  fecha_turno: string;
  @Column({ length: 250, nullable: false })
  hora_inicio_turno: string;
  @Column({ length: 250, nullable: false })
  hora_fin_turno: string;
  @Column({ length: 250, nullable: false })
  nombres: string;
  @Column({ length: 250, nullable: false })
  apellidos: string;
  @Column({ length: 250, nullable: true })
  genero: string;
  @Column({ length: 250, nullable: true })
  tipo_documento: string;
  @Column({ length: 250, nullable: true })
  numero_documento: string;
  @Column({ length: 250, nullable: true })
  correo: string;
  @Column({ length: 250, nullable: true })
  celular: string;
  @Column({ length: 250, nullable: true })
  convencional: string;
  @Column({ length: 250, nullable: true })
  poblacion_pertenece: string;
  @Column({ length: 250, nullable: true })
  tipo_turno: string;
  @Column({ length: 250, nullable: true })
  centro_salud: string;
  @Column({ length: 250, nullable: true })
  direccion_centro_salud: string;
}
