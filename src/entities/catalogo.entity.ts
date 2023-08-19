import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { SectoresEntity } from './sectores.entity';
import { AfectacionesEntity } from './afectaciones.entity';
import { EmergenciaEntity } from './emergencia.entity';

@Entity('catalogo')
export class CatalogoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  id_padre: number;

  @Column()
  nombre: string;

  @Column({ name: 'codigo_antiguo', nullable: true })
  codigoAntiguo: number;

  @Column({ name: 'imagen', nullable: true })
  imagen: string;

}
