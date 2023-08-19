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

@Entity('genero')
export class GeneroEntity {

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
  genero: string;


  @OneToMany(() => UsuarioEntity, usuario => usuario.genero)
  usuarios?: Promise<UsuarioEntity[]>;
}
