import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {TarjaRecepcionVehiculoEntity} from "./tarja-recepcion-vehiculo.entity";

@Entity('foto')
export class FotoEntity {
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

  @Column({name: 'url', length: 250})
  url: string;

  @Column({nullable: true})
  tarjaRecepcionVehiculoId?: number;

  @ManyToOne(type => TarjaRecepcionVehiculoEntity, tarjaRecepcionVehiculo => tarjaRecepcionVehiculo.fotos)
  @JoinColumn({name: 'tarjaRecepcionVehiculoId'})
  tarjaRecepcionVehiculo?: TarjaRecepcionVehiculoEntity;
}
