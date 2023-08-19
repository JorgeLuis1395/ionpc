import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  }from 'typeorm';
import { DatosFamiliaresEntity } from './datos-familiares.entity';
import { DocumentosFamiliaresEntity } from './documentos-familiares.entity';
@Entity('cargas-familiares')
export class CargasFamiliaresEntity {

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

  @ManyToOne(() => DocumentosFamiliaresEntity, documentos => documentos.cargas, { eager: true })
  @JoinColumn({ name: 'id_documentos' })
  documentos?: DocumentosFamiliaresEntity;

  @ManyToOne(() => DatosFamiliaresEntity, datos => datos.cargas, { eager: true })
  @JoinColumn({ name: 'id_datos' })
  datos?: DatosFamiliaresEntity;

}
