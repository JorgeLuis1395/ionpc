import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('feriado')
export class FeriadoEntity {
  @PrimaryGeneratedColumn()
  idFeriado: number;

  @Column()
  titulo: string;

  @Column()
  color: string;

  @Column()
  fechaInicio: string;

  @Column()
  fechaFin: string;
}
