import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RackEntity } from './rack.entity';
import { ProductosTranscityEntity } from './productos-transcity.entity';

@Entity('tallascamaroncola')
export class TallasCamaronColaEntity {
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

  @Column({ nullable: false })
  talla: string;

  @OneToMany(() => ProductosTranscityEntity, productoTranscity6 => productoTranscity6.tallaCamaroCola)
  productoTranscity6: ProductosTranscityEntity[];


}
