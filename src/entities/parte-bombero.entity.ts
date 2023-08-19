import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('parte_bombero')
export class ParteBomberoEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({ name: 'fecha_hora_registro_ion' })
  fechaHoraRegistroIon?: Date;

  @UpdateDateColumn({ name: 'fecha_hora_actualizacion_ion' })
  fechaHoraActualizacionIon?: Date;

  @Column()
  codigo: string;

  @Column()
  fecha: Date;

  @Column()
  estado: string;

  @Column({
    name: 'empatado_coe',
    nullable: true,
  })
  empatadoCoe: boolean;

  @Column({ name: 'ficha_ecu' })
  fichaEcu: string;

  @Column({ name: 'tipo_despacho', nullable: true })
  tipoDespacho: string;

  @Column({ name: 'tipo_emergencia', nullable: true })
  tipoEmergencia: string;

  @Column({ name: 'tipo_parte', nullable: true })
  tipoParte: string;

  @Column({ name: 'tipo_vehiculo', nullable: true })
  tipoVehiculo: string;

  @Column({ name: 'fecha_despacho', nullable: true })
  fechaDespacho: Date;

  @Column({ name: 'fecha_salida', nullable: true })
  fechaSalida: Date;

  @Column({ name: 'fecha_arribo', nullable: true })
  fechaArribo: Date;

  @Column({ name: 'fecha_fin', nullable: true })
  fechaFin: Date;

  @Column()
  parroquia: string;

  @Column()
  zona: string;

  @Column()
  barrio: string;

  @Column()
  genero: string;

  @Column({ name: 'edad_victima', nullable: true })
  edadVictima: number;

  @Column({ nullable: true })
  victima: string;

  @Column({ name: 'area_quemada', type: 'double precision', nullable: true })
  areaQuemada: number;

  @Column({ name: 'direccion_parte' })
  direccionParte: string;

  @Column({ name: 'calle_primaria' })
  callePrimaria: string;

  @Column({ name: 'calle_secundaria', nullable: true })
  calleSecundaria: string;

  @Column({ name: 'numero_calle' })
  numeroCalle: string;

  @Column({ name: 'referencia' })
  referencia: string;

  @Column({ type: 'double precision', nullable: true })
  latitud: number;

  @Column({ type: 'double precision', nullable: true })
  longitud: number;

  @Column({ name: 'forma_aviso', nullable: true })
  formaAviso: string;

  @Column({ name: 'causa_presuntiva', nullable: true })
  causaPresuntiva: string;

  @Column({ name: 'emergencia_fallida' })
  emergenciaFallida: string;
}
