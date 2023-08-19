import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RackEntity } from './rack.entity';
import { ProductosTranscityEntity } from './productos-transcity.entity';

@Entity('tipoCamaron')
export class TipoCamaronEntity {
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
  tipo: string;

  @OneToMany(() => ProductosTranscityEntity, productoTranscity => productoTranscity.tipoCamaron)
  productoTranscity: ProductosTranscityEntity[];



}
