import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EmergenciaEntity } from './emergencia.entity';
import { CatalogoEntity } from './catalogo.entity';

@Entity('sectores')
export class SectoresEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EmergenciaEntity, emergencia => emergencia.sectores)
  @JoinColumn({ name: 'id_emergencia' })
  emergencia: EmergenciaEntity[];


}
