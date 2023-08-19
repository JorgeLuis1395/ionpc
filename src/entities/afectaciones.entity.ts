import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CatalogoEntity } from './catalogo.entity';
import { PersonasAfectadasEntity } from './personas-afectadas.entity';

@Entity('afectacion')
export class AfectacionesEntity {
  @PrimaryGeneratedColumn({ name: 'id_persona' })
  id: number;

}
