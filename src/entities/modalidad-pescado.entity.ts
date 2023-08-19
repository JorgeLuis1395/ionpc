import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RackEntity } from './rack.entity';
import { ProductosTranscityEntity } from './productos-transcity.entity';

@Entity('modalidadpescado')
export class ModalidadPescadoEntity {
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
  modalidad: string;


  @OneToMany(() => ProductosTranscityEntity, productoTranscity4 => productoTranscity4.modalidadPescado)
  productoTranscity4: ProductosTranscityEntity[];

}
