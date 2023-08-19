import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RackEntity } from './rack.entity';
import { ProductosTranscityEntity } from './productos-transcity.entity';

@Entity('especiopescadofresco')
export class EspeciePescadoFrescoEntity {
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
  talla: string;

  @OneToMany(() => ProductosTranscityEntity, productoTranscity7 => productoTranscity7.tallaPescadoFresco)
  productoTranscity7: ProductosTranscityEntity[];
}
