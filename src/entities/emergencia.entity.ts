import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SectoresEntity } from './sectores.entity';
import { RecursosEntity } from './recursos.entity';
import { PersonasAfectadasEntity } from './personas-afectadas.entity';
import { CatalogoEntity } from './catalogo.entity';
import { MapaEntity } from './mapa.entity';

@Entity('emergencia')
export class EmergenciaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp without time zone', name: 'fecha_emergencia' })
  fechaEmergencia: Date;



  @Column({ name: 'diff_llamada_despacho', nullable: true })
  diffLlamadaDespacho: string;

  @Column({ name: 'diff_despacho_arribo', nullable: true })
  diffDespachoArribo: string;

  @Column({ name: 'diff_llamada_finalizacion', nullable: true })
  diffLlamadaFinalizacion: string;


  @Column({ nullable: true })
  referencia: string;

  @Column({ name: 'coordenada_x', nullable: true })
  coordenadaX: string;

  @Column({ name: 'coordenada_y', nullable: true })
  coordenadaY: string;

  @Column({ nullable: true })
  descripcion: string;



  @Column({ nullable: true })
  activo: boolean;

  @Column({
    type: 'timestamp without time zone',
    name: 'fecha_finalizacion',
    nullable: true,
  })
  fechaFinalizacion: Date;

  @Column({
    type: 'timestamp without time zone',
    name: 'fecha_llamada',
    nullable: true,
  })
  fechaLlamada: Date;

  @Column({
    type: 'timestamp without time zone',
    name: 'fecha_despacho',
    nullable: true,
  })
  fechaDespacho: Date;

  @Column({
    type: 'timestamp without time zone',
    name: 'fecha_arribo_recursos',
    nullable: true,
  })
  fechaArriboRecursos: Date;

  @Column({ type: 'double precision', nullable: true })
  valor: number;

  @Column({ name: 'unidad_medida', nullable: true })
  unidadMedida: number;

  @Column({ name: 'nivel_evento', nullable: true })
  nivelEvento: string;

  @Column({ name: 'dias_movilidad', nullable: true })
  diasMovilidad: number;

  @Column({ nullable: true })
  materiales: string;

  @Column({
    type: 'double precision',
    name: 'valor_convertido',
    nullable: true,
  })
  valorConvertido: number;

  @Column({ name: 'unidad_medida_convertida', nullable: true })
  unidadMedidaConvertida: number;

  @Column({ name: 'ficha_ecu', nullable: true })
  fichaEcu: string;
  @Column({ nullable: true })
  calles: string;

  @Column({ name: 'afectaciones_movilidad' })
  afectacionesMovilidad: number;

  @Column({ name: 'numero_viviendas_afectadas' })
  numeroViviendasAfectadas: number;

  @Column({ name: 'numero_viviendas_afectadas_patrimoniales' })
  numeroViviendasAfectadasPatrimoniales: number;

  @Column({ name: 'numero_viviendas_destruidas' })
  numeroViviendasDestruidas: number;

  @Column({ name: 'numero_viviendas_destruidas_patrimoniales' })
  numeroViviendasDestruidasPatrimoniales: number;

  @Column({ name: 'numero_fauna_urbana' })
  numeroFaunaUrbana: number;

  @Column({ name: 'fondo_emergencia', nullable: true })
  fondoEmergencia: boolean;

  @Column()
  semaforo: number;

  @Column({ name: 'causa_principal' })
  causaPrincipal: number;

  @Column({ name: 'coordenada_xg' })
  coordenada_xg: string;

  @Column({ name: 'coordenada_yg' })
  coordenada_yg: string;

  @Column({ name: 'usuario', nullable: true })
  usuario: string;

  @Column({ default: () => [0], nullable: true }) inundacionescalado: string;
  @Column({ default: () => [0], nullable: true }) inundacionescausa: string;
  @Column({ default: () => [0], nullable: true })
  inundacionesafectacionesmovilidad: string;
  @Column({ default: () => [0], nullable: true })
  inundacionesniveldeevento: string;
  @Column({ default: () => [0], nullable: true }) movimientovolumen: string;
  @Column({ default: () => [0], nullable: true })
  movimientomovilidadviasprioritarias: string;
  @Column({ default: () => [0], nullable: true })
  movimientoniveldeevento: string;
  @Column({ default: () => [0], nullable: true }) incendioarea: string;
  @Column({ default: () => [0], nullable: true }) indenciohectareas: string;
  @Column({ default: () => [0], nullable: true })
  incendiomaterialescombustibles: string;
  @Column({ default: () => [0], nullable: true }) indencionivelevento: string;
  @Column({ default: () => [0], nullable: true }) aguapotable: string;
  @Column({ default: () => [0], nullable: true }) alcantarillado: string;
  @Column({ default: () => [0], nullable: true })
  areasnaturalesprotegidasybosquesprotectores: string;
  @Column({ default: () => [0], nullable: true }) educacion: string;
  @Column({ default: () => [0], nullable: true }) energiaehidrocarburos: string;
  @Column({ default: () => [0], nullable: true }) estatal: string;
  @Column({ default: () => [0], nullable: true })
  instalacionesdeprimerarespuesta: string;
  @Column({ default: () => [0], nullable: true }) municipal: string;
  @Column({ default: () => [0], nullable: true }) patrimonial: string;
  @Column({ default: () => [0], nullable: true }) privado: string;
  @Column({ default: () => [0], nullable: true }) salud: string;
  @Column({ default: () => [0], nullable: true }) seguridad: string;
  @Column({ default: () => [0], nullable: true }) telecomunicaciones: string;
  @Column({ default: () => [0], nullable: true }) transporte: string;
  @Column({ default: () => [0], nullable: true }) numpersonasafectada: string;
  @Column({ default: () => [0], nullable: true }) numfamiliasafectada: string;
  @Column({ default: () => [0], nullable: true }) nombresafectada: string;
  @Column({ default: () => [0], nullable: true }) edadesafectada: string;
  @Column({ default: () => [0], nullable: true }) generosafectada: string;
  @Column({ default: () => [0], nullable: true }) numpersonasevacuada: string;
  @Column({ default: () => [0], nullable: true }) numfamiliasevacuada: string;
  @Column({ default: () => [0], nullable: true }) nombresevacuada: string;
  @Column({ default: () => [0], nullable: true }) edadesevacuada: string;
  @Column({ default: () => [0], nullable: true }) generosevacuada: string;
  @Column({ default: () => [0], nullable: true })
  numpersonasdamnificada: string;
  @Column({ default: () => [0], nullable: true })
  numfamiliasdamnificada: string;
  @Column({ default: () => [0], nullable: true }) nombresdamnificada: string;
  @Column({ default: () => [0], nullable: true }) edadesdamnificada: string;
  @Column({ default: () => [0], nullable: true }) generosdamnificada: string;
  @Column({ default: () => [0], nullable: true })
  numpersonasenfamiliaacogiente: string;
  @Column({ default: () => [0], nullable: true })
  numfamiliasenfamiliaacogiente: string;
  @Column({ default: () => [0], nullable: true })
  nombresenfamiliaacogiente: string;
  @Column({ default: () => [0], nullable: true })
  edadesenfamiliaacogiente: string;
  @Column({ default: () => [0], nullable: true })
  generosenfamiliaacogiente: string;
  @Column({ default: () => [0], nullable: true }) numpersonasreubicadas: string;
  @Column({ default: () => [0], nullable: true }) numfamiliasreubicadas: string;
  @Column({ default: () => [0], nullable: true }) nombresreubicadas: string;
  @Column({ default: () => [0], nullable: true }) edadesreubicadas: string;
  @Column({ default: () => [0], nullable: true }) generosreubicadas: string;
  @Column({ default: () => [0], nullable: true })
  numpersonasdesaparecido: string;
  @Column({ default: () => [0], nullable: true })
  numfamiliasdesaparecido: string;
  @Column({ default: () => [0], nullable: true }) nombresdesaparecido: string;
  @Column({ default: () => [0], nullable: true }) edadesdesaparecido: string;
  @Column({ default: () => [0], nullable: true }) generosdesaparecido: string;
  @Column({ default: () => [0], nullable: true }) numpersonasalbergada: string;
  @Column({ default: () => [0], nullable: true }) numfamiliasalbergada: string;
  @Column({ default: () => [0], nullable: true }) nombresalbergada: string;
  @Column({ default: () => [0], nullable: true }) edadesalbergada: string;
  @Column({ default: () => [0], nullable: true }) generosalbergada: string;
  @Column({ default: () => [0], nullable: true }) alberguealbergada: string;
  @Column({ default: () => [0], nullable: true }) numpersonasheridos: string;
  @Column({ default: () => [0], nullable: true }) numfamiliasheridos: string;
  @Column({ default: () => [0], nullable: true }) nombresheridos: string;
  @Column({ default: () => [0], nullable: true }) edadesheridos: string;
  @Column({ default: () => [0], nullable: true }) generosheridos: string;
  @Column({ default: () => [0], nullable: true }) medicoheridos: string;
  @Column({ default: () => [0], nullable: true }) casasaludheridos: string;
  @Column({ default: () => [0], nullable: true }) diagnosticoheridos: string;
  @Column({ default: () => [0], nullable: true }) albergueheridos: string;
  @Column({ default: () => [0], nullable: true }) numpersonasfallecidos: string;
  @Column({ default: () => [0], nullable: true }) numfamiliasfallecidos: string;
  @Column({ default: () => [0], nullable: true }) nombresfallecidos: string;
  @Column({ default: () => [0], nullable: true }) edadesfallecidos: string;
  @Column({ default: () => [0], nullable: true }) generosfallecidos: string;
  @Column({ default: () => [0], nullable: true }) medicofallecidos: string;
  @Column({ default: () => [0], nullable: true }) casasaludfallecidos: string;
  @Column({ default: () => [0], nullable: true }) diagnosticofallecidos: string;
  @Column({ default: () => [0], nullable: true }) alberguefallecidos: string;
  @Column({ default: () => [0], nullable: true })
  numpersonasnacionalesdesaparecidas: string;
  @Column({ default: () => [0], nullable: true })
  numpersonasextranjerasdesaparecidas: string;
  @Column({ default: () => [0], nullable: true }) coepersonas: string;
  @Column({ default: () => [0], nullable: true }) coecamionetas: string;
  @Column({ default: () => [0], nullable: true }) coevolquetas: string;
  @Column({ default: () => [0], nullable: true }) coeminicargadoras: string;
  @Column({ default: () => [0], nullable: true }) coeretroescavadoras: string;
  @Column({ default: () => [0], nullable: true }) coemaquinariapesada: string;
  @Column({ default: () => [0], nullable: true }) cbqpersonas: string;
  @Column({ default: () => [0], nullable: true }) cbqcamionetas: string;
  @Column({ default: () => [0], nullable: true }) cbqestaciones: string;
  @Column({ default: () => [0], nullable: true }) cbqambulanciasA: string;
  @Column({ default: () => [0], nullable: true }) cbqautobombasB: string;
  @Column({ default: () => [0], nullable: true }) cbqtanquerosT: string;
  @Column({ default: () => [0], nullable: true }) cbqunidadesderescate: string;
  @Column({ default: () => [0], nullable: true }) cbqmotos: string;
  @Column({ default: () => [0], nullable: true })
  cbqunidaddematerialespeligrosos: string;
  @Column({ default: () => [0], nullable: true })
  cbqunidaddefuerzadetarea: string;
  @Column({ default: () => [0], nullable: true }) cbqbuses: string;
  @Column({ default: () => [0], nullable: true }) cbqhelipcopteros: string;
  @Column({ default: () => [0], nullable: true }) msppersonas: string;
  @Column({ default: () => [0], nullable: true }) mspambulanciasA: string;
  @Column({ default: () => [0], nullable: true }) cruzrojapersonas: string;
  @Column({ default: () => [0], nullable: true }) cruzrojaambulanciasA: string;
  @Column({ default: () => [0], nullable: true }) cacmpersonas: string;
  @Column({ default: () => [0], nullable: true }) cacmcamionetas: string;
  @Column({ default: () => [0], nullable: true }) cacmmotos: string;
  @Column({ default: () => [0], nullable: true }) cacmbuses: string;
  @Column({ default: () => [0], nullable: true }) cacmcanters: string;
  @Column({ default: () => [0], nullable: true }) cacmvehiculos: string;
  @Column({ default: () => [0], nullable: true }) cacmgruposderescate: string;
  @Column({ default: () => [0], nullable: true }) amtpersonas: string;
  @Column({ default: () => [0], nullable: true }) amtcamionetas: string;
  @Column({ default: () => [0], nullable: true }) amtmotos: string;
  @Column({ default: () => [0], nullable: true }) amcpersonas: string;
  @Column({ default: () => [0], nullable: true }) amcvehiculos: string;
  @Column({ default: () => [0], nullable: true }) epmapspersonas: string;
  @Column({ default: () => [0], nullable: true }) epmapscamionetas: string;
  @Column({ default: () => [0], nullable: true }) epmapsvolquetas: string;
  @Column({ default: () => [0], nullable: true })
  epmapsmaquinariapesada: string;
  @Column({ default: () => [0], nullable: true }) epmapstanquerosT: string;
  @Column({ default: () => [0], nullable: true })
  epmapshidrosuccionadores: string;
  @Column({ default: () => [0], nullable: true }) epmapseductores: string;
  @Column({ default: () => [0], nullable: true }) epmmoppersonas: string;
  @Column({ default: () => [0], nullable: true }) epmmopcamionetas: string;
  @Column({ default: () => [0], nullable: true }) epmmopvolquetas: string;
  @Column({ default: () => [0], nullable: true }) epmmopminicargadoras: string;
  @Column({ default: () => [0], nullable: true })
  epmmopmaquinariapesada: string;
  @Column({ default: () => [0], nullable: true }) epmmoptanquerosT: string;
  @Column({ default: () => [0], nullable: true }) emaseopersonas: string;
  @Column({ default: () => [0], nullable: true }) emaseocamionetas: string;
  @Column({ default: () => [0], nullable: true }) emaseovolquetas: string;
  @Column({ default: () => [0], nullable: true })
  emaseomaquinariapesada: string;
  @Column({ default: () => [0], nullable: true }) emgirspersonas: string;
  @Column({ default: () => [0], nullable: true }) emgirscamionetas: string;
  @Column({ default: () => [0], nullable: true }) emgirsvolquetas: string;
  @Column({ default: () => [0], nullable: true })
  emgirsmaquinariapesada: string;
  @Column({ default: () => [0], nullable: true })
  administracioneszonalespersonas: string;
  @Column({ default: () => [0], nullable: true })
  administracioneszonalescamionetas: string;
  @Column({ default: () => [0], nullable: true })
  administracioneszonalesvolquetas: string;
  @Column({ default: () => [0], nullable: true })
  administracioneszonalesmaquinariapesada: string;
  @Column({ default: () => [0], nullable: true }) eeqpersonas: string;
  @Column({ default: () => [0], nullable: true }) eeqcamionetas: string;
  @Column({ default: () => [0], nullable: true }) eeqmaquinariapesada: string;
  @Column({ default: () => [0], nullable: true })
  consejoprovincialdepichinchapersonas: string;
  @Column({ default: () => [0], nullable: true })
  consejoprovincialdepichinchacamionetas: string;
  @Column({ default: () => [0], nullable: true })
  consejoprovincialdepichinchavolquetas: string;
  @Column({ default: () => [0], nullable: true })
  consejoprovincialdepichinchamaquinariapesada: string;
  @Column({ default: () => [0], nullable: true }) panavialpersonas: string;
  @Column({ default: () => [0], nullable: true }) panavialcamionetas: string;
  @Column({ default: () => [0], nullable: true }) panavialvolquetas: string;
  @Column({ default: () => [0], nullable: true })
  panavialmaquinariapesada: string;
  @Column({ default: () => [0], nullable: true }) panavialambulanciasA: string;
  @Column({ default: () => [0], nullable: true })
  ministeriodeobraspublicaspersonas: string;
  @Column({ default: () => [0], nullable: true })
  ministeriodeobraspublicascamionetas: string;
  @Column({ default: () => [0], nullable: true })
  ministeriodeobraspublicasvolquetas: string;
  @Column({ default: () => [0], nullable: true })
  ministeriodeobraspublicasmaquinariapesada: string;
  @Column({ default: () => [0], nullable: true })
  policianacionalpersonas: string;
  @Column({ default: () => [0], nullable: true })
  policianacionalambulanciasA: string;
  @Column({ default: () => [0], nullable: true }) policianacionalmotos: string;
  @Column({ default: () => [0], nullable: true }) policianacionalbuses: string;
  @Column({ default: () => [0], nullable: true })
  policianacionalcamiones: string;
  @Column({ default: () => [0], nullable: true })
  policianacionalpatrullas: string;
  @Column({ default: () => [0], nullable: true })
  policianacionalcanteras: string;
  @Column({ default: () => [0], nullable: true })
  policianacionalhelipcopteros: string;
  @Column({ default: () => [0], nullable: true })
  policianacionalequinos: string;
  @Column({ default: () => [0], nullable: true }) policianacionalgir: string;
  @Column({ default: () => [0], nullable: true }) policianacionalgoe: string;
  @Column({ default: () => [0], nullable: true })
  fuerzasarmadaspersonas: string;
  @Column({ default: () => [0], nullable: true })
  fuerzasarmadascamionetas: string;
  @Column({ default: () => [0], nullable: true })
  fuerzasarmadasvolquetas: string;
  @Column({ default: () => [0], nullable: true })
  fuerzasarmadasmaquinariapesada: string;
  @Column({ default: () => [0], nullable: true })
  fuerzasarmadastanquerosT: string;
  @Column({ default: () => [0], nullable: true }) fuerzasarmadasbuses: string;
  @Column({ default: () => [0], nullable: true })
  fuerzasarmadascamiones: string;
  @Column({ default: () => [0], nullable: true })
  fuerzasarmadashelipcopteros: string;
  @Column({ default: () => [0], nullable: true }) fuerzasarmadasjeeps: string;
  @Column({ default: () => [0], nullable: true }) fuerzasarmadasaviones: string;
  @Column({ default: () => [0], nullable: true })
  fuerzasarmadasgruposderescate: string;
  @Column({ default: () => [0], nullable: true }) iesspersonas: string;
  @Column({ default: () => [0], nullable: true }) iessambulanciasA: string;
  @Column({ default: () => [0], nullable: true }) dmgrpersonas: string;
  @Column({ default: () => [0], nullable: true }) dmgrcamionetas: string;
  @Column({ default: () => [0], nullable: true }) siatpersonas: string;
  @Column({ default: () => [0], nullable: true }) siatvehiculos: string;
  @Column({ default: () => [0], nullable: true }) imppersonas: string;
  @Column({ default: () => [0], nullable: true }) impcamiones: string;

  @OneToMany(() => SectoresEntity, sectores => sectores.emergencia)
  sectores: SectoresEntity;

  @OneToMany(
    () => PersonasAfectadasEntity,
    personasafectadas => personasafectadas.emergencia,
  )
  personasafectadas: EmergenciaEntity;

  @OneToMany(() => RecursosEntity, recursos => recursos.emergencia)
  recursos: RecursosEntity;
}
