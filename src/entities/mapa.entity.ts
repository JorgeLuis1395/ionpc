import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity('mapa')
export class MapaEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text', { nullable: true })
  coordenadas: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  informacion: string;

  @Column({ nullable: true })
  zonal: string;

  @Column({ nullable: true })
  parroquia: string;

  @Column({ nullable: true })
  sector: string;

  @Column({ name: 'codigo_zonal' })
  codigoZonal: number;

  @Column({ name: 'codigo_barrio' })
  codigoBarrio: number;

  @Column({ name: 'codigo_parroquia' })
  codigoParroquia: number;

}
