import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RackEntity } from './rack.entity';
import { ProductosTranscityEntity } from './productos-transcity.entity';

@Entity('especiopescadocongelado')
export class EspeciePescadoCongeladoEntity {
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
  especie: string;

  @Column({nullable: false})
  talla: string

  @OneToMany(() => ProductosTranscityEntity, productoTranscity8=> productoTranscity8.tallaPescadoCongelado)
  productoTranscity8: ProductosTranscityEntity[];


}
