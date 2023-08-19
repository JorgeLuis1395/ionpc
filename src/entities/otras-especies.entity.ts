import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductosTranscityEntity } from './productos-transcity.entity';

@Entity('otrasespecies')
export class OtrasEspeciesEntity {
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

  @Column({nullable: false})
  otras: string;

  @OneToMany(() => ProductosTranscityEntity, productoTranscity2 => productoTranscity2.otraEspecie)
  productoTranscity2: ProductosTranscityEntity[];



}
