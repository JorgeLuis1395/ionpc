import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {SolicitudPreviaEntity} from "./solicitud-previa.entity";
import {PersonaAutorizadaClienteEntity} from './persona_autorizada_cliente.entity';
import { ProductosTranscityEntity } from './productos-transcity.entity';

@Entity('clienteTranscity')
export class ClienteTrancityEntity {
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

  @Column({length: 25, nullable: true})
  ruc: string;

  @Column({length: 100, nullable: false})
  nombre: string;

  @Column({length: 250, nullable: true})
  direccion: string;

  @Column({length: 50, nullable: true})
  telefono: string;

  @Column({length: 150, nullable: true})
  email: string;

  @Column({length: 100, nullable: true})
  domiciliado: string;

  @Column({nullable: false})
  estado: number;

  @OneToMany(() => ProductosTranscityEntity, productoTranscity9 => productoTranscity9.cliente)
  productoTranscity9: ProductosTranscityEntity[];
}
