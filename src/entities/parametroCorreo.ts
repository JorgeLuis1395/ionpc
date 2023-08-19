import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('parametrosserver')
export class ParamtrosCorreoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({
        name: 'fecha_hora_registro',
        type: 'datetime',
    })
    fechaHoraRegistro?: Date;

    @UpdateDateColumn({
        name: 'fecha_hora_actualizacion',
        type: 'datetime',
    })
    fechaHoraActualizacion?: Date;

    @Column({ length: 50 })
    hostname: string;

    @Column({ })
    puerto: number;

    @Column({ name: 'numero_correos'})
    numCorreos: number;

    @Column({})
    enabletls: boolean;

    @Column({})
    mailparser: boolean;

    @Column({})
    username: string;

    @Column({})
    password: string;

    @Column({ name: 'correo_remitente'})
    emailRemitente: string;
}
