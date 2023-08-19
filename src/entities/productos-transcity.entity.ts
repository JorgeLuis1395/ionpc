import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OtrasEspeciesEntity } from './otras-especies.entity';
import { ModalidadCamaronEntity } from './modalidad-camaron.entity';
import { ModalidadPescadoEntity } from './modalidad-pescado.entity';
import { TallasCamaronEnteroEntity } from './tallas-camaron-entero.entity';
import { TallasCamaronColaEntity } from './tallas-camaron-cola.entity';
import { EspeciePescadoFrescoEntity } from './especie-pescado-fresco.entity';
import { EspeciePescadoCongeladoEntity } from './especie-pescado-congelado.entity';
import { MarcaEntity } from './marca.entity';
import { ClienteTrancityEntity } from './cliente-trancity.entity';
import { TiposPescadoEntity } from './tipos-pescado.entity';
import { TipoCamaronEntity } from './tipo-camaron.entity';
import { DestinoEntity } from './destino.entity';

@Entity('productosTranscity')
export class ProductosTranscityEntity {
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

  @Column({ nullable: false })
  prioridadProducto: number;

  @Column({ length: 100, nullable: false })
  po: string;

  @Column({ nullable: false })
  fcl: string;

  @Column({ nullable: false })
  part: string;

  @Column({ nullable: false })
  naviera: string;


  @Column({ nullable: false })
  codigo_producto: string;

  @Column({ nullable: false })
  incluir: string;

  @Column({ nullable: false })
  lote: string;

  @Column({ nullable: false })
  producto: string;


  @Column({ nullable: false })
  tallaMarcada: string;

  @Column({ nullable: false })
  padre: string;

  @Column({ nullable: false })
  anterior: string;


  @ManyToOne(type => TipoCamaronEntity, tipoCamaron => tipoCamaron.productoTranscity, { eager: true })
  @JoinColumn({ name: 'id_camaron' })
  tipoCamaron: TipoCamaronEntity[];

  @ManyToOne(type => TiposPescadoEntity, tipoPescado => tipoPescado.productoTranscity1, { eager: true })
  @JoinColumn({ name: 'id_tipo_pescado' })
  tipoPescado: TiposPescadoEntity[];

  @ManyToOne(type => OtrasEspeciesEntity, otraEspecie => otraEspecie.productoTranscity2, { eager: true })
  @JoinColumn({ name: 'id_otra_especie' })
  otraEspecie: OtrasEspeciesEntity[];

  @ManyToOne(type => ModalidadCamaronEntity, modalidadCamaron => modalidadCamaron.productoTranscity3, { eager: true })
  @JoinColumn({ name: 'id_modalidad_camaron' })
  modalidadCamaron: ModalidadCamaronEntity[];

  @ManyToOne(type => ModalidadPescadoEntity, modalidadPescado => modalidadPescado.productoTranscity4, { eager: true })
  @JoinColumn({ name: 'id_modalidad_pescado' })
  modalidadPescado: ModalidadPescadoEntity[];


  @ManyToOne(type => TallasCamaronEnteroEntity, tallaCamaroEntero => tallaCamaroEntero.productoTranscity5, { eager: true })
  @JoinColumn({ name: 'id_talla_camaron_entero' })
  tallaCamaroEntero: TallasCamaronEnteroEntity[];

  @ManyToOne(type => TallasCamaronColaEntity, tallaCamaroCola => tallaCamaroCola.productoTranscity6, { eager: true })
  @JoinColumn({ name: 'id_talla_camaron_cola' })
  tallaCamaroCola: TallasCamaronColaEntity[];

  @ManyToOne(type => EspeciePescadoFrescoEntity, tallaPescadoFresco => tallaPescadoFresco.productoTranscity7, { eager: true })
  @JoinColumn({ name: 'id_talla_pescado_fresco' })
  tallaPescadoFresco: EspeciePescadoFrescoEntity[];

  @ManyToOne(type => EspeciePescadoCongeladoEntity, tallaPescadoCongelado => tallaPescadoCongelado.productoTranscity8, { eager: true })
  @JoinColumn({ name: 'id_talla_pescado_congelado' })
  tallaPescadoCongelado: EspeciePescadoCongeladoEntity[];

  @ManyToOne(type => ClienteTrancityEntity, cliente => cliente.productoTranscity9, { eager: true })
  @JoinColumn({ name: 'id_cliente' })
  cliente: ClienteTrancityEntity[];

  @ManyToOne(type => MarcaEntity, marca => marca.productoTranscity10, { eager: true })
  @JoinColumn({ name: 'id_marca' })
  marca: MarcaEntity[];

  @ManyToOne(type => DestinoEntity, destino => destino.productoTranscity11, { eager: true })
  @JoinColumn({ name: 'id_destino' })
  destino: DestinoEntity[];


}
