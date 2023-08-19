import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Unique(['codigoProceso'])
@Entity('parametro_referencia')
export class ParametroReferenciaEntity {
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

  @Column({name: 'codigo_proceso', length: 100, nullable: false })
  codigoProceso: string;

  @Column({ length: 100, nullable: false })
  codigo: string;

  @Column({ nullable: false })
  indice: number;

  @Column({ name: 'maximo_tamanio', nullable: false })
  maximoTamanio: number;

}
