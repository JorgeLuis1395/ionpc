import { IsDate, IsNumber, IsString } from 'class-validator';

export class CrearInicidenteNowForceDto {
  @IsDate()
  readonly fechaEmergencia: Date;

  @IsString()
  readonly subtipo: string;

  @IsString()
  readonly barrio: string;

  @IsNumber()
  readonly latitud: number;

  @IsNumber()
  readonly longitud: number;

  @IsString()
  readonly descripcion: string;

  @IsString()
  readonly estadoEmergencia: string;

  @IsString()
  readonly reportadoPor: string;

  @IsString()
  readonly activo: string;

  @IsDate()
  readonly fechaFinalizacion: Date;

  @IsDate()
  readonly fechaArriboRecursos: Date;

  @IsDate()
  readonly fechaLlamada: Date;

  @IsDate()
  readonly fechaDespacho: Date;

  @IsNumber()
  readonly valor: number;

  @IsNumber()
  readonly unidadMedida: number;

  @IsString()
  readonly nivelEvento: string;

  @IsNumber()
  readonly diasMovilidad: number;

  @IsString()
  readonly materiales: string;

  @IsNumber()
  readonly valorConvertido: number;

  @IsNumber()
  readonly unidadMedidaConvertida: number;

  @IsString()
  readonly fichaEcu: string;

  @IsString()
  readonly calles: string;

  @IsNumber()
  readonly afectacionesMovilidad: number;

  @IsNumber()
  readonly numeroViviendasAfectadas: number;

  @IsNumber()
  readonly numeroViviendasAfectadasPatrimoniales: number;

  @IsNumber()
  readonly numeroViviendasDestruidas: number;

  @IsNumber()
  readonly numeroViviendasDestruidasPatrimoniales: number;

  @IsNumber()
  readonly numeroFaunaUrbana: number;

  @IsNumber()
  readonly fondoEmergencia: boolean;

  @IsNumber()
  readonly semaforo: number;

  @IsNumber()
  readonly causaPrincipal: number;

  @IsNumber()
  readonly inundacionesCalado: number;

  @IsString()
  readonly inundacionesCausa: string;

  @IsString()
  readonly inundacionesAfectacionesMovilidad: string;

  @IsNumber()
  readonly inundacionesNivelEvento: number;

  @IsNumber()
  readonly movimientoVolumen: number;

  @IsString()
  readonly movimientoMovilidadViasPrioritarias: string;

  @IsNumber()
  readonly movimientoNivelEvento: number;

  @IsNumber()
  readonly incendioArea: number;

  @IsNumber()
  readonly indencioHectareas: number;

  @IsString()
  readonly incendioMaterialesCombustibles: string;

  @IsNumber()
  readonly indencioNivelEvento: number;

  @IsNumber()
  readonly aguaPotable: boolean;

  @IsNumber()
  readonly alcantarillado: boolean;

  @IsNumber()
  readonly areasNaturalesProtegidasYBosquesProtectores: number;

  @IsNumber()
  readonly educacion: boolean;

  @IsNumber()
  readonly energiaEHidrocarburos: boolean;

  @IsNumber()
  readonly estatal: boolean;

  @IsNumber()
  readonly instalacionesDePrimeraRespuesta: boolean;

  @IsNumber()
  readonly municipal: boolean;

  @IsNumber()
  readonly patrimonial: boolean;

  @IsNumber()
  readonly privado: boolean;

  @IsNumber()
  readonly salud: boolean;

  @IsNumber()
  readonly seguridad: boolean;

  @IsNumber()
  readonly telecomunicaciones: boolean;

  @IsNumber()
  readonly transporte: boolean;

  @IsNumber()
  readonly numeroPersonasAfectadas: number;

  @IsNumber()
  readonly numeroFamiliasAfectadas: number;

  @IsString()
  readonly nombresAfectada: string;

  @IsString()
  readonly edadesAfectada: string;

  @IsString()
  readonly generosafectada: string;

  @IsNumber()
  readonly numeroPersonasEvacuada: number;

  @IsNumber()
  readonly numeroFamiliasEvacuada: number;

  @IsString()
  readonly nombresEvacuada: string;

  @IsString()
  readonly edadesEvacuada: string;

  @IsString()
  readonly generosEvacuada: string;

  @IsNumber()
  readonly numeroPersonasDamnificada: number;

  @IsNumber()
  readonly numeroFamiliasDamnificada: number;

  @IsString()
  readonly nombresDamnificada: string;

  @IsString()
  readonly edadesDamnificada: string;

  @IsString()
  readonly generosDamnificada: string;

  @IsNumber()
  readonly numeroPersonasEnFamiliaAcogiente: number;

  @IsNumber()
  readonly numeroFamiliasEnFamiliaAcogiente: number;

  @IsString()
  readonly nombresenfamiliaacogiente: string;

  @IsString()
  readonly edadesenfamiliaacogiente: string;

  @IsString()
  readonly generosenfamiliaacogiente: string;

  @IsNumber()
  readonly numeroPersonasReubicadas: number;

  @IsNumber()
  readonly numeroFamiliasReubicadas: number;

  @IsString()
  readonly nombresReubicadas: string;

  @IsString()
  readonly edadesReubicadas: string;

  @IsString()
  readonly generosReubicadas: string;

  @IsNumber()
  readonly numeroPersonasDesaparecido: number;

  @IsNumber()
  readonly numeroFamiliasDesaparecido: number;

  @IsString()
  readonly nombresDesaparecido: string;

  @IsString()
  readonly edadesdesaparecido: string;

  @IsString()
  readonly generosdesaparecido: string;

  @IsNumber()
  readonly numeroPersonasAlbergada: number;

  @IsNumber()
  readonly numeroFamiliasAlbergada: number;

  @IsString()
  readonly nombresAlbergada: string;

  @IsString()
  readonly edadesAlbergada: string;

  @IsString()
  readonly generosAlbergada: string;

  @IsString()
  readonly albergueAlbergada: string;

  @IsNumber()
  readonly numeroPersonasHeridos: number;

  @IsNumber()
  readonly numeroFamiliasHeridos: number;

  @IsString()
  readonly nombresheridos: string;

  @IsString()
  readonly edadesheridos: string;

  @IsString()
  readonly generosheridos: string;

  @IsString()
  readonly medicoHeridos: string;

  @IsString()
  readonly casaSaludHeridos: string;

  @IsString()
  readonly diagnosticoHeridos: string;

  @IsString()
  readonly albergueHeridos: string;

  @IsNumber()
  readonly numeroPersonasFallecidos: number;

  @IsNumber()
  readonly numeroFamiliasFallecidos: number;

  @IsString()
  readonly nombresFallecidos: string;

  @IsString()
  readonly edadesfallecidos: string;

  @IsString()
  readonly generosFallecidos: string;

  @IsString()
  readonly medicoFallecidos: string;

  @IsString()
  readonly casaSaludFallecidos: string;

  @IsString()
  readonly diagnosticoFallecidos: string;

  @IsString()
  readonly albergueFallecidos: string;

  @IsNumber()
  readonly numeroPersonasNacionalesDesaparecidas: number;

  @IsNumber()
  readonly numeroPersonasExtranjerasDesaparecidas: number;

  @IsNumber()
  readonly coePersonas: number;

  @IsNumber()
  readonly coeCamionetas: number;

  @IsNumber()
  readonly coeVolquetas: number;

  @IsNumber()
  readonly coeMinicargadoras: number;

  @IsNumber()
  readonly coeRetroescavadoras: number;

  @IsNumber()
  readonly coeMaquinariapesada: number;

  @IsNumber()
  readonly cbqPersonas: number;

  @IsNumber()
  readonly cbqCamionetas: number;

  @IsNumber()
  readonly cbqEstaciones: number;

  @IsNumber()
  readonly cbqAmbulanciasA: number;

  @IsNumber()
  readonly cbqAutobombasB: number;

  @IsNumber()
  readonly cbqTanquerosT: number;

  @IsNumber()
  readonly cbqUnidadesDeRescate: number;

  @IsNumber()
  readonly cbqMotos: number;

  @IsNumber()
  readonly cbqUnidadDeMaterialesPeligrosos: number;

  @IsNumber()
  readonly cbqUnidadDeFuerzaDeTarea: number;

  @IsNumber()
  readonly cbqBuses: number;

  @IsNumber()
  readonly cbqHelipcopteros: number;

  @IsNumber()
  readonly mspPersonas: number;

  @IsNumber()
  readonly mspAmbulanciasA: number;

  @IsNumber()
  readonly cruzRojaPersonas: number;

  @IsNumber()
  readonly cruzRojaAmbulanciasA: number;

  @IsNumber()
  readonly cacmPersonas: number;

  @IsNumber()
  readonly cacmCamionetas: number;

  @IsNumber()
  readonly cacmMotos: number;

  @IsNumber()
  readonly cacmBuses: number;

  @IsNumber()
  readonly cacmCanters: number;

  @IsNumber()
  readonly cacmVehiculos: number;

  @IsNumber()
  readonly cacmgruposderescate: number;

  @IsNumber()
  readonly amtPersonas: number;

  @IsNumber()
  readonly amtCamionetas: number;

  @IsNumber()
  readonly amtMotos: number;

  @IsNumber()
  readonly amcPersonas: number;

  @IsNumber()
  readonly amcVehiculos: number;

  @IsNumber()
  readonly epmapsPersonas: number;

  @IsNumber()
  readonly epmapsCamionetas: number;

  @IsNumber()
  readonly epmapsVolquetas: number;

  @IsNumber()
  readonly epmapsMaquinariapesada: number;

  @IsNumber()
  readonly epmapsTanquerosT: number;

  @IsNumber()
  readonly epmapsHidrosuccionadores: number;

  @IsNumber()
  readonly epmapsEductores: number;

  @IsNumber()
  readonly epmmopPersonas: number;

  @IsNumber()
  readonly epmmopCamionetas: number;

  @IsNumber()
  readonly epmmopVolquetas: number;

  @IsNumber()
  readonly epmmopMinicargadoras: number;

  @IsNumber()
  readonly epmmopMaquinariaPesada: number;

  @IsNumber()
  readonly epmmopTanquerosT: number;

  @IsNumber()
  readonly emaseoPersonas: number;

  @IsNumber()
  readonly emaseoCamionetas: number;

  @IsNumber()
  readonly emaseoVolquetas: number;

  @IsNumber()
  readonly emaseoMaquinariaPesada: number;

  @IsNumber()
  readonly emgirsPersonas: number;

  @IsNumber()
  readonly emgirsCamionetas: number;

  @IsNumber()
  readonly emgirsVolquetas: number;

  @IsNumber()
  readonly emgirsMaquinariaPesada: number;

  @IsNumber()
  readonly administracionesZonalesPersonas: number;

  @IsNumber()
  readonly administracionesZonalesCamionetas: number;

  @IsNumber()
  readonly administracionesZonalesVolquetas: number;

  @IsNumber()
  readonly administracionesZonalesMaquinariaPesada: number;

  @IsNumber()
  readonly eeqPersonas: number;

  @IsNumber()
  readonly eeqCamionetas: number;

  @IsNumber()
  readonly eeqMaquinariapesada: number;

  @IsNumber()
  readonly consejoProvincialDePichinchaPersonas: number;

  @IsNumber()
  readonly consejoProvincialDePichinchaCamionetas: number;

  @IsNumber()
  readonly consejoProvincialDePichinchaVolquetas: number;

  @IsNumber()
  readonly consejoProvincialDePichinchaMaquinariaPesada: number;

  @IsNumber()
  readonly panavialPersonas: number;

  @IsNumber()
  readonly panavialCamionetas: number;

  @IsNumber()
  readonly panavialVolquetas: number;

  @IsNumber()
  readonly panavialMaquinariapesada: number;

  @IsNumber()
  readonly panavialAmbulanciasA: number;

  @IsNumber()
  readonly ministerioDeObrasPublicasPersonas: number;

  @IsNumber()
  readonly ministerioDeObrasPublicasCamionetas: number;

  @IsNumber()
  readonly ministerioDeObrasPublicasVolquetas: number;

  @IsNumber()
  readonly ministerioDeObrasPublicasMaquinariaPesada: number;

  @IsNumber()
  readonly policiaNacionalPersonas: number;

  @IsNumber()
  readonly policiaNacionalAmbulanciasA: number;

  @IsNumber()
  readonly policiaNacionalMotos: number;

  @IsNumber()
  readonly policiaNacionalBuses: number;

  @IsNumber()
  readonly policiaNacionalCamiones: number;

  @IsNumber()
  readonly policiaNacionalPatrullas: number;

  @IsNumber()
  readonly policiaNacionalCanteras: number;

  @IsNumber()
  readonly policiaNacionalHelipcopteros: number;

  @IsNumber()
  readonly policiaNacionalEquinos: number;

  @IsNumber()
  readonly policiaNacionalGir: number;

  @IsNumber()
  readonly policiaNacionalGoe: number;

  @IsNumber()
  readonly fuerzasArmadasPersonas: number;

  @IsNumber()
  readonly fuerzasArmadasCamionetas: number;

  @IsNumber()
  readonly fuerzasArmadasVolquetas: number;

  @IsNumber()
  readonly fuerzasArmadasMaquinariaPesada: number;

  @IsNumber()
  readonly fuerzasArmadasTanquerosT: number;

  @IsNumber()
  readonly fuerzasArmadasBuses: number;

  @IsNumber()
  readonly fuerzasArmadasCamiones: number;

  @IsNumber()
  readonly fuerzasArmadasHelipcopteros: number;

  @IsNumber()
  readonly fuerzasArmadasJeeps: number;

  @IsNumber()
  readonly fuerzasArmadasAviones: number;

  @IsNumber()
  readonly fuerzasArmadasGruposDeRescate: number;

  @IsNumber()
  readonly iessPersonas: number;

  @IsNumber()
  readonly iessAmbulanciasA: number;

  @IsNumber()
  readonly dmgrPersonas: number;

  @IsNumber()
  readonly dmgrCamionetas: number;

  @IsNumber()
  readonly siatPersonas: number;

  @IsNumber()
  readonly siatVehiculos: number;

  @IsNumber()
  readonly impPersonas: number;

  @IsNumber()
  readonly impCamiones: number;
}
