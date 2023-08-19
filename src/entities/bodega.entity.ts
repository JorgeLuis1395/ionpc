import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RackEntity } from './rack.entity';

@Entity('bodega')
export class BodegaEntity {
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

  @Column({ length: 100, nullable: false })
  nombre: string;

  @Column({nullable: false})
  filas: number;

  @Column({nullable: false})
  columnas: number;

  @OneToMany(() => RackEntity, rack => rack.bodega)
  racks?: RackEntity[];

}
