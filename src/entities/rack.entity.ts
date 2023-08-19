import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {TarjaRecepcionVehiculoEntity} from "./tarja-recepcion-vehiculo.entity";
import { RolEntity } from './rol.entity';
import { BodegaEntity } from './bodega.entity';

@Entity('rack')
export class RackEntity {
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

  @Column({length: 250, nullable: false})
  codigo: string;

  @Column({length: 25, nullable: true})
  letra: string;

  @Column({nullable: true})
  fila: number;

  @Column({nullable: true})
  columna: number;

  @Column({type: 'double precision', nullable: true})
  latitud: number;

  @Column({type: 'double precision', nullable: true})
  longitud: number;

  @Column({nullable: false})
  estado: number;

  @Column({ name: 'id_bodega' })
  idBodega: number;

  @Column({ name: 'id_tarja_recepcion_actual', nullable: true })
  idTarjaRecepcionActual: number;

  @ManyToOne(() => BodegaEntity, bodega => bodega.racks, { eager: true })
  @JoinColumn({ name: 'id_bodega' })
  bodega?: BodegaEntity;

  @OneToMany(type => TarjaRecepcionVehiculoEntity, tarjaRecepcionVehiculo => tarjaRecepcionVehiculo.rack)
  tarjasRecepcionVehiculo: TarjaRecepcionVehiculoEntity[];

  @OneToOne(type => TarjaRecepcionVehiculoEntity)
  @JoinColumn({name: 'id_tarja_recepcion_actual'})
  tarjaRepcepcionActual: TarjaRecepcionVehiculoEntity;
}
