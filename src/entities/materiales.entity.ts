import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RackEntity } from './rack.entity';

@Entity('materiales')
export class MaterialesEntity {
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
  codigoMaterial: string;

  @Column({nullable: false})
  tipo: string;

  @Column({nullable: false})
  detalle: string;

  @Column({nullable: false})
  capacidad: number;

  @Column({nullable: false})
  unidad: string;

  @Column({nullable: false})
  descripcion: string;

}
