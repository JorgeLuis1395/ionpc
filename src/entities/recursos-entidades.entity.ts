import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RecursosEntity } from './recursos.entity';

@Entity('recursos_entidades')
export class RecursosEntidadesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RecursosEntity, recursos => recursos.recursosentidades)
  @JoinColumn({ name: 'id_catalogo' })
  recursos: RecursosEntity;
}
