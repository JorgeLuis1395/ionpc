import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  }from 'typeorm';
import { CargasFamiliaresEntity } from './cargas-familiares.entity';
@Entity('documentos-familiares')
export class DocumentosFamiliaresEntity {

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
  @Column({ length: 100 })
  url: string;

  @OneToMany(() => CargasFamiliaresEntity, cargas => cargas.documentos)
  cargas?: Promise<CargasFamiliaresEntity[]>;

}
