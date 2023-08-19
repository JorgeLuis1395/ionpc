import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {SolicitudPreviaDetalleEntity} from "./solicitud-previa-detalle.entity";

@Entity('producto')
export class ProductoEntity {
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

  @Column({length: 100, nullable: false})
  marca: string;

  @Column({length: 100, nullable: true})
  tipo: string;

  @Column({length: 250, nullable: false})
  descripcion: string;

  @Column({name: 'partida_arancelaria', length: 250, nullable: false})
  partidaArancelaria: string;

  @Column({nullable: false})
  estado: number;

  @OneToMany(type => SolicitudPreviaDetalleEntity, solicitudPreviaDetalle => solicitudPreviaDetalle.producto)
  solicitudPreviaDetalles: SolicitudPreviaDetalleEntity[];
}
