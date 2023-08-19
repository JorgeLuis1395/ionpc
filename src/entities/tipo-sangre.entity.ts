import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  }from 'typeorm';
  import {UsuarioEntity} from './usuario.entity';

@Entity('tipo-sangre')
export class TipoSangreEntity {

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

  @Column({ length: 25 })
  tipo: string;

  @Column({ length: 5 })
  factor: string;


  @OneToMany(() => UsuarioEntity, usuario => usuario.tipo)
  usuarios?: Promise<UsuarioEntity[]>;
}
