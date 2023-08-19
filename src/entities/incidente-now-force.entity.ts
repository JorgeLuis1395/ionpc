import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Ciudadano } from './ciudadadano.entity';
import { AsistenciaFamilia } from './asistencia-familia.entity';
import { DanioMaterial } from './danio-material.entity';
import { Factura } from './factura.entity';
import { PersonalIncidenteFE } from './personalIncidenteFE.entity';
import { LicenciamientoDatos } from './licenciamientoF.entity';
import { EspacioPublicoDatos } from './espacioPublicoF.entity';
import { BioseguridadDatos } from './bioseguridadF.entity';
import { ResiduosSolidosDatos } from './residuosSolidosF.entity';
import { FaunaDatos } from './faunaF.entity';
import { ConstruccionesDatos } from './construccionesF.entity';

export type IncidenteNowForceDocument = IncidenteNowForce & Document;

@Schema()
export class IncidenteNowForce {
    @Prop({ unique: true })
    id: string;

    @Prop()
    Fecha:string ;

    @Prop()
    descripcion?:string;

    @Prop()
    fondoEmergencia: boolean;

    @Prop()
    fondoEmergenciaCod: number;

    @Prop()
    fechaLlamadaFec?:string;

    @Prop()
    fechaLlamadaHor?:string;

    @Prop()
    fechaDespachoFec?:string;

    @Prop()
    fechaDespachoHor?:string;

    @Prop()
    zona:string;

    @Prop()
    fechaArriboRecursosFec?:string;

    @Prop()
    fechaArriboRecursosHor?:string;

    @Prop()
    fechaFinalizacionFec?:string;

    @Prop()
    fechaFinalizacionHor?:string;

    @Prop()
    tipo:string;

    @Prop()
    tipoCod: number;

    @Prop()
    tipoCodAnt: number;

    @Prop()
    subtipo?:string;

    @Prop()
    subtipoCod:string;

    @Prop()
    subtipoCodAnt: number;

    @Prop()
    semaforo?:string;

    @Prop()
    simbolo:string;

    @Prop()
    colorItem:string;

    @Prop()
    fechaEmergenciaFec:string;

    @Prop()
    fechaInspeccion:string;

    @Prop()
    fichaEcu?:string;

    @Prop()
    fechaLlamada?:string;

    @Prop()
    fechaDespacho?:string;

    @Prop()
    fechaArriboRecursos?:string;

    @Prop()
    fechaFinalizacion?:string;

    @Prop()
    reportadoPor?:string;

    @Prop()
    reportadoPorCodAnt:string;

    @Prop()
    movimientovolumen:string;

    @Prop()
    movimientoniveldeevento:string;

    @Prop()
    movimientomovilidadviasprioritarias:string;

    @Prop()
    inundacionescalado:string;

    @Prop()
    inundacionescausa:string;

    @Prop()
    inundacionesafectacionesmovilidad:string;

    @Prop()
    inundacionesniveldeevento:string;

    @Prop()
    incendioarea:string;

    @Prop()
    indenciohectareas:string;

    @Prop()
    incendiomaterialescombustibles?:string;

    @Prop()
    indencionivelevento:string;

    @Prop()
    categoriaDia:string;

    @Prop()
    categoriaDiaCodAnt:string;

    @Prop()
    aguapotable:string;

    @Prop()
    alcantarillado:string;

    @Prop()
    areasnaturalesprotegidasybosquesprotectores:string;

    @Prop()
    educacion:string;

    @Prop()
    energiaehidrocarburos:string;

    @Prop()
    estatal:string;

    @Prop()
    instalacionesdeprimerarespuesta:string;

    @Prop()
    municipal:string;

    @Prop()
    patrimonial:string;

    @Prop()
    privado:string;

    @Prop()
    salud:string;

    @Prop()
    seguridad:string;

    @Prop()
    telecomunicaciones:string;

    @Prop()
    transporte:string;

    @Prop()
    coepersonas?:string;

    @Prop()
    coecamionetas?:string;

    @Prop()
    coevolquetas?:string;

    @Prop()
    coeminicargadoras?:string;

    @Prop()
    coeretroescavadoras?:string;

    @Prop()
    coemaquinariapesada?:string;

    @Prop()
    cbqpersonas?:string;

    @Prop()
    cbqcamionetas?:string;

    @Prop()
    cbqestaciones?:string;

    @Prop()
    cbqambulanciasA?:string;

    @Prop()
    cbqautobombasB?:string;

    @Prop()
    cbqtanquerosT?:string;

    @Prop()
    cbqunidadesderescate?:string;

    @Prop()
    cbqmotos?:string;

    @Prop()
    cbqunidaddematerialespeligrosos?:string;

    @Prop()
    cbqunidaddefuerzadetarea?:string;

    @Prop()
    cbqbuses?:string;

    @Prop()
    cbqhelipcopteros?:string;

    @Prop()
    cbqpolivalente?:string;

    @Prop()
    cbqdarly?:string;

    @Prop()
    cbqnodriza?:string;

    @Prop()
    cbqunimog?:string;

    @Prop()
    msppersonas?:string;

    @Prop()
    mspambulanciasA?:string;

    @Prop()
    cruzrojapersonas?:string;

    @Prop()
    cruzrojaambulanciasA?:string;

    @Prop()
    cacmpersonas?:string;

    @Prop()
    cacmcamionetas?:string;

    @Prop()
    cacmmotos?:string;

    @Prop()
    cacmbuses?:string;

    @Prop()
    cacmcanters?:string;

    @Prop()
    cacmvehiculos?:string;

    @Prop()
    cacmgruposderescate?:string;

    @Prop()
    amtpersonas?:string;

    @Prop()
    amtcamionetas?:string;

    @Prop()
    amtmotos?:string;

    @Prop()
    amcpersonas?:string;

    @Prop()
    amcvehiculos?:string;

    @Prop()
    epmapspersonas?:string;

    @Prop()
    epmapscamionetas?:string;

    @Prop()
    epmapsvolquetas?:string;

    @Prop()
    epmapsmaquinariapesada?:string;

    @Prop()
    epmapstanquerosT?:string;

    @Prop()
    epmapshidrosuccionadores?:string;

    @Prop()
    epmapseductores?:string;

    @Prop()
    epmmoppersonas?:string;

    @Prop()
    epmmopcamionetas?:string;

    @Prop()
    epmmopvolquetas?:string;

    @Prop()
    epmmopminicargadoras?:string;

    @Prop()
    epmmopmaquinariapesada?:string;

    @Prop()
    epmmoptanquerosT?:string;

    @Prop()
    emaseopersonas?:string;

    @Prop()
    emaseocamionetas?:string;

    @Prop()
    emaseovolquetas?:string;

    @Prop()
    emaseomaquinariapesada?:string;

    @Prop()
    emgirspersonas?:string;

    @Prop()
    emgirscamionetas?:string;

    @Prop()
    emgirsvolquetas?:string;

    @Prop()
    emgirsmaquinariapesada?:string;

    @Prop()
    administracioneszonalespersonas?:string;

    @Prop()
    administracioneszonalescamionetas?:string;

    @Prop()
    administracioneszonalesvolquetas?:string;

    @Prop()
    administracioneszonalesmaquinariapesada?:string;

    @Prop()
    eeqpersonas?:string;

    @Prop()
    eeqcamionetas?:string;

    @Prop()
    eeqmaquinariapesada?:string;

    @Prop()
    consejoprovincialdepichinchapersonas?:string;

    @Prop()
    consejoprovincialdepichinchacamionetas?:string;

    @Prop()
    consejoprovincialdepichinchavolquetas?:string;

    @Prop()
    consejoprovincialdepichinchamaquinariapesada?:string;

    @Prop()
    panavialpersonas?:string;

    @Prop()
    panavialcamionetas?:string;

    @Prop()
    panavialvolquetas?:string;

    @Prop()
    panavialmaquinariapesada?:string;

    @Prop()
    panavialambulanciasA?:string;

    @Prop()
    ministeriodeobraspublicaspersonas?:string;

    @Prop()
    ministeriodeobraspublicascamionetas?:string;

    @Prop()
    ministeriodeobraspublicasvolquetas?:string;

    @Prop()
    ministeriodeobraspublicasmaquinariapesada?:string;

    @Prop()
    policianacionalpersonas?:string;

    @Prop()
    policianacionalambulanciasA?:string;

    @Prop()
    policianacionalmotos?:string;

    @Prop()
    policianacionalbuses?:string;

    @Prop()
    policianacionalcamiones?:string;

    @Prop()
    policianacionalpatrullas?:string;

    @Prop()
    policianacionalcanteras?:string;

    @Prop()
    policianacionalhelipcopteros?:string;

    @Prop()
    policianacionalequinos?:string;

    @Prop()
    policianacionalgir?:string;

    @Prop()
    policianacionalgoe?:string;

    @Prop()
    fuerzasarmadaspersonas?:string;

    @Prop()
    fuerzasarmadascamionetas?:string;

    @Prop()
    fuerzasarmadasvolquetas?:string;

    @Prop()
    fuerzasarmadasmaquinariapesada?:string;

    @Prop()
    fuerzasarmadastanquerosT?:string;

    @Prop()
    fuerzasarmadasbuses?:string;

    @Prop()
    fuerzasarmadascamiones?:string;

    @Prop()
    fuerzasarmadashelipcopteros?:string;

    @Prop()
    fuerzasarmadasjeeps?:string;

    @Prop()
    fuerzasarmadasaviones?:string;

    @Prop()
    fuerzasarmadasgruposderescate?:string;

    @Prop()
    iesspersonas?:string;

    @Prop()
    iessambulanciasA?:string;

    @Prop()
    dmgrpersonas?:string;

    @Prop()
    dmgrcamionetas?:string;

    @Prop()
    siatpersonas?:string;

    @Prop()
    siatvehiculos?:string;

    @Prop()
    imppersonas?:string;

    @Prop()
    impcamiones?:string;

    @Prop()
    botton1:string;

    @Prop()
    botton:string;

    @Prop([Ciudadano])
    cidadanos: Ciudadano[];

    @Prop()
    numpersonasafectada:string ;

    @Prop()
    numeroViviendasAfectadas?:string;

    @Prop()
    numeroViviendasAfectadasPatrimoniales?:string;

    @Prop()
    numeroViviendasDestruidas?:string;

    @Prop()
    numeroViviendasDestruidasPatrimoniales?:string;

    @Prop([AsistenciaFamilia])
    arregloAsitenciaFamilia: AsistenciaFamilia[];

    @Prop()
    nombreIncidenteGFI:string;

    @Prop()
    ascistenciabasicainicialGF: boolean;

    @Prop()
    ascistenciabasicainicialValorGF: number;

    @Prop()
    bienesMueblesGF: boolean;

    @Prop()
    bienesMueblesValorGF: number;

    @Prop()
    bienesInMueblesGF: boolean;

    @Prop()
    bienesInMueblesValorGF: number;

    @Prop()
    gastosMortuoriosGF: boolean;

    @Prop()
    gastosMortuoriosValorGF: number;

    @Prop()
    suministrosMaterialesGF: boolean;

    @Prop()
    suministrosMaterialesValorGF: number;

    @Prop()
    cuadrillasDeEmergenciaGF: boolean;

    @Prop()
    cuadrillasDeEmergenciaValorGF: number;

    @Prop()
    asistenciaAlSISGF:string;

    @Prop()
    cantidadAsistenciaAlSISGF: number;

    @Prop()
    barrio:string;

    @Prop()
    administracioZonal:string;

    @Prop()
    parroquia:string;

    @Prop()
    barrioCod:string;

    @Prop()
    administracioZonalCod: string;

    @Prop()
    parroquiaCod: string;

    @Prop()
    latitud: number;

    @Prop()
    longitud: number;

    @Prop([DanioMaterial])
    daniosMateriales: DanioMaterial[];

    @Prop()
    accionesRealizadas?:string;

    @Prop()
    recomendaciones?:string;

    @Prop()
    direccion:string;

    @Prop()
    calles:string;

    @Prop()
    coordenadaX:string;

    @Prop()
    coordenadaY:string;

    @Prop()
    nombreDiaCodAnt?: string;

    @Prop()
    estadoEmergencia: string;

    @Prop()
    diffDespachoArribo:string;

    @Prop()
    diffLlamadaDespacho:string;

    @Prop()
    diffLlamadaFinalizacion:string;

    @Prop()
    referencia:string;

    @Prop()
    estadoEmergenciaCodAnt: number;

    @Prop()
    numfamiliasafectada:string;

    @Prop()
    nombresafectada:string;

    @Prop()
    edadesafectada:string;

    @Prop()
    generosafectada:string;

    @Prop()
    numpersonasevacuada:string ;

    @Prop()
    numfamiliasevacuada:string;

    @Prop()
    nombresevacuada:string;

    @Prop()
    edadesevacuada:string;

    @Prop()
    generosevacuada:string;

    @Prop()
    numpersonasdamnificada:string;

    @Prop()
    numfamiliasdamnificada:string;

    @Prop()
    nombresdamnificada:string ;

    @Prop()
    edadesdamnificada:string;

    @Prop()
    generosdamnificada:string;

    @Prop()
    numpersonasenfamiliaacogiente:string ;

    @Prop()
    numfamiliasenfamiliaacogiente:string;

    @Prop()
    nombresenfamiliaacogiente:string;

    @Prop()
    edadesenfamiliaacogiente:string;

    @Prop()
    generosenfamiliaacogiente:string;

    @Prop()
    numpersonasreubicadas:string ;

    @Prop()
    numfamiliasreubicadas:string;

    @Prop()
    nombresreubicadas:string;

    @Prop()
    edadesreubicadas:string;

    @Prop()
    generosreubicadas:string;

    @Prop()
    numpersonasdesaparecido:string ;

    @Prop()
    numfamiliasdesaparecido:string;

    @Prop()
    nombresdesaparecido:string;

    @Prop()
    edadesdesaparecido:string;

    @Prop()
    generosdesaparecido:string;

    @Prop()
    numpersonasalbergada:string;

    @Prop()
    numfamiliasalbergada:string;

    @Prop()
    nombresalbergada:string;

    @Prop()
    edadesalbergada:string;

    @Prop()
    generosalbergada:string;

    @Prop()
    alberguealbergada:string;

    @Prop()
    numpersonasheridos:string;

    @Prop()
    numfamiliasheridos:string;

    @Prop()
    nombresheridos:string;

    @Prop()
    edadesheridos:string;

    @Prop()
    generosheridos:string;

    @Prop()
    medicoheridos:string;

    @Prop()
    casasaludheridos:string;

    @Prop()
    diagnosticoheridos:string;

    @Prop()
    albergueheridos:string;

    @Prop()
    numpersonasfallecidos:string ;

    @Prop()
    numfamiliasfallecidos:string;

    @Prop()
    nombresfallecidos:string;

    @Prop()
    edadesfallecidos:string;

    @Prop()
    generosfallecidos:string;

    @Prop()
    medicofallecidos:string;

    @Prop()
    casasaludfallecidos:string;

    @Prop()
    diagnosticofallecidos:string;

    @Prop()
    alberguefallecidos:string;

    @Prop()
    numpersonasnacionalesdesaparecidas:string;

    @Prop()
    numpersonasextranjerasdesaparecidas:string;

    @Prop()
    numeroFaunaUrbana:string;

    @Prop()
    imagenNowforce:string;

    @Prop()
    recursos?:string;

    @Prop()
    recomendacionesFE?:string;

    @Prop()
    accionesRealizadasFE?:string;

    @Prop()
    imagenFE1?:string;

    @Prop()
    imagenFE2?:string;

    @Prop()
    imagenF33?:string;

    @Prop()
    foto1?:string;

    @Prop()
    foto2?:string;

    @Prop()
    foto3?:string;

    @Prop([Factura])
    factura: Factura[];

    @Prop()
    nombreResponsableFE?:string;

    @Prop()
    cargoResponsableFE?:string;

    @Prop()
    responsabilidadResponsableFE?:string;

    @Prop()
    firmaResponsableFE?:string;

    @Prop()
    nombreAprobacionFE?:string;

    @Prop()
    cargoAprobacionFE?:string;

    @Prop()
    responsabilidadAprobacionFE?:string;

    @Prop()
    firmaAprobacionFE?:string;

    @Prop([PersonalIncidenteFE])
    personalIncidenteFE: PersonalIncidenteFE[];

    @Prop()
    amt?:string;
    @Prop()
    fecha1Llamada?:string;
    @Prop()
    fecha2Despacho?:string;
    @Prop()
    fecha3ArriboRecurso?:string;
    @Prop()
    fecha4Finalizacion?:string;
    @Prop()
    seguimientoAmt?:string;

    @Prop()
    reportadoPorAmc?:string;

    @Prop()
    exhortoVerbalCheckA?:string;
    @Prop()

    numExhortoVerbalA?:string;
    @Prop()

    exhortoEscritoCheckA?:string;
    @Prop()

    numExhortoEscritoA?:string;
    @Prop()

    cintaAreaControlCheckA?:string;
    @Prop()

    cintaAreaControlValorA?:string;
    @Prop()

    selloSuspencionCheckA?:string;
    @Prop()

    numSelloObraA?:string;
    @Prop()

    selloClausuraCheckA?:string;
    @Prop()

    numSello1A?:string;
    @Prop()

    actuacionesInicioCheckA?:string;
    @Prop()

    numActosA?:string;
    @Prop()

    actuacionesPreviasCheckA?:string;
    @Prop()

    numActuacionesA?:string;
    @Prop()

    retencionesCheckA?:string;
    @Prop()

    numActaRetencionesA?:string;
    @Prop()

    producto1CheckA?:string;
    @Prop()

    producto1NombreA?:string;
    @Prop()

    numRetencionesProducto1A?:string;
    @Prop()

    producto2CheckA?:string;
    @Prop()

    producto2NombreA?:string;
    @Prop()

    numRetencionesProducto2A?:string;
    @Prop()

    producto3CheckA?:string;
    @Prop()

    producto3NombreA?:string;
    @Prop()

    numRetencionesProducto3A?:string;
    @Prop()

    producto4CheckA?:string;
    @Prop()

    producto4NombreA?:string;
    @Prop()

    numRetencionesProducto4A?:string;
    @Prop()

    producto5CheckA?:string;
    @Prop()

    producto5NombreA?:string;
    @Prop()

    numRetencionesProducto5A?:string;
    @Prop()

    producto6CheckA?:string;
    @Prop()

    producto6NombreA?:string;
    @Prop()

    numRetencionesProducto6A?:string;
    @Prop()

    producto7CheckA?:string;
    @Prop()

    producto7NombreA?:string;
    @Prop()

    numRetencionesProducto7A?:string;
    @Prop()

    producto8CheckA?:string;
    @Prop()

    producto8NombreA?:string;
    @Prop()

    numRetencionesProducto8A?:string;
    @Prop()

    producto9CheckA?:string;
    @Prop()

    producto9NombreA?:string;
    @Prop()

    numRetencionesProducto9A?:string;
    @Prop()

    producto10CheckA?:string;
    @Prop()

    producto10NombreA?:string;
    @Prop()

    numRetencionesProducto10A?:string;
    @Prop()

    nombresAmcFormA?:string;
    @Prop()

    patrullaReaccionCheckA?:string;
    @Prop()

    patrullaReaccionValorA?:string;

    @Prop()

    votaciones?:string;

    @Prop()

    centroControl?:string;

    @Prop()

    enlaceGoogle?:string;

    @Prop()
    subClasificacionEventosAmc?:string;
    @Prop()
    rescateAnimalesAmc?:string;
    @Prop()
    numRescateAnimalesAmc?:string;
    @Prop()
    operativoControlAmc?:string;

    @Prop([LicenciamientoDatos])
    licenciamientoF: LicenciamientoDatos[];
    @Prop([EspacioPublicoDatos])
    espacioPublicoDatosF: EspacioPublicoDatos[];
    @Prop([BioseguridadDatos])
    bioseguridadDatosF: BioseguridadDatos[];
    @Prop([ResiduosSolidosDatos])
    residuosSolidosDatosF: ResiduosSolidosDatos[];
    @Prop([FaunaDatos])
    faunaDatosF: FaunaDatos[];
    @Prop([ConstruccionesDatos])
    construccionesDatosF: ConstruccionesDatos[];

    @Prop()
    emaseo?:string;
    @Prop()
    epmmop?:string;
    @Prop()
    epmaps?:string;
    @Prop()
    eeq?:string;
    @Prop()
    operativo?:string;


    @Prop() locales_inspeccionados?:string;
    @Prop() exhortos_verbales_por_mal_uso_luae?:string;
    @Prop() exhortos_verbales_por_no_tener_luae?:string;
    @Prop() exhortos_escritos_por_mal_uso_luae?:string;
    @Prop() exhortos_escritos_por_no_tener_luae?:string;
    @Prop() actos_de_inicio_por_mal_uso_luae?:string;
    @Prop() actos_de_inicio_por_no_tener_luae?:string;
    @Prop() sellos_clausura_establecimiento?:string;
    @Prop() fiestas_clandestinas?:string;
    @Prop() night_clubs?:string;
    @Prop() canchas_deportivas?:string;
    @Prop() parques_intervenidos?:string;
    @Prop() discotecas?:string;
    @Prop() galleras?:string;
    @Prop() corridas_de_toros?:string;
    @Prop() personas_aglomeradas_disuadidas_bioseguridad?:string;
    @Prop() exhortos_verbales_por_distanciamiento?:string;
    @Prop() exhortos_verbales_por_mascarilla?:string;
    @Prop() exhortos_escritos_por_distanciamiento?:string;
    @Prop() actos_de_inicio_por_distanciamiento?:string;
    @Prop() actos_de_inicio_por_mascarilla?:string;
    @Prop() personas_aglomeradas_disuadidas?:string;
    @Prop() exhortos_verbales_por_normas_bioseguridad?:string;
    @Prop() exhortos_escritos_por_normas_bioseguridad?:string;
    @Prop() actos_de_inicio_por_normas_bioseguridad?:string;
    @Prop() pucas_revisados?:string;
    @Prop() ventas_informales_retiradas?:string;
    @Prop() actos_inicio_ventas_informales?:string;
    @Prop() libadores_retirados?:string;
    @Prop() actos_inicio_libadores?:string;
    @Prop() bebidas_alcoholicas_destruidas?:string;
    @Prop() exhortos_por_mal_uso_espacio_publico?:string;
    @Prop() actos_de_inicio_por_mal_uso_espacio_publico?:string;
    @Prop() fecha_inicio_op?:string;
    @Prop() fecha_fin_op?:string;
    @Prop() nombre_producto_1?:string;
    @Prop() numero_producto_1?:string;
    @Prop() nombre_producto_2?:string;
    @Prop() numero_producto_2?:string;
    @Prop() nombre_producto_3?:string;
    @Prop() numero_producto_3?:string;
    @Prop() nombre_producto_4?:string;
    @Prop() numero_producto_4?:string;
    @Prop() nombre_producto_5?:string;
    @Prop() numero_producto_5?:string;
    @Prop() nombre_producto_6?:string;
    @Prop() numero_producto_6?:string;
    @Prop() nombre_producto_7?:string;
    @Prop() numero_producto_7?:string;
    @Prop() nombre_producto_8?:string;
    @Prop() numero_producto_8?:string;
    @Prop() nombre_producto_9?:string;
    @Prop() numero_producto_9?:string;
    @Prop() nombre_producto_10?:string;
    @Prop() numero_producto_10?:string;
    @Prop() seguimiento_op?:string;
    @Prop() foto1_op?:string;
    @Prop() foto2_op?:string;
    @Prop() foto3_op?:string;


    @Prop() numero_personas_aglomeradas_disuadidas?:string;
    @Prop() numero_exhortos_verbales_por_distanciamiento?:string;
    @Prop() numero_exhortos_verbales_por_mascarilla?:string;
    @Prop() numero_ventas_informales_retiradas?:string;
    @Prop() numero_libadores_retirados?:string;
    @Prop() numero_bebidas_alcoholicas_destruidas?:string;
    @Prop() numero_grafiteros?:string;
    @Prop() numero_puntos_humedos?:string;
    @Prop() numero_informacion_turistica?:string;
    @Prop() numero_informacion_ciudadana?:string;
    @Prop() numero_victima_en_contra_del_pudor?:string;
    @Prop() numero_primeros_auxilios?:string;
    @Prop() numero_retenciones_presuntos_delincuentes?:string;
    @Prop() seguimiento_cacm?:string;
    @Prop() fotografia_1_cacm?:string;
    @Prop() fotografia_2_cacm?:string;
    @Prop() fotografia_3_cacm?:string;
    @Prop() fecha_inicio_cacm?:string;
    @Prop() fecha_fin_cacm?:string;

    @Prop() secretariaseguridadriesgos?:string;
    @Prop() secretariaseguridadgobernabilidad?:string;
    @Prop() secretariaseguridadseguridad?:string;
    @Prop() antrecursospersonas?:string;
    @Prop() tenenciapoliticapersonas?:string;
    @Prop() antrecursosvehiculos?:string;
    @Prop() tenenciapoliticavehiculos?:string;
    @Prop() policianacionalupma?:string;
    @Prop() policianacionaldinapen?:string;
    @Prop() policianacionalmigracion?:string;
    @Prop() policianacionalumo?:string;
    @Prop() policianacionalgom:string;
    @Prop() policianacionalintendencia?:string;

    @Prop() apoyo_seguridadAmc?:string;
    @Prop() incumplimientoToqueQuedaAmc?:string;
    @Prop() recintosInspecionados_cacm?:string;
    @Prop() incumplimientoToqueQueda_cacm?:string;
    @Prop() fiestasClandestinas_cacm?:string;

}

export const IncidenteNowForceSchema = SchemaFactory.createForClass(IncidenteNowForce);
