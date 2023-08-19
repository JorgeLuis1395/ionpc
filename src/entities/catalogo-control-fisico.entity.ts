import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ControlVehiculoEntity} from "./control-vehiculo.entity";
import {ControlFisicoEntity} from "./control-fisico.entity";

@Entity('catalogo_control_fisico')
export class CatalogoControlFisicoEntity {
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

  @Column({name: 'url_imagen', length: 250})
  urlImagen: string;

  @OneToMany(() => ControlFisicoEntity, controlVehiculo => controlVehiculo.catalogoControlFisico)
  controlesFisicos: ControlFisicoEntity[];
}
