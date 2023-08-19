import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ControlVehiculoEntity} from "./control-vehiculo.entity";

@Entity('catalogo_control_vehiculo')
export class CatalogoControlVehiculoEntity {
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

  @Column({name: 'nombre', length: 50})
  nombre: string;

  @OneToMany(() => ControlVehiculoEntity, controlVehiculo => controlVehiculo.catalogoControlVehiculo)
  controlesVehiculo: ControlVehiculoEntity[];
}
