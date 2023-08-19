import {HttpService, Injectable, Logger} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import moment = require('moment');
import {IncidenteNowForceService} from '../services/external/incidente-now-force.service';
import {MapaService} from '../services/mapa.service';
import {CatalogoService} from '../services/catalogo.service';
import {IncidenteDataRepository} from '../repositories/mongo/incidente-data.repository';
import {DatosProcesadosTranscityRepository} from '../repositories/mongo/datos-procesados-transcity.repository';


@Injectable()
export class NowForceTimer {
    private readonly logger = new Logger();
    arregloMismosEventos = [];
    idPadres = [];
    nombrePadre = '';
    private salidaSelectFallecido: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly incidenteData: IncidenteDataRepository,
        private readonly datosTrancity: DatosProcesadosTranscityRepository,
        private readonly incidenteNowForceService: IncidenteNowForceService,
        private readonly mapaService: MapaService,
        private readonly catalogoService: CatalogoService,
    ) {

    }

    @Cron(CronExpression.EVERY_MINUTE)
    handleCron() {
        this.consultarIncidente();
        this.logger.debug('Called every 30 seconds');
    }


    async consultarIncidente() {

        const fechaInicio = new Date();
        const fechaFin1 = new Date();
        let fechaFin;
        fechaFin = new Date(fechaFin1.setMinutes(fechaFin1.getMinutes() - 15));
        let auxArregloEventos: any;
        console.log(fechaFin, fechaInicio);
        await this.incidenteData.seleccionarPorFechasActualizacion(fechaFin, fechaInicio).then(async resul => {

            auxArregloEventos = resul;
            /*for (const hijos of auxArregloEventos) {
        if (hijos.evento_padre) {
          this.idPadres.push(hijos.evento_padre);
          await this.consultarHijosPadre(hijos.id, hijos.evento_padre);
        } else {

          this.nombrePadre = hijos.incidente;
          this.idPadres.push(hijos._id);

          await this.consultarPadre(hijos._id);
        }
      }*/

        });

        await this.transformarIncidenteNowForce(auxArregloEventos);

    }


    async transformarIncidenteNowForce(dataIncidentes) {
        console.log(dataIncidentes);
        const dataBarrios = await this.mapaService.selectAll();
        const dataCatalogo = await this.catalogoService.selectAll();


        for (const tipoIncidente of dataIncidentes) {

            let idI = '';
            let latitud = '';
            let longitud = '';
            let direccionI = '';
            let tipoI = '';
            const repordatoPorAMC = '';
            const centroControlI = '';

            const recomendacionesFEI = '';
            const accionesRealizadasFEI = '';
            const imagen1FEI = '';
            const imagen2FEI = '';
            const imagen3FEI = '';
            let imagenOtra1I = '';
            let imagenOtra2I = '';
            let imagenOtra3I = '';
            const nombreResponsableFEI = '';
            const cargoResponsableFEI = '';
            const responsabilidadResponsableFEI = '';
            const firmaResponsableFEI = '';
            const nombreAprobacionFEI = '';
            const cargoAprobacionFEI = '';
            const responsabilidadAprobacionFEI = '';
            const firmaAprobacionFEI = '';
            let descripcionI = '';
            let fondoEmergenciaI = false;
            const fondoEmergenciaCodI = 2;
            let tipoCodI = -1;
            let tipoCodAntI = -1;
            let subtipoI = '';
            let subtipoCodI = '';
            let subtipoCodAntI = 999;
            let semaforoI = '';
            let simbolo = 'warninga.png';
            let colorItem = '';
            let fichaEcuI = '';
            let fechaLlamadaI = '';
            let fechaEmergenciaI;
            let nombreDiaCodAnt: number;
            let fechaEmergenciaHor = '';
            let fechaEmergenciaFec;
            let fechaDespachoI = '';
            let fechaArriboRecursosI = '';
            let fechaFinalizacionI = '';
            let reportadoPorI = '';
            let reportadoPorCodAntI = '';
            let movimientovolumenI = '';
            let auxFechaOtroI = false;
            const movimientoniveldeeventoI = '';
            let movimientomovilidadviasprioritariasI = '';
            let inundacionescaladoI = '';
            let inundacionescausaI = '';
            let inundacionesafectacionesmovilidadI = '';
            const inundacionesniveldeeventoI = '';
            let incendioareaI = '';
            let indenciohectareasI = '';
            let incendiomaterialescombustiblesI = '';
            const indencioniveleventoI = '';
            const categoriaDiaI = '';
            let categoriaDiaCodAntI = '';
            let aguapotableI = '';
            let alcantarilladoI = '';
            let areasnaturalesprotegidasybosquesprotectoresI = '';
            let educacionI = '';
            let energiaehidrocarburosI = '';
            let estatalI = '';
            let instalacionesdeprimerarespuestaI = '';
            let municipalI = '';
            let patrimonialI = '';
            let privadoI = '';
            let saludI = '';
            let seguridadI = '';
            let telecomunicacionesI = '';
            let transporteI = '';
            let coepersonasI = '';
            const coecamionetasI = '';
            const coevolquetasI = '';
            const coeminicargadorasI = '';
            const coeretroescavadorasI = '';
            const coemaquinariapesadaI = '';
            let cbqpersonasI = '';
            const cbqcamionetasI = '';
            const cbqestacionesI = '';
            const cbqambulanciasAI = '';
            const cbqautobombasBI = '';
            const cbqtanquerosTI = '';
            const cbqunidadesderescateI = '';
            const cbqmotosI = '';
            const cbqunidaddematerialespeligrososI = '';
            const cbqunidaddefuerzadetareaI = '';
            const cbqbusesI = '';
            const cbqhelipcopterosI = '';
            const cbqpolivalenteI = '';
            const cbqdarlyI = '';
            const cbqnodrizaI = '';
            const cbqunimogI = '';
            let msppersonasI = '';
            const mspambulanciasAI = '';
            let cruzrojapersonasI = '';
            const cruzrojaambulanciasAI = '';
            let cacmpersonasI = '';
            const cacmcamionetasI = '';
            const cacmmotosI = '';
            const cacmbusesI = '';
            const cacmcantersI = '';
            const cacmvehiculosI = '';
            const cacmgruposderescateI = '';
            let amtpersonasI = '';
            const amtcamionetasI = '';
            const amtmotosI = '';
            let amcpersonasI = '';
            const amcvehiculosI = '';
            let epmapspersonasI = '';
            const epmapscamionetasI = '';
            const epmapsvolquetasI = '';
            const epmapsmaquinariapesadaI = '';
            const epmapstanquerosTI = '';
            const epmapshidrosuccionadoresI = '';
            const epmapseductoresI = '';
            let epmmoppersonasI = '';
            const epmmopcamionetasI = '';
            const epmmopvolquetasI = '';
            const epmmopminicargadorasI = '';
            const epmmopmaquinariapesadaI = '';
            const epmmoptanquerosTI = '';
            let emaseopersonasI = '';
            const emaseocamionetasI = '';
            const emaseovolquetasI = '';
            const emaseomaquinariapesadaI = '';
            let emgirspersonasI = '';
            const emgirscamionetasI = '';
            const emgirsvolquetasI = '';
            const emgirsmaquinariapesadaI = '';
            let administracioneszonalespersonasI = '';
            const administracioneszonalescamionetasI = '';
            const administracioneszonalesvolquetasI = '';
            const administracioneszonalesmaquinariapesadaI = '';
            let eeqpersonasI = '';
            const eeqcamionetasI = '';
            const eeqmaquinariapesadaI = '';
            let consejoprovincialdepichinchapersonasI = '';
            const consejoprovincialdepichinchacamionetasI = '';
            const consejoprovincialdepichinchavolquetasI = '';
            const consejoprovincialdepichinchamaquinariapesadaI = '';
            let panavialpersonasI = '';
            const panavialcamionetasI = '';
            const panavialvolquetasI = '';
            const panavialmaquinariapesadaI = '';
            const panavialambulanciasAI = '';
            let ministeriodeobraspublicaspersonasI = '';
            const ministeriodeobraspublicascamionetasI = '';
            const ministeriodeobraspublicasvolquetasI = '';
            const ministeriodeobraspublicasmaquinariapesadaI = '';
            let policianacionalpersonasI = '';
            const policianacionalambulanciasAI = '';
            const policianacionalmotosI = '';
            const policianacionalbusesI = '';
            const policianacionalcamionesI = '';
            const policianacionalpatrullasI = '';
            const policianacionalcanterasI = '';
            const policianacionalhelipcopterosI = '';
            const policianacionalequinosI = '';
            const policianacionalgirI = '';
            const policianacionalgoeI = '';

            const policianacionalupmaI = '';
            const policianacionaldinapenI = '';
            const policianacionalmigracionI = '';
            const policianacionalumoI = '';
            const policianacionalgomI = '';
            const policianacionalintendenciaI = '';

            const fuerzasarmadaspersonasI = '';
            const fuerzasarmadascamionetasI = '';
            const fuerzasarmadasvolquetasI = '';
            const fuerzasarmadasmaquinariapesadaI = '';
            const fuerzasarmadastanquerosTI = '';
            const fuerzasarmadasbusesI = '';
            const fuerzasarmadascamionesI = '';
            const fuerzasarmadashelipcopterosI = '';
            const fuerzasarmadasjeepsI = '';
            const fuerzasarmadasavionesI = '';
            const fuerzasarmadasgruposderescateI = '';
            let iesspersonasI = '';
            const iessambulanciasAI = '';
            let dmgrpersonasI = '';
            const dmgrcamionetasI = '';
            let siatpersonasI = '';
            const siatvehiculosI = '';
            let imppersonasI = '';
            const impcamionesI = '';

            let secretariaseguridadriesgosI = '';
            let secretariaseguridadgobernabilidadI = '';
            let secretariaseguridadseguridadI = '';
            let antrecursospersonasI = '';
            let tenenciapoliticapersonasI = '';
            const antrecursosvehiculosI = '';
            const tenenciapoliticavehiculosI = '';

            let cidadanosI = [];
            const licenciamientoDatosI = [];
            const bioseguridadDatosI = [];
            const espacioPublicoDatosI = [];
            const residuosSolidosDatosI = [];
            const faunaDatosI = [];
            const construccionesDatosI = [];
            const facturaI = [];
            const personalIncidenteI = [];
            let daniosMaterialesI = [];
            const arregloAsitenciaFamiliaI = [];
            const nombreIncidenteGFI = '';
            const ascistenciabasicainicialGFI = false;
            const ascistenciabasicainicialValorGFI = 0;
            const bienesMueblesGFI = false;
            const bienesMueblesValorGFI = 0;
            const bienesInMueblesGFI = false;
            const bienesInMueblesValorGFI = 0;
            const gastosMortuoriosGFI = false;
            const gastosMortuoriosValorGFI = 0;
            const suministrosMaterialesGFI = false;
            const suministrosMaterialesValorGFI = 0;
            const cuadrillasDeEmergenciaGFI = false;
            const cuadrillasDeEmergenciaValorGFI = 0;
            const asistenciaAlSISGFI = '';
            const cantidadAsistenciaAlSISGFI = 0;
            let administracioZonalI = '';
            let parroquiaI = '';
            let barrioCodI: number;
            let administracioZonalCodI: number;
            let parroquiaCodI: number;
            let recursosI = '';
            const fechaInspeccionI = '';
            const numfamiliasdamnificadaI = '';
            const nombresdamnificadaI = '';
            const edadesdamnificadaI = '';
            const generosdamnificadaI = '';
            const numpersonasenfamiliaacogienteI = '';
            const numfamiliasenfamiliaacogienteI = '';
            const nombresenfamiliaacogienteI = '';
            const edadesenfamiliaacogienteI = '';
            const generosenfamiliaacogienteI = '';
            const numpersonasreubicadasI = '';
            const numfamiliasreubicadasI = '';
            const nombresreubicadasI = '';
            const edadesreubicadasI = '';
            const generosreubicadasI = '';
            const numpersonasdesaparecidoI = '';
            const numfamiliasdesaparecidoI = '';
            const nombresdesaparecidoI = '';
            const edadesdesaparecidoI = '';
            const generosdesaparecidoI = '';
            const numpersonasalbergadaI = '';
            const numfamiliasalbergadaI = '';
            const nombresalbergadaI = '';
            const edadesalbergadaI = '';
            const generosalbergadaI = '';
            const alberguealbergadaI = '';
            const numpersonasheridosI = '';
            const numfamiliasheridosI = '';
            const nombresheridosI = '';
            const edadesheridosI = '';
            const generosheridosI = '';
            let medicoheridosI = '';
            let casasaludheridosI = '';
            let diagnosticoheridosI = '';
            const albergueheridosI = '';
            const numpersonasfallecidosI = '';
            const numfamiliasfallecidosI = '';
            const nombresfallecidosI = '';
            const edadesfallecidosI = '';
            const generosfallecidosI = '';
            let medicofallecidosI = '';
            let casasaludfallecidosI = '';
            let diagnosticofallecidosI = '';
            const alberguefallecidosI = '';
            const numpersonasnacionalesdesaparecidasI = '';
            const numpersonasextranjerasdesaparecidasI = '';
            const numeroFaunaUrbanaI = '';
            let numeroViviendasAfectadasI = '';
            let numeroViviendasAfectadasPatrimonialesI = '';
            let numeroViviendasDestruidasI = '';
            let numeroViviendasDestruidasPatrimonialesI = '';
            let numfamiliasafectadaI = '';
            let nombresafectadaI;
            let edadesafectadaI;
            let generosafectadaI;
            const numpersonasdamnificadaI = '';
            const numpersonasevacuadaI = '';
            const numfamiliasevacuadaI = '';
            const nombresevacuadaI = '';
            const edadesevacuadaI = '';
            let fechasLlamadaAux;
            const generosevacuadaI = '';
            let nombresI = '';
            let edadesI = '';
            let generosI = '';
            const numeroPersonaAfectadaI = '';
            let amtI = '';
            let votacionesI = '';
            let fecha1amt = '';
            let fecha2amt = '';
            let fecha3amt = '';
            let fecha4amt = '';
            let fecha2amtAux = '';
            let fecha3amtAux = '';
            let fecha4amtAux = '';
            let seguimientoAMT = '';
            let exhortoVerbalCheck = '';
            let numExhortoVerbal = '';
            let exhortoEscritoCheck = '';
            let numExhortoEscrito = '';
            let cintaAreaControlCheck = '';
            let cintaAreaControlValor = '';
            let selloSuspencionCheck = '';
            let numSelloObra = '';
            let selloClausuraCheck = '';
            let numSello1 = '';
            let actuacionesInicioCheck = '';
            let numActos = '';
            let actuacionesPreviasCheck = '';
            let numActuaciones = '';
            let retencionesCheck = '';
            let numActaRetenciones = '';
            const producto1Check = '';
            let producto1Nombre = '';
            let numRetencionesProducto1 = '';
            const producto2Check = '';
            let producto2Nombre = '';
            let numRetencionesProducto2 = '';
            const producto3Check = '';
            let producto3Nombre = '';
            let numRetencionesProducto3 = '';
            const producto4Check = '';
            let producto4Nombre = '';
            let numRetencionesProducto4 = '';
            const producto5Check = '';
            let producto5Nombre = '';
            let numRetencionesProducto5 = '';
            const producto6Check = '';
            let producto6Nombre = '';
            let numRetencionesProducto6 = '';
            const producto7Check = '';
            let producto7Nombre = '';
            let numRetencionesProducto7 = '';
            const producto8Check = '';
            let producto8Nombre = '';
            let numRetencionesProducto8 = '';
            const producto9Check = '';
            let producto9Nombre = '';
            let numRetencionesProducto9 = '';
            const producto10Check = '';
            let producto10Nombre = '';
            let numRetencionesProducto10 = '';
            let nombresAmcForm = '';
            const patrullaReaccionCheck = '';
            let patrullaReaccionValor = '';
            // tslint:disable-next-line:prefer-const
            let auxFechaLlamadaAmc: Date;
            const subClasificacionEventosAmcAux = '';
            let rescateAnimalesAmcAux = '';
            let numRescateAnimalesAmcAux = '';
            const operativoControlAmcAux = '';
            let emaseoI = '';
            let epmmopI = '';
            let epmapsI = '';
            let eeqI = '';
            let operativoI = '';
// tslint:disable:variable-name
            let locales_inspeccionadosI = '';
            let exhortos_verbales_por_mal_uso_luaeI = '';
            let exhortos_verbales_por_no_tener_luaeI = '';
            let exhortos_escritos_por_mal_uso_luaeI = '';
            let exhortos_escritos_por_no_tener_luaeI = '';
            let actos_de_inicio_por_mal_uso_luaeI = '';
            let actos_de_inicio_por_no_tener_luaeI = '';
            let sellos_clausura_establecimientoI = '';
            let fiestas_clandestinasI = '';
            let night_clubsI = '';
            let canchas_deportivasI = '';
            let parques_intervenidosI = '';
            let discotecasI = '';
            let gallerasI = '';
            let corridas_de_torosI = '';
            let personas_aglomeradas_disuadidas_bioseguridadI = '';
            let exhortos_verbales_por_distanciamientoI = '';
            let exhortos_verbales_por_mascarillaI = '';
            let exhortos_escritos_por_distanciamientoI = '';
            let actos_de_inicio_por_distanciamientoI = '';
            let actos_de_inicio_por_mascarillaI = '';
            let personas_aglomeradas_disuadidasI = '';
            let exhortos_verbales_por_normas_bioseguridadI = '';
            let exhortos_escritos_por_normas_bioseguridadI = '';
            let actos_de_inicio_por_normas_bioseguridadI = '';
            let pucas_revisadosI = '';
            let ventas_informales_retiradasI = '';
            let actos_inicio_ventas_informalesI = '';
            let libadores_retiradosI = '';
            let actos_inicio_libadoresI = '';
            let bebidas_alcoholicas_destruidasI = '';
            let exhortos_por_mal_uso_espacio_publicoI = '';
            let actos_de_inicio_por_mal_uso_espacio_publicoI = '';
            let fecha_inicio_opI = '';
            let fecha_fin_opI = '';
            let nombre_producto_1I = '';
            let numero_producto_1I = '';
            let nombre_producto_2I = '';
            let numero_producto_2I = '';
            let nombre_producto_3I = '';
            let numero_producto_3I = '';
            let nombre_producto_4I = '';
            let numero_producto_4I = '';
            let nombre_producto_5I = '';
            let numero_producto_5I = '';
            let nombre_producto_6I = '';
            let numero_producto_6I = '';
            let nombre_producto_7I = '';
            let numero_producto_7I = '';
            let nombre_producto_8I = '';
            let numero_producto_8I = '';
            let nombre_producto_9I = '';
            let numero_producto_9I = '';
            let nombre_producto_10I = '';
            let numero_producto_10I = '';
            const seguimiento_opI = '';
            let numero_personas_aglomeradas_disuadidasI = '';
            let numero_exhortos_verbales_por_distanciamientoI = '';
            let numero_exhortos_verbales_por_mascarillaI = '';
            let numero_ventas_informales_retiradasI = '';
            let numero_libadores_retiradosI = '';
            let numero_bebidas_alcoholicas_destruidasI = '';
            let numero_grafiterosI = '';
            let numero_puntos_humedosI = '';
            let numero_informacion_turisticaI = '';
            let numero_informacion_ciudadanaI = '';
            let numero_victima_en_contra_del_pudorI = '';
            let numero_primeros_auxiliosI = '';
            let numero_retenciones_presuntos_delincuentesI = '';
            let seguimiento_cacmI = '';
            const fotografia_1_cacmI = '';
            const fotografia_2_cacmI = '';
            const fotografia_3_cacmI = '';
            let fecha_inicio_cacmI = '';
            let fecha_fin_cacmI = '';

            let apoyo_seguridadAmcI = '';
            let incumplimientoToqueQuedaAmcI = '';
            let recintosInspecionados_cacmI = '';
            let incumplimientoToqueQueda_cacmI = '';
            let fiestasClandestinas_cacmI = '';
            let accionesRealizadasI = '';
            let recomendacionesI = '';
            let barrioI;
            let estadoEmergenciaI = '';
            let estadoEmergenciaCodAntI = 0;
            let diffDespachoArriboI = '';
            let diffLlamadaDespachoI = '';
            let diffLlamadaFinalizacionI = '';

            let datosTipo = {};

            nombresafectadaI = '';
            edadesafectadaI = '';
            generosafectadaI = '';

            if (tipoIncidente.formularioDatos.length > 0) {

                idI = tipoIncidente._id;
                latitud = tipoIncidente.latitud[0].lat;
                longitud = tipoIncidente.latitud[0].lng;
                direccionI = tipoIncidente.ubicacion;
                tipoI = tipoIncidente.incidente;
                let auxBarrio;
                let auxZonal;
                let AdministracionZonal;
                let auxAdminZonal;
                let barrioBuscado;
                if (tipoIncidente.geocerca !== undefined || tipoIncidente.geocerca !== '') {
                    auxBarrio = tipoIncidente.geocerca.split('Sector:')[1];
                    barrioI = auxBarrio;
                    auxZonal = tipoIncidente.geocerca.split('informacionZona:')[1];
                    auxAdminZonal = auxZonal.split('Parroquia:')[0];
                    AdministracionZonal = auxAdminZonal;
                    barrioBuscado = dataBarrios.find(x => x.sector === barrioI && x.zonal.toUpperCase() === AdministracionZonal);
                    if (barrioBuscado === undefined) {
                        barrioBuscado = dataBarrios.find(x => x.sector === barrioI);
                    }
                } else {
                    AdministracionZonal
                }
                estadoEmergenciaI = tipoIncidente.estado_incidente;
                if (estadoEmergenciaI === 'Abierto') {
                    estadoEmergenciaCodAntI = 1;
                }
                if (estadoEmergenciaI === 'Cerrado') {
                    estadoEmergenciaCodAntI = 2;
                }
                if (estadoEmergenciaI === 'Cancelado') {
                    estadoEmergenciaCodAntI = 3;
                }


                if (barrioBuscado) {
                    administracioZonalI = barrioBuscado.zonal.toUpperCase();
                    parroquiaI = barrioBuscado.parroquia;
                    barrioCodI = barrioBuscado.codigoBarrio;
                    administracioZonalCodI = barrioBuscado.codigoZonal;
                    parroquiaCodI = barrioBuscado.codigoParroquia;
                } else {
                    barrioCodI = 9999;
                    administracioZonalCodI = 9999;
                    parroquiaCodI = 9999;
                }
                let fechallamadaaux = '';
                let fechadespachoaux = '';
                let fechaarriboRecursosaux = '';
                let fechaFinalizacionaux = '';
                let auxArriboRecursos02 = '';
                let finalizacion02 = '';
                let EsMetros = false;
                let EsHectareas = false;
                let valorArea = 0;
                const ciudanoTemp: any = {};
                const daniosMaterialesTemp: any = {};
                const datitos = cargarIncidentesSinSubtipo(tipoI);
                if (datitos !== undefined) {
                    tipoCodI = datitos.tipoCodI;
                    tipoCodAntI = datitos.tipoCodAntI;
                }
                if (tipoI === 'BIO EP 1 NO USAR MASCARILLA O USARLA INDEBIDAMENTE') {
                    amtI = 'BIO EP 1';
                    votacionesI = 'true';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'BIO EP 2 AGLOMERACIÓN EN ESPACIO PÚBLICO') {
                    amtI = 'BIO EP 2';
                    votacionesI = 'true';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'BIO PP 3 AGLOMERACIÓN EN ESTABLECIMIENTO COMERCIAL') {
                    amtI = 'BIO PP 3';
                    votacionesI = 'true';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'CONSTR 135D CONSTRUCCIONES ESPACIO PÚBLICO') {
                    amtI = 'CONSTR 135D';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'CONSTR PROCESOS CONSTRUCTIVOS') {
                    amtI = 'CONSTR';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'RES 1063 CHATARRA EN EP') {
                    amtI = 'RES 1063';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'LUAE A ACTIVIDAD ECONÓMICA SIN LUAE') {
                    amtI = 'LUAE A';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'LUAE C MAL USO DE LUAE') {
                    amtI = 'LUAE C';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'FAU MALTRATO ANIMAL') {
                    amtI = 'FAU';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'RES 1044 TRANSPORTE RESIDUOS CON DERRAME SOBRE LA ') {
                    amtI = 'RES 1044';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'RES 1046 PRESENCIA RESIDUOS LABORES MINADO') {
                    amtI = 'RES 1046';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'RES 1047 SACAR BASURA FUERA DE HORARIO') {
                    amtI = 'RES 1047';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'RES 10413 DEPOSITAR BASURA LUGARES NO AUTORIZADOS') {
                    amtI = 'RES 10413';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'RES 1051 QUEMA A CIELO ABIERTO') {
                    amtI = 'RES 1051';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'RES 1054 RESIDUOS') {
                    amtI = 'RES 1054';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'RES 1056 MATERIAL DE CONSTRUCIÓN EN EP') {
                    amtI = 'RES 1056';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'RES 1057 MAMPOSTERÍA MOBILIARIO URBANO') {
                    amtI = 'RES 1057';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'RES 1062 RESIDUOS TOXICOS Y HOSPITALARIOS') {
                    amtI = 'RES 1062';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'RES 1063 CHATARRA EN EP') {
                    amtI = 'RES 1063';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'RES 1064 DESTRUCIÓN DE CONTENEDORES DE BASURA') {
                    amtI = 'RES 1064';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'RES 1065 QUEMA EN VÍA PÚBLICA') {
                    amtI = 'RES 1065';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'RES 1067 ARROJO MATERIALES TÓXICOS A EP') {
                    amtI = 'RES 1067';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'ESP 60 USO INDEBIDO DE ESPACIO PÚBLICO') {
                    amtI = 'ESP 60';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'ESP 61 CIERRE DE VÍAS SIN AUTORIZACIÓN') {
                    amtI = 'ESP 61';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'ARB 124A TALA DE ÁRBOLES') {
                    amtI = 'ARB 124A';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'RES 1055 USO DE ESPACIO PÚBLICO PARA ACTIVIDADES C') {
                    amtI = 'RES 1055';
                    votacionesI = 'true';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'ESP 32 LIBADORES EN ESPACIO PÚBLICO') {
                    amtI = 'ESP 32';
                    votacionesI = 'true';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'INCENDIO ESTRUCTURAL') {
                    tipoCodI = 71;
                    tipoCodAntI = 47;
                }

                // emaseo
                if (tipoI === 'BASURA AL PIE DE VEREDA') {
                    emaseoI = 'EMASEO 1';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'BASURA EN CONTENEDORES COLAPSADOS') {
                    emaseoI = 'EMASEO 2';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'BASURA EN VÍA PÚBLICA') {
                    emaseoI = 'EMASEO 3';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'INCUMPLIMIENTO DEL SERVICIO') {
                    emaseoI = 'EMASEO 4';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'LIMPIEZA DE ESPACIO PÚBLICO POR MALOS OLORES') {
                    emaseoI = 'EMASEO 5';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'LIMPIEZA DE FAUNA URBANA') {
                    emaseoI = 'EMASEO 6';
                    auxFechaOtroI = true;
                }

                // epmmop

                if (tipoI === 'GC ARBOLES CAÍDOS EN ESPACIO PÚBLICO') {
                    epmmopI = 'EPMMOP 1';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC CAÍDA VALLA PUBLICITARIA, ROTULOS Y FALTA SEÑAL') {
                    epmmopI = 'EPMMOP 2';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC DAÑO A LA PROPIEDAD PÚBLICA') {
                    epmmopI = 'EPMMOP 3';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC DAÑO DE ADOQUINES') {
                    epmmopI = 'EPMMOP 4';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC DAÑO DE VÍAS') {
                    epmmopI = 'EPMMOP 5';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC ESCOMBROS Y MATERIAL PETREO EN LA VÍA') {
                    epmmopI = 'EPMMOP 6';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC HUNDIMIENTO EN LA VÍA') {
                    epmmopI = 'EPMMOP 7';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC OBSTRUCCIÓN EN ESPACIO PÚBLICO') {
                    epmmopI = 'EPMMOP 8';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC PILETAS EN MAL ESTADO') {
                    epmmopI = 'EPMMOP 9';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC SEMAFORO DAÑADO') {
                    epmmopI = 'EPMMOP 10';
                    auxFechaOtroI = true;
                }

                // epmaps

                if (tipoI === 'GC FALTA DE ACCESORIOS') {
                    epmapsI = 'EPMAPS 1';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC FUGA DE AGUA') {
                    epmapsI = 'EPMAPS 2';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC HIDRANTES ABIERTOS') {
                    epmapsI = 'EPMAPS 3';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC HUNDIMIENTOS DE VÍA POR RUPTURA DE TUBERIA DE A') {
                    epmapsI = 'EPMAPS 4';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC ROTURA DE TUBERIA') {
                    epmapsI = 'EPMAPS 5';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC SIN SERVICIO DE AGUA POTABLE') {
                    epmapsI = 'EPMAPS 6';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC TAPONAMIENTO DE COLECTORES EN QUEBRADAS') {
                    epmapsI = 'EPMAPS 7';
                    auxFechaOtroI = true;
                }

                // EEQ
                if (tipoI === 'GC ALUMBRADO PÚBLICO DAÑADO') {
                    eeqI = 'EEQ 1';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC CABLES DE ENERGIA CAÍDOS') {
                    eeqI = 'EEQ 2';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC CAÍDA Y REPARACIÓN DE LUMINARIA DE POSTES ORNAM') {
                    eeqI = 'EEQ 3';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC DAÑO DE TRANSFORMADOR') {
                    eeqI = 'EEQ 4';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC DAÑO EN SOTERRAMIENTO') {
                    eeqI = 'EEQ 5';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC POSTES EN MAL ESTADO') {
                    eeqI = 'EEQ 6';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC SIN SERVICIO DE ENERGIA ELÉCTRICA') {
                    eeqI = 'EEQ 7';
                    auxFechaOtroI = true;
                }
                if (tipoI === 'GC VARIACIONES DE VOLTAJE') {
                    eeqI = 'EEQ 8';
                    auxFechaOtroI = true;
                }

                // operativo
                if (tipoI === 'OPERATIVO DE SEGURIDAD') {
                    operativoI = 'OPP S';
                    auxFechaOtroI = true;
                }

                // operativo camcmq
                if (tipoI === 'OPERATIVO CACMQ') {
                    operativoI = 'OPR CACMQ';
                    auxFechaOtroI = true;
                }
                let auxgenero = '';
                let auxNombre = '';
                let auxedad = '';

                let catalogoBuscado;
                let salidaSect;

                let auxFechadg02 = '';
                let fechaFindg02 = '';
                let auxAmcFechaInicio12 = '';
                let auxAmcFechaFin12 = '';
                let auxFechacacmIni = '';
                let auxFechacacmFin = '';
                for (const a of tipoIncidente.formularioDatos) {


                    switch (a.nombre) {
                        case 'dg-semaforo':
                            semaforoI = a.valor;
                            switch (semaforoI) {
                                case 'ANARANJADO':
                                    simbolo = 'warningN.png';
                                    colorItem = 'orange';
                                    break;
                                case 'AMARILLO':
                                    simbolo = 'warninga.png';
                                    colorItem = 'yellow';
                                    break;
                                case 'ROJO':
                                    simbolo = 'warningr.png';
                                    colorItem = 'red';
                                    break;
                                case 'VERDE':
                                    simbolo = 'warningv.png';
                                    colorItem = 'green';
                                    break;
                                default:
                                    simbolo = 'warninga.png';
                                    colorItem = 'yellow';
                            }
                            break;

                        case 'dg-fichaecu':
                            fichaEcuI = a.valor;
                            break;

                        case 'dg-fechallamada':
                            fechallamadaaux = a.valor;
                            break;

                        case 'dg-horallamada':
                            fechaLlamadaI = fechallamadaaux + ' ' + a.valor;
                            break;


                        case 'dg-fechadespacho':
                            fechadespachoaux = a.valor;
                            break;

                        case 'dg-horadespacho':
                            fechaDespachoI = fechadespachoaux + ' ' + a.valor;
                            break;

                        case 'dg-fechaarriborecursos':
                            fechaarriboRecursosaux = a.valor;
                            break;
                        case 'dg-horaarriborecursos':
                            fechaArriboRecursosI = fechaarriboRecursosaux + ' ' + a.valor;
                            break;

                        case 'dg-fechafinalizacion':
                            fechaFinalizacionaux = a.valor;
                            break;

                        case 'dg-horafinalizacion':
                            fechaFinalizacionI = fechaFinalizacionaux + ' ' + a.valor;
                            break;

                        case 'dg-reportadopor':
                            reportadoPorI = (a.valor).toUpperCase();
                            catalogoBuscado = dataCatalogo.find(x => x.nombre === reportadoPorI);
                            if (catalogoBuscado) {
                                reportadoPorCodAntI = catalogoBuscado.codigoAntiguo;
                            }
                            break;

                        case 'subtipo-transito':
                            subtipoI = a.valor;
                            tipoI = 'INCIDENTE DE TRÁNSITO';
                            tipoCodI = 36;
                            tipoCodAntI = 1;
                            catalogoBuscado = dataCatalogo.find(x => x.nombre === subtipoI);
                            if (catalogoBuscado) {
                                subtipoCodI = catalogoBuscado.id;
                                subtipoCodAntI = catalogoBuscado.codigoAntiguo;
                            }
                            break;

                        case 'subtipo-deflagracion':
                            subtipoI = a.valor;
                            tipoI = 'DEFLAGRACIÓN';
                            tipoCodI = 387;
                            tipoCodAntI = 387;
                            catalogoBuscado = dataCatalogo.find(x => x.nombre === subtipoI);
                            if (catalogoBuscado) {
                                subtipoCodI = catalogoBuscado.id;
                                subtipoCodAntI = catalogoBuscado.codigoAntiguo;
                            }
                            break;
                        case 'subtipo-explosion':
                            subtipoI = a.valor;
                            tipoI = 'EXPLOSIÓN';
                            tipoCodI = 32;
                            tipoCodAntI = 9;
                            catalogoBuscado = dataCatalogo.find(x => x.nombre === subtipoI);
                            if (catalogoBuscado) {
                                subtipoCodI = catalogoBuscado.id;
                                subtipoCodAntI = catalogoBuscado.codigoAntiguo;
                            }
                            break;

                        case 'subtipo-movimeintomasa':
                            subtipoI = a.valor;
                            tipoI = 'MOVIMIENTO EN MASA';
                            tipoCodI = 41;
                            tipoCodAntI = 17;
                            catalogoBuscado = dataCatalogo.find(x => x.nombre === subtipoI);
                            if (catalogoBuscado) {
                                subtipoCodI = catalogoBuscado.id;
                                subtipoCodAntI = catalogoBuscado.codigoAntiguo;
                            }
                            break;

                        case 'subtipo-faunaurbana':
                            subtipoI = a.valor;
                            tipoI = 'RESCATE FAUNA SILVESTRE';
                            tipoCodI = 74;
                            tipoCodAntI = 50;
                            break;

                        /*case 'subtipo-rescate-fauna-urbana-cantidad':
              subtipoI = a.valor;
              break;

            case 'subtipo-inundaciones':
              subtipoI = a.valor;
              break;
*/
                        case 'movi-masa-volumen':
                            movimientovolumenI = a.valor;
                            break;

                        case 'movi-masa-dias':
                            movimientomovilidadviasprioritariasI = a.valor;
                            break;

                        case 'movi-masa-calado':
                            inundacionescaladoI = a.valor;
                            break;

                        case 'movi-masa-causa':
                            inundacionescausaI = a.valor;
                            break;

                        case 'movi-masa-afectaciones':
                            inundacionesafectacionesmovilidadI = a.valor;
                            break;

                        case 'info-adiciona-incendio-area':
                            valorArea = a.valor;
                            break;

                        case 'info-adiciona-incendio-unidad':
                            const tipo = a.valor;
                            if (tipo != null) {
                                if (tipo === 'M2') {
                                    EsMetros = true;
                                } else {
                                    if (tipo === 'Hectáreas') {
                                        EsHectareas = true;
                                    }
                                }
                                if (EsMetros === true) {
                                    if (valorArea) {
                                        incendioareaI = valorArea.toString();
                                        indenciohectareasI = (valorArea * 0.0001).toString();
                                    }
                                }
                                if (EsHectareas === true) {
                                    if (valorArea) {
                                        indenciohectareasI = valorArea.toString();
                                        incendioareaI = (valorArea * 10000).toString();
                                    }
                                }
                            }
                            break;

                        case 'info-adiciona-incendio-materiales':
                            incendiomaterialescombustiblesI = a.valor;
                            break;

                        case 'seguimiento':
                            descripcionI = a.valor;
                            break;

                        case 'ciu-nombre':
                            ciudanoTemp.nombre = a.valor;
                            auxNombre = a.valor;
                            if (nombresafectadaI === undefined) {
                                nombresafectadaI = '';
                            }
                            nombresI += auxNombre + ',';
                            break;

                        case 'ciu-edad':
                            ciudanoTemp.edad = a.valor;
                            if (a.valor === '') {
                                ciudanoTemp.edad = '';
                                auxedad = a.valor;
                                if (auxedad === null) {
                                    auxedad = '';
                                }
                                if (edadesafectadaI === undefined) {
                                    edadesafectadaI = '';
                                }
                                edadesI += auxedad + ';';
                            }
                            break;

                        case 'ciu-gene':
                            ciudanoTemp.sexo = a.valor;
                            auxgenero = a.valor;
                            if (generosafectadaI === undefined) {
                                generosafectadaI = '';
                            }
                            if (auxgenero === 'Femenino') {
                                generosI += '2' + ';';
                            } else {
                                if (auxgenero === 'Masculino') {
                                    generosI += '1' + ';';
                                }
                            }
                            break;

                        case 'ciu-nacio':
                            ciudanoTemp.nacionalidad = a.valor;
                            break;

                        case 'ciu-tipoafectacion':
                            let auxTipoafectacion;
                            auxTipoafectacion = a.valor;
                            ciudanoTemp.afectada = false;
                            ciudanoTemp.albergada = false;
                            ciudanoTemp.damnificada = false;
                            ciudanoTemp.enfamiliaacogiente = false;
                            ciudanoTemp.desaparecida = false;
                            ciudanoTemp.reubicada = false;
                            ciudanoTemp.evacuada = false;
                            ciudanoTemp.fallecido = false;
                            ciudanoTemp.herido = false;
                            if (auxTipoafectacion === 'Afectada') {
                                ciudanoTemp.afectada = true;
                            }
                            if (auxTipoafectacion === 'Albergada') {
                                ciudanoTemp.albergada = true;
                            }
                            if (auxTipoafectacion === 'Damnificada') {
                                ciudanoTemp.damnificada = true;
                            }
                            if (auxTipoafectacion === 'Desaparecida') {
                                ciudanoTemp.desaparecida = true;
                            }
                            if (auxTipoafectacion === 'Familia Acogiente') {
                                ciudanoTemp.enfamiliaacogiente = true;
                            }

                            if (auxTipoafectacion === 'Evacuada') {
                                ciudanoTemp.evacuada = true;
                            }
                            if (auxTipoafectacion === 'Fallecido') {
                                ciudanoTemp.fallecido = true;
                            }
                            if (auxTipoafectacion === 'Herido') {
                                ciudanoTemp.herido = true;
                            }
                            if (auxTipoafectacion === 'Reubicada') {
                                ciudanoTemp.reubicada = true;
                            }
                            break;

                        case 'ciu-tipoalbergue':
                            ciudanoTemp.tipoalbergue = a.valor;
                            break;

                        case 'ciu-albergue':
                            ciudanoTemp.albergue = a.valor;
                            break;

                        case 'ciu-refugiotemporal':
                            ciudanoTemp.refugioTemporal = a.valor;
                            break;

                        case 'ciu-familia':
                            ciudanoTemp.familia = a.valor;
                            numfamiliasafectadaI = a.valor;
                            break;

                        case 'ciu-parentesco':
                            ciudanoTemp.jefehogar = false;
                            salidaSect = a.valor;
                            if (salidaSect === 'Si') {
                                ciudanoTemp.jefehogar = true;
                            }
                            break;

                        case 'ciu-medico':
                            ciudanoTemp.medicoacargo = a.valor;
                            if (a.valor === '') {
                                if (this.salidaSelectFallecido === 'Si') {
                                    medicofallecidosI = '';
                                } else {
                                    medicoheridosI = '';
                                }
                            } else {
                                if (this.salidaSelectFallecido === 'Si' || nombresfallecidosI !== '') {
                                    medicofallecidosI +=
                                        a.value + ',';
                                } else {
                                    medicoheridosI +=
                                        a.value + ',';
                                }
                            }
                            break;

                        case 'ciu-casasalud':
                            ciudanoTemp.casasalud = a.valor;
                            if (this.salidaSelectFallecido === 'Si') {
                                medicofallecidosI = '';
                            } else {
                                medicoheridosI = '';
                            }
                            if (this.salidaSelectFallecido === 'Si' || ciudanoTemp.fallecido === true) {
                                if (a.value != null) {
                                    casasaludfallecidosI +=
                                        a.value + ',';
                                }
                            } else {
                                if (a.value != null) {
                                    casasaludheridosI +=
                                        a.value + ',';
                                }
                            }
                            break;

                        case 'ciu-dagnostico':
                            ciudanoTemp.diagnosticomedico = a.valor;
                            if (this.salidaSelectFallecido === 'Si') {
                                diagnosticofallecidosI = '';
                            } else {
                                diagnosticofallecidosI = '';
                            }
                            if (this.salidaSelectFallecido === 'Si' || ciudanoTemp.fallecido === true) {
                                if (a.valor != null) {
                                    diagnosticofallecidosI +=
                                        a.valor + ',';
                                }
                            } else {
                                if (a.valor != null) {
                                    diagnosticoheridosI +=
                                        a.valor + ',';
                                }
                            }
                            break;

                        case 'ciu-fondoemergencia':
                            fondoEmergenciaI = a.valor;
                            break;

                        case 'ciu-vestimenta':
                            ciudanoTemp.vestimenta = false;
                            salidaSect = a.valor;
                            if (salidaSect === 'Si') {
                                ciudanoTemp.vestimenta = true;
                            }
                            break;

                        case 'ciu-tallaveztimenta':
                            ciudanoTemp.vestimentaTalla = a.valor;
                            break;

                        case 'ciu-vestimentafecha':
                            ciudanoTemp.vestimentaFecEnt = a.valor;
                            break;

                        case 'ciu-calzado':
                            ciudanoTemp.calzado = false;
                            salidaSect = a.valor;
                            if (salidaSect === 'Si') {
                                ciudanoTemp.calzado = true;
                            }
                            break;

                        case 'ciu-tallacalzado':
                            ciudanoTemp.calzadoTalla = a.valor;
                            break;

                        case 'ciu-fechaentregacalzado':
                            ciudanoTemp.calzadoFecEnt = a.valor;
                            break;

                        case 'ciu-frazada':
                            ciudanoTemp.frazada = false;
                            salidaSect = a.valor;
                            if (salidaSect === 'Si') {
                                ciudanoTemp.frazada = true;
                            }
                            break;

                        case 'ciu-cantidadfrazada':
                            ciudanoTemp.frazadaTalla = a.valor;
                            break;

                        case 'ciu-fechaentregafrazada':
                            ciudanoTemp.frazadaFecEnt = false;
                            salidaSect = a.valor;
                            break;

                        case 'ciu-alimentospreparados':
                            ciudanoTemp.alimentosPerecibles = false;
                            salidaSect = a.valor;
                            if (salidaSect === 'Si') {
                                ciudanoTemp.alimentosPerecibles = true;
                            }
                            break;

                        case 'ciu-cantidadpreparados':
                            ciudanoTemp.alimentosPereciblesTalla = a.valor;
                            break;

                        case 'ciu-fechaentregapreparados':
                            ciudanoTemp.alimentosPereciblesFecEnt = a.valor;
                            break;

                        case 'ciu-noperecible':
                            ciudanoTemp.alimentosNoPerecibles = false;
                            salidaSect = a.valor;
                            if (salidaSect === 'Si') {
                                ciudanoTemp.alimentosNoPerecibles = true;
                            }
                            break;

                        case 'ciu-cantidadnoperecible':
                            ciudanoTemp.alimentosNoPereciblesTalla = a.valor;
                            break;

                        case 'ciu-fechaentreganoperecible':
                            ciudanoTemp.alimentosNoPereciblesEntregado = false;
                            salidaSect = a.valor;
                            if (salidaSect === 'Si') {
                                ciudanoTemp.alimentosNoPereciblesEntregado = true;
                            }
                            break;

                        case 'ciu-kithiguiene':
                            ciudanoTemp.kitHigiene = false;
                            salidaSect = a.valor;
                            if (salidaSect === 'Si') {
                                ciudanoTemp.kitHigiene = true;
                            }
                            break;

                        case 'ciu-fechaentregahiguiene':
                            ciudanoTemp.kitHigieneFecEnt = a.valor;
                            break;

                        case 'ciu-cantidadhiguiene':
                            ciudanoTemp.kitHigieneTalla = a.valor;
                            break;

                        case 'ciu-kitescolar':
                            ciudanoTemp.kitEscolar = false;
                            salidaSect = a.valor;
                            if (salidaSect === 'Si') {
                                ciudanoTemp.kitEscolar = true;
                            }
                            break;

                        case 'ciu-cantidadescolar':
                            ciudanoTemp.kitEscolarTalla = a.valor;
                            break;

                        case 'ciu-fechaentregaescolar':
                            ciudanoTemp.kitEscolarFecEnt = a.valor;
                            break;

                        case 'ciu-toallas':
                            ciudanoTemp.toallas = false;
                            salidaSect = a.valor;
                            if (salidaSect === 'Si') {
                                ciudanoTemp.toallas = true;
                            }
                            break;

                        case 'ciu-cantidadtoallas':
                            ciudanoTemp.toallasTalla = a.valor;
                            break;

                        case 'ciu-fechaentregatoallas':
                            ciudanoTemp.toallasFecEnt = a.valor;
                            break;

                        case 'ciu-medicina':
                            ciudanoTemp.medicinas = false;
                            salidaSect = a.valor;
                            if (salidaSect === 'True') {
                                ciudanoTemp.medicinas = true;
                            }
                            break;

                        case 'ciu-cantidadmedicina':
                            ciudanoTemp.medicinasTalla = a.valor;
                            break;

                        case 'ciu-fechaentregamedicina':
                            ciudanoTemp.medicinasFecEnt = a.valor;
                            break;

                        case 'ciu-gastosmortuorios':
                            ciudanoTemp.gastosMortuorios = false;
                            salidaSect = a.valor;
                            if (salidaSect === 'Si') {
                                ciudanoTemp.gastosMortuorios = true;
                            }
                            break;

                        case 'ciu-fechaentregagastosmortuorios':
                            ciudanoTemp.gastosMortuoriosFecEnt = a.valor;
                            break;

                        case 'ciu-fechaentregabienesmuebles':
                            ciudanoTemp.bienesMueblesFecEnt = a.valor;
                            break;
                        case 'ciu-fechaentregaotros':
                            ciudanoTemp.otrosFecEnt = a.valor;
                            break;

                        case 'ciu-otros':
                            ciudanoTemp.otros = a.valor;
                            break;

                        /*case 'ciu-cantidadgastosmortuorios':
              = a.valor;
              break;*/

                        case 'ciu-bienesmuebles':
                            ciudanoTemp.bienesMuebles = a.valor;
                            break;

                        case 'ciu-bienesinmuebles':
                            ciudanoTemp.bienesInMuebles = false;
                            salidaSect = a.valor;
                            if (salidaSect === 'Si') {
                                ciudanoTemp.bienesInMuebles = true;
                            }
                            break;

                        case 'ciu-fechaentregabienesinmuebles':
                            ciudanoTemp.bienesInMueblesFecEnt = a.valor;
                            break;

                        /*case 'ciu-cantidadbienesmuebles':
              = a.valor;
              break;

            case 'ciu-cantidadbienesinmuebles':
              = a.valor;
              break;*/

                        case 'ciu-cedula':
                            ciudanoTemp.cedula = a.valor;
                            break;

                        case 'ciu-ingresomensual':
                            ciudanoTemp.ingresoMensual = a.valor;
                            break;

                        case 'ciu-ingresoadicional':
                            ciudanoTemp.ingresoAdicional = a.valor;
                            break;

                        case 'sectores':
                            let auxSectores;
                            auxSectores = a.valor;
                            estatalI = '';
                            municipalI = '';
                            privadoI = '';
                            patrimonialI = '';
                            aguapotableI = '';
                            alcantarilladoI = '';
                            energiaehidrocarburosI = '';
                            transporteI = '';
                            telecomunicacionesI = '';
                            instalacionesdeprimerarespuestaI = '';
                            saludI = '';
                            seguridadI = '';
                            educacionI = '';
                            areasnaturalesprotegidasybosquesprotectoresI = '';


                            if (auxSectores === 'ESTATAL') {
                                estatalI = '1';
                            }
                            if (auxSectores === 'MUNICIPAL') {
                                municipalI = '1';
                            }
                            if (auxSectores === 'PRIVADO') {
                                privadoI = '1';
                            }
                            if (auxSectores === 'PATRIMONIAL') {
                                patrimonialI = '1';
                            }
                            if (auxSectores === 'AGUA POTABLE') {
                                aguapotableI = '1';
                            }
                            if (auxSectores === 'ALCANTARILLADO') {
                                alcantarilladoI = '1';
                            }
                            if (auxSectores === 'ENERGÍA') {
                                energiaehidrocarburosI = '1';
                            }
                            if (auxSectores === 'HIDROCARBUROS') {
                                energiaehidrocarburosI = '1';
                            }
                            if (auxSectores === 'TRANSPORTE') {
                                transporteI = '1';
                            }
                            if (auxSectores === 'TELECOMUNICACIONES') {
                                telecomunicacionesI = '1';
                            }
                            if (auxSectores === 'INSTALACIONES DE PRIMERA RESPUESTA') {
                                instalacionesdeprimerarespuestaI = '1';
                            }
                            if (auxSectores === 'SALUD') {
                                saludI = '1';
                            }
                            if (auxSectores === 'SEGURIDAD') {
                                seguridadI = '1';
                            }
                            if (auxSectores === 'EDUCACION') {
                                educacionI = '1';
                            }
                            if (auxSectores === 'INSTALACIONES DE PRIMERA RESPUESTA') {
                                areasnaturalesprotegidasybosquesprotectoresI = '1';
                            }


                            break;

                        case 'bienes-viviendasafectadas':
                            numeroViviendasAfectadasI = a.valor;
                            break;

                        case 'bienes-patrimonialesafectadas':
                            numeroViviendasAfectadasPatrimonialesI = a.valor;
                            break;

                        case 'bienes-viviendasdestruidas':
                            numeroViviendasDestruidasI = a.valor;
                            break;

                        case 'bienes-patrimonialesdestruidas':
                            numeroViviendasDestruidasPatrimonialesI = a.valor;
                            break;

                        case 'danos-materiales-tipovivienda':
                            daniosMaterialesTemp.tipovivirnda = a.valor;
                            break;

                        case 'danos-materiales-uso':
                            daniosMaterialesTemp.uso = a.valor;
                            break;

                        case 'danos-materiales-tiponegocio':
                            daniosMaterialesTemp.tipoNegocio = a.valor;
                            break;

                        case 'danos-materiales-tipoconstruccion':
                            let auxTipoConstruccion;
                            auxTipoConstruccion = a.valor;
                            daniosMaterialesTemp.metalicaTC = false;
                            daniosMaterialesTemp.hormigoArmadoTC = false;
                            daniosMaterialesTemp.adobeTC = false;
                            daniosMaterialesTemp.maderaTC = false;
                            daniosMaterialesTemp.mixtaTC = false;
                            daniosMaterialesTemp.otrosTC = false;
                            if (auxTipoConstruccion === 'Metálica') {
                                daniosMaterialesTemp.metalicaTC = true;
                            }
                            if (auxTipoConstruccion === 'Hormigon Armado') {
                                daniosMaterialesTemp.hormigoArmadoTC = true;
                            }
                            if (auxTipoConstruccion === 'Adobe') {
                                daniosMaterialesTemp.adobeTC = true;
                            }
                            if (auxTipoConstruccion === 'Madera') {
                                daniosMaterialesTemp.maderaTC = true;
                            }
                            if (auxTipoConstruccion === 'Mixta') {
                                daniosMaterialesTemp.mixtaTC = true;
                            }
                            if (auxTipoConstruccion === 'Otro') {
                                daniosMaterialesTemp.otrosTC = true;
                            }
                            break;

                        case 'danos-materiales-piso':
                            let auxPiso;
                            auxPiso = a.valor;
                            daniosMaterialesTemp.pisoTierra = false;
                            daniosMaterialesTemp.pisoCemento = false;
                            daniosMaterialesTemp.pisoMadera = false;
                            daniosMaterialesTemp.pisoLadrillo = false;
                            daniosMaterialesTemp.pisoCeramica = false;
                            daniosMaterialesTemp.pisoOtros = false;

                            if (auxPiso === 'Tierra') {
                                daniosMaterialesTemp.pisoTierra = true;
                            }
                            if (auxPiso === 'Cemento') {
                                daniosMaterialesTemp.pisoCemento = true;
                            }
                            if (auxPiso === 'Madera') {
                                daniosMaterialesTemp.pisoMadera = true;
                            }
                            if (auxPiso === 'Ladrillo') {
                                daniosMaterialesTemp.pisoLadrillo = true;
                            }
                            if (auxPiso === 'Cerámica') {
                                daniosMaterialesTemp.pisoCeramica = true;
                            }
                            if (auxPiso === 'Otro') {
                                daniosMaterialesTemp.pisoOtros = true;
                            }
                            break;

                        case 'danos-materiales-pared':
                            let auxPared;
                            auxPared = a.valor;
                            daniosMaterialesTemp.paredBloque = false;
                            daniosMaterialesTemp.paredLadrillo = false;
                            daniosMaterialesTemp.paredAdobe = false;
                            daniosMaterialesTemp.paredMadera = false;
                            daniosMaterialesTemp.paredMixtos = false;
                            daniosMaterialesTemp.paredOtros = false;

                            if (auxPared === 'Bloque') {
                                daniosMaterialesTemp.paredBloque = true;
                            }
                            if (auxPared === 'Ladrillo') {
                                daniosMaterialesTemp.paredLadrillo = true;
                            }
                            if (auxPared === 'Adobe') {
                                daniosMaterialesTemp.paredAdobe = true;
                            }
                            if (auxPared === 'Madera') {
                                daniosMaterialesTemp.paredMadera = true;
                            }
                            if (auxPared === 'Mixtos') {
                                daniosMaterialesTemp.paredMixtos = true;
                            }
                            if (auxPared === 'Otro') {
                                daniosMaterialesTemp.paredOtros = true;
                            }

                            break;

                        case 'danos-materiales-techo':
                            let auxTipoTecho;
                            auxTipoTecho = a.valor;
                            daniosMaterialesTemp.techoLoza = false;
                            daniosMaterialesTemp.techoLozeta = false;
                            daniosMaterialesTemp.techoAsbesto = false;
                            daniosMaterialesTemp.techoTeja = false;
                            daniosMaterialesTemp.techoZinc = false;
                            daniosMaterialesTemp.techoOtro = false;

                            if (auxTipoTecho === 'Loza') {
                                daniosMaterialesTemp.techoLoza = true;
                            }
                            if (auxTipoTecho === 'Lozeta') {
                                daniosMaterialesTemp.techoLozeta = true;
                            }
                            if (auxTipoTecho === 'Asbesto') {
                                daniosMaterialesTemp.techoAsbesto = true;
                            }
                            if (auxTipoTecho === 'Teja') {
                                daniosMaterialesTemp.techoTeja = true;
                            }
                            if (auxTipoTecho === 'Zinc') {
                                daniosMaterialesTemp.techoZinc = true;
                            }
                            if (auxTipoTecho === 'Otro') {
                                daniosMaterialesTemp.techoOtro = true;
                            }
                            break;

                        case 'danos-materiales-mamposteria':
                            daniosMaterialesTemp.mamposteriaVestibulo = a.valor;
                            break;

                        case 'danos-materiales-mamposteriavestibulo':
                            daniosMaterialesTemp.mamposteriaVestibulo = a.valor;
                            break;

                        case 'danos-materiales-mamposteriacomedor':
                            daniosMaterialesTemp.mamposteriaComedor = a.valor;
                            break;

                        case 'danos-materiales-mamposteriapasillo':
                            daniosMaterialesTemp.mamposteriaPasillo = a.valor;
                            break;

                        case 'danos-materiales-mamposteriacocina':
                            daniosMaterialesTemp.mamposteriaCocina = a.valor;
                            break;

                        case 'danos-materiales-mamposteriasshh':
                            daniosMaterialesTemp.mamposteriaSSHH = a.valor;
                            break;

                        case 'danos-materiales-mamposteriadormitorios':
                            daniosMaterialesTemp.mamposteriaDormitorios = a.valor;
                            break;

                        case 'danos-materiales-mamposteriagarage':
                            daniosMaterialesTemp.mamposteriaGarage = a.valor;
                            break;

                        case 'danos-materiales-mamposteriaadadicionales':
                            daniosMaterialesTemp.mamposteriaEdAdicionales = a.valor;
                            break;

                        case 'danos-materiales-mamposteriapatio':
                            daniosMaterialesTemp.mamposteriaPatioJardin = a.valor;
                            break;

                        case 'danos-materiales-cubierta':
                            daniosMaterialesTemp.cubiertaVestibulo = a.valor;
                            break;

                        case 'danos-materiales-cubiertavestibulo':
                            daniosMaterialesTemp.cubiertaVestibulo = a.valor;
                            break;

                        case 'danos-materiales-cubiertacomedor':
                            daniosMaterialesTemp.cubiertaComedor = a.valor;
                            break;

                        case 'danos-materiales-cubiertacocina':
                            daniosMaterialesTemp.cubiertaCocina = a.valor;
                            break;

                        case 'danos-materiales-cubiertasshh':
                            daniosMaterialesTemp.cubiertaSSHH = a.valor;
                            break;

                        case 'danos-materiales-cubiertapasillo':
                            daniosMaterialesTemp.cubiertaPasillo = a.valor;
                            break;

                        case 'danos-materiales-cubiertadormitorios':
                            daniosMaterialesTemp.cubiertaDormitorios = a.valor;
                            break;

                        case 'danos-materiales-cubiertagarage':
                            daniosMaterialesTemp.cubiertaGarage = a.valor;
                            break;

                        case 'danos-materiales-cubiertaadadicionales':
                            daniosMaterialesTemp.cubiertaEdAdicionales = a.valor;
                            break;

                        case 'danos-materiales-cubiertapatio':
                            daniosMaterialesTemp.cubiertaPatioJardin = a.valor;
                            break;

                        /*case 'danos-materiales-piso':
              = a.valor;
              break;*/

                        case 'danos-materiales-pisovestibulo':
                            daniosMaterialesTemp.pisoVestibulo = a.valor;
                            break;

                        case 'danos-materiales-pisocomedor':
                            daniosMaterialesTemp.pisoComedor = a.valor;
                            break;

                        case 'danos-materiales-pisopasillo':
                            daniosMaterialesTemp.pisoPasillo = a.valor;
                            break;

                        case 'danos-materiales-pisococina':
                            daniosMaterialesTemp.pisoCocina = a.valor;
                            break;
                        case 'danos-materiales-pisosshh':
                            daniosMaterialesTemp.pisoSSHH = a.valor;
                            break;

                        case 'danos-materiales-pisodormitorios':
                            daniosMaterialesTemp.pisoDormitorios = a.valor;
                            break;

                        case 'danos-materiales-pisogarage':
                            daniosMaterialesTemp.pisoGarage = a.valor;
                            break;

                        case 'danos-materiales-pisoadadicionales':
                            daniosMaterialesTemp.pisoEdAdicionales = a.valor;
                            break;

                        case 'danos-materiales-pisopatio':
                            daniosMaterialesTemp.pisoPatioJardin = a.valor;
                            break;

                        /*case 'danos-materiales-entrepiso':
              daniosMaterialesTemp.entrepisoVestibulo = a.valor;
              break;*/

                        case 'danos-materiales-entrepisovestibulo':
                            daniosMaterialesTemp.entrepisoVestibulo = a.valor;
                            break;

                        case 'danos-materiales-entrepisocomedor':
                            daniosMaterialesTemp.entrepisoComedor = a.valor;
                            break;

                        case 'danos-materiales-entrepisopasillo':
                            daniosMaterialesTemp.entrepisoPasillo = a.valor;
                            break;

                        case 'danos-materiales-entrepisococina':
                            daniosMaterialesTemp.entrepisoCocina = a.valor;
                            break;

                        case 'danos-materiales-entrepisosshh':
                            daniosMaterialesTemp.entrepisoSSHH = a.valor;
                            break;

                        case 'danos-materiales-entrepisodormitorios':
                            daniosMaterialesTemp.entrepisoDormitorios = a.valor;
                            break;

                        case 'danos-materiales-entrepisogarage':
                            daniosMaterialesTemp.entrepisoGarage = a.valor;
                            break;

                        case 'danos-materiales-entrepisoadadicionales':
                            daniosMaterialesTemp.entrepisoEdAdicionales = a.valor;
                            break;

                        case 'danos-materiales-entrepisopatio':
                            daniosMaterialesTemp.entrepisoPatioJardin = a.valor;
                            break;

                        /*case 'danos-materiales-columnas':
              = a.valor;
              break;*/

                        case 'danos-materiales-columnasvestibulo':
                            daniosMaterialesTemp.columnasVestibulo = a.valor;
                            break;

                        case 'danos-materiales-columnascomedor':
                            daniosMaterialesTemp.columnasComedor = a.valor;
                            break;

                        case 'danos-materiales-columnaspasillo':
                            daniosMaterialesTemp.columnasPasillo = a.valor;
                            break;

                        case 'danos-materiales-columnascocina':
                            daniosMaterialesTemp.columnasCocina = a.valor;
                            break;

                        case 'danos-materiales-columnassshh':
                            daniosMaterialesTemp.columnasSSHH = a.valor;
                            break;

                        case 'danos-materiales-columnasdormitorios':
                            daniosMaterialesTemp.columnasDormitorios = a.valor;
                            break;

                        case 'danos-materiales-columnasgarage':
                            daniosMaterialesTemp.columnasGarage = a.valor;
                            break;

                        case 'danos-materiales-columnasadadicionales':
                            daniosMaterialesTemp.columnasEdAdicionales = a.valor;
                            break;

                        case 'danos-materiales-columnaspatio':
                            daniosMaterialesTemp.columnasPatioJardin = a.valor;
                            break;

                        /*case 'danos-materiales-ventanas':
              = a.valor;
              break;*/

                        case 'danos-materiales-ventanasvestibulo':
                            daniosMaterialesTemp.ventanasVestibulo = a.valor;
                            break;

                        case 'danos-materiales-ventanascomedor':
                            daniosMaterialesTemp.ventanasComedor = a.valor;
                            break;

                        case 'danos-materiales-ventanaspasillo':
                            daniosMaterialesTemp.ventanasPasillo = a.valor;
                            break;

                        case 'danos-materiales-ventanascocina':
                            daniosMaterialesTemp.ventanasCocina = a.valor;
                            break;

                        case 'danos-materiales-ventanassshh':
                            daniosMaterialesTemp.ventanasSSHH = a.valor;
                            break;

                        case 'danos-materiales-ventanasdormitorios':
                            daniosMaterialesTemp.ventanasDormitorios = a.valor;
                            break;

                        case 'danos-materiales-ventanasgarage':
                            daniosMaterialesTemp.ventanasGarage = a.valor;
                            break;

                        case 'danos-materiales-ventanasadadicionales':
                            daniosMaterialesTemp.ventanasEdAdicionales = a.valor;
                            break;

                        case 'danos-materiales-ventanaspatio':
                            daniosMaterialesTemp.ventanasPatioJardin = a.valor;
                            break;

                        case 'danos-materiales-bienesmuebles':
                            daniosMaterialesTemp.BienesMuebles = a.valor;
                            break;

                        case 'danos-materiales-foto1':
                            daniosMaterialesTemp.foto1 = a.valor;
                            break;
                        case 'danos-materiales-foto2':
                            daniosMaterialesTemp.foto2 = a.valor;
                            break;
                        case 'danos-materiales-foto3':
                            daniosMaterialesTemp.foto3 = a.valor;
                            break;

                        case 'recursos-coem':
                            coepersonasI = a.valor;
                            break;

                        case 'recursos-msp':
                            msppersonasI = a.valor;
                            break;

                        case 'recursos-cruzroja':
                            cruzrojapersonasI = a.valor;
                            break;

                        case 'recursos-amt':
                            amtpersonasI = a.valor;
                            break;

                        case 'recursos-epmaps':
                            epmapspersonasI = a.valor;
                            break;

                        case 'recursos-emaseo':
                            emaseopersonasI = a.valor;
                            break;

                        case 'recursos-emgirs':
                            emgirspersonasI = a.valor;
                            break;

                        case 'recursos-zonales':
                            administracioneszonalespersonasI = a.valor;
                            break;

                        case 'recursos-consejoprovincial':
                            consejoprovincialdepichinchapersonasI = a.valor;
                            break;

                        case 'recursos-ministerioobraspublicas':
                            ministeriodeobraspublicaspersonasI = a.valor;
                            break;

                        case 'recursos-policianacional':
                            policianacionalpersonasI = a.valor;
                            break;


                        case 'recursos-eeq':
                            eeqpersonasI = a.valor;
                            break;

                        case 'recursos-amc':
                            amcpersonasI = a.valor;
                            break;

                        case 'recursos-cbq':
                            cbqpersonasI = a.valor;
                            break;

                        case 'recursos-panavial':
                            panavialpersonasI = a.valor;
                            break;

                        case 'recursos-epmmop':
                            epmmoppersonasI = a.valor;
                            break;

                        case 'recursos-direcgestionriesgos':
                            dmgrpersonasI = a.valor;
                            break;

                        case 'recursos-agentescontrol':
                            cacmpersonasI = a.valor;
                            break;

                        case 'recursos-iess':
                            iesspersonasI = a.valor;
                            break;

                        case 'recursos-siat':
                            siatpersonasI = a.valor;
                            break;

                        case 'recursos-iepatrimonio':
                            imppersonasI = a.valor;
                            break;

                        case 'recursos-dirriesgos':
                            secretariaseguridadriesgosI = a.valor;
                            break;

                        case 'recursos-gobernabilidad':
                            secretariaseguridadgobernabilidadI = a.valor;
                            break;

                        case 'recursos-segciudadana':
                            secretariaseguridadseguridadI = a.valor;
                            break;

                        case 'recursos-tenenciapolitica':
                            tenenciapoliticapersonasI = a.valor;
                            break;

                        case 'recursos-ant':
                            antrecursospersonasI = a.valor;
                            break;

                        case 'dg-02-fechallamada':
                            auxFechadg02 = a.valor;
                            break;

                        case 'dg-02-horallamada':
                            fecha1amt = auxFechadg02 + ' ' + a.valor;
                            let fechaEmergenciaIAMC1;
                            if (fecha1amt !== '') {
                                fechaEmergenciaIAMC1 = new Date(fecha1amt);
                            } else {
                                fechaEmergenciaIAMC1 = new Date();
                            }
                            auxFechaLlamadaAmc = new Date(fechaEmergenciaIAMC1);
                            fechasLlamadaAux = new Date(fechaEmergenciaIAMC1.setHours(fechaEmergenciaIAMC1.getHours() - 5));


                            break;

                        case 'dg-02-fechadespacho':
                            fechaFindg02 = a.valor;
                            break;

                        case 'dg-02-horadespacho':
                            fecha2amt = fechaFindg02 + ' ' + a.valor;
                            if (fecha2amt !== '') {
                                fecha2amtAux = new Date(fecha2amt).toString();
                            } else {
                                fecha2amtAux = new Date().toString();
                            }
                            break;

                        case 'dg-02-fechaarriborecursos':
                            auxArriboRecursos02 = a.valor;
                            break;

                        case 'dg-02-horaarriborecursos':
                            fecha3amt = auxArriboRecursos02 + '' + a.valor;
                            if (fecha3amt !== '') {
                                fecha3amtAux = new Date(fecha3amt).toString();
                            } else {
                                fecha3amtAux = new Date().toString();
                            }
                            break;

                        case 'dg-02-fechafinalizacion':
                            finalizacion02 = a.valor;
                            break;

                        case 'dg-02-horafinalizacion':
                            fecha4amt = finalizacion02 + ' ' + a.valor;
                            if (fecha4amt !== '') {
                                fecha4amtAux = new Date(fecha4amt).toString();
                            } else {
                                fecha4amtAux = new Date().toString();
                            }
                            break;

                        case 'dg-02-seguimiento':
                            seguimientoAMT = a.valor;
                            break;

                        case 'dg-02-foto1':
                            imagenOtra1I = a.valor;
                            if (imagenOtra1I === null) {
                                imagenOtra1I = '';
                            }
                            break;

                        case 'dg-02-foto2':
                            imagenOtra2I = a.valor;
                            if (imagenOtra2I === null) {
                                imagenOtra2I = '';
                            }
                            break;

                        case 'dg-02-foto3':
                            imagenOtra3I = a.valor;
                            if (imagenOtra3I === null) {
                                imagenOtra3I = '';
                            }
                            break;

                        /*case 'acciones-realizadas-operativocontrol':
              exhortoVerbalCheck =a.valor;
              break;

            case 'acciones-realizadas-subclaeve':
              numExhortoVerbal =a.valor;
              break;*/

                        case 'acciones-realizadas-verbal':
                            exhortoVerbalCheck = a.valor;
                            break;

                        case 'acciones-realizadas-exhortoverbal':
                            numExhortoVerbal = a.valor;
                            break;

                        case 'acciones-realizadas-exhortoescrito':
                            exhortoEscritoCheck = a.valor;
                            break;

                        case 'acciones-realizadas-nexhortoescrito':
                            numExhortoEscrito = a.valor;
                            break;

                        case 'acciones-realizadas-areasujetacontrol':
                            cintaAreaControlCheck = a.valor;
                            break;
                        case 'acciones-realizadas-nareasujetacontrol':
                            cintaAreaControlValor = a.valor;
                            break;

                        case 'acciones-realizadas-suspencioobra':
                            selloSuspencionCheck = a.valor;
                            break;

                        case 'acciones-realizadas-nselloobra':
                            numSelloObra = a.valor;
                            break;

                        case 'acciones-realizadas-selloclausura':
                            selloClausuraCheck = a.valor;
                            break;

                        case 'acciones-realizadas-nselloclausura':
                            numSello1 = a.valor;
                            break;

                        case 'acciones-realizadas-actosinicio':
                            actuacionesInicioCheck = a.valor;
                            break;

                        case 'acciones-realizadas-nactosinicio':
                            numActos = a.valor;
                            break;

                        case 'acciones-realizadas-actuacionesprevias':
                            actuacionesPreviasCheck = a.valor;
                            break;

                        case 'acciones-realizadas-nactuaciones':
                            numActuaciones = a.valor;
                            break;

                        case 'acciones-realizadas-retenciones':
                            retencionesCheck = a.valor;
                            break;

                        case 'acciones-realizadas-nactare':
                            numActaRetenciones = a.valor;
                            break;

                        case 'acciones-realizadas-nombreproducto1':
                            producto1Nombre = a.valor;
                            break;

                        case 'acciones-realizadas-retencionesproducto1':
                            numRetencionesProducto1 = a.valor;
                            break;

                        case 'acciones-realizadas-nombreproducto2':
                            producto2Nombre = a.valor;
                            break;

                        case 'acciones-realizadas-retencionesproducto2':
                            numRetencionesProducto2 = a.valor;
                            break;

                        case 'acciones-realizadas-nombreproducto3':
                            producto3Nombre = a.valor;
                            break;

                        case 'acciones-realizadas-retencionesproducto3':
                            numRetencionesProducto3 = a.valor;
                            break;

                        case 'acciones-realizadas-nombreproducto4':
                            producto4Nombre = a.valor;
                            break;

                        case 'acciones-realizadas-retencionesproducto4':
                            numRetencionesProducto4 = a.valor;
                            break;

                        case 'acciones-realizadas-nombreproducto5':
                            producto5Nombre = a.valor;
                            break;

                        case 'acciones-realizadas-retencionesproducto5':
                            numRetencionesProducto5 = a.valor;
                            break;

                        case 'acciones-realizadas-nombreproducto6':
                            producto6Nombre = a.valor;
                            break;

                        case 'acciones-realizadas-retencionesproducto6':
                            numRetencionesProducto6 = a.valor;
                            break;

                        case 'acciones-realizadas-nombreproducto7':
                            producto7Nombre = a.valor;
                            break;

                        case 'acciones-realizadas-retencionesproducto7':
                            numRetencionesProducto7 = a.valor;
                            break;

                        case 'acciones-realizadas-nombreproducto8':
                            producto8Nombre = a.valor;
                            break;

                        case 'acciones-realizadas-retencionesproducto8':
                            numRetencionesProducto8 = a.valor;
                            break;

                        case 'acciones-realizadas-nombreproducto9':
                            producto9Nombre = a.valor;
                            break;

                        case 'acciones-realizadas-retencionesproducto9':
                            numRetencionesProducto9 = a.valor;
                            break;

                        case 'acciones-realizadas-nombreproducto10':
                            producto10Nombre = a.valor;
                            break;

                        case 'acciones-realizadas-retencionesproducto10':
                            numRetencionesProducto10 = a.valor;
                            break;

                        case 'acciones-realizadas-rescateanimales':
                            rescateAnimalesAmcAux = a.valor;
                            break;

                        case 'acciones-realizadas-numerorescateanimales':
                            numRescateAnimalesAmcAux = a.valor;
                            break;

                        case 'acciones-realizadas-nombresapellidosamc':
                            nombresAmcForm = a.valor;
                            break;

                        case 'acciones-realizadas-patrullareaccion':
                            patrullaReaccionValor = a.valor;
                            break;

                        /*case 'seg-comun-descripcin':
              =a.valor;
              break;

            case 'file-seg-comun-foto1':
              =a.valor;
              break;

            case 'file-seg-comun-foto2':
              =a.valor;
              break;

            case 'file-seg-comun-foto3':
              =a.valor;
              break;
*/

                        case 'coor-ope-amc-fechainicio':
                            auxAmcFechaInicio12 = a.valor;
                            break;

                        case 'coor-ope-amc-horainicio':
                            fecha_inicio_opI = auxAmcFechaInicio12 + ' ' + a.valor;
                            let fechaEmergenciaIAMC2;
                            if (fecha_inicio_opI !== '') {
                                fechaEmergenciaIAMC2 = new Date(fecha_inicio_opI);
                            } else {
                                fechaEmergenciaIAMC2 = new Date();
                            }
                            auxFechaLlamadaAmc = new Date(fechaEmergenciaIAMC2);
                            fechasLlamadaAux = new Date(fechaEmergenciaIAMC2.setHours(fechaEmergenciaIAMC2.getHours() - 5));

                            break;

                        case 'coor-ope-amc-fechafin':
                            auxAmcFechaFin12 = a.valor;

                            break;

                        case 'coor-ope-amc-horafin':
                            fecha_fin_opI = auxAmcFechaFin12 + ' ' + a.valor;
                            if (fecha_fin_opI !== '') {
                                fecha2amtAux = new Date(fecha_fin_opI).toString();
                            } else {
                                fecha2amtAux = new Date().toString();
                            }
                            break;

                        case 'coor-ope-amc-localesinspeccionados':
                            locales_inspeccionadosI = a.valor;
                            break;

                        case 'coor-ope-amc-malusoluae':
                            exhortos_verbales_por_mal_uso_luaeI = a.valor;
                            break;

                        case 'coor-ope-amc-exhortonotenerluae':
                            exhortos_verbales_por_no_tener_luaeI = a.valor;
                            break;

                        case 'coor-ope-amc-exhortoescritonotenerluae':
                            exhortos_escritos_por_no_tener_luaeI = a.valor;
                            break;

                        case 'coor-ope-amc-exhortoescritomalusoluae':
                            exhortos_escritos_por_mal_uso_luaeI = a.valor;
                            break;

                        case 'coor-ope-amc-actoinicionotenerluae':
                            actos_de_inicio_por_no_tener_luaeI = a.valor;
                            break;

                        case 'coor-ope-amc-actosiniciomalusoluae':
                            actos_de_inicio_por_mal_uso_luaeI = a.valor;
                            break;

                        case 'coor-ope-amc-selloclausura':
                            sellos_clausura_establecimientoI = a.valor;
                            break;

                        case 'coor-ope-amc-fiestaclandestina':
                            fiestas_clandestinasI = a.valor;
                            break;

                        case 'coor-ope-amc-nightclubs':
                            night_clubsI = a.valor;
                            break;

                        case 'coor-ope-amc-canchasdeportivas':
                            canchas_deportivasI = a.valor;
                            break;

                        case 'coor-ope-amc-parquesintervenidos':
                            parques_intervenidosI = a.valor;
                            break;

                        case 'coor-ope-amc-bardiscotecas':
                            discotecasI = a.valor;
                            break;

                        case 'coor-ope-amc-galleras':
                            gallerasI = a.valor;
                            break;

                        case 'coor-ope-amc-corridadetoros':
                            corridas_de_torosI = a.valor;
                            break;

                        case 'coor-ope-amc-personasaglomeradas':
                            personas_aglomeradas_disuadidas_bioseguridadI = a.valor;
                            break;

                        case 'coor-ope-amc-exhortoverbaldistanciamiento':
                            exhortos_verbales_por_distanciamientoI = a.valor;
                            break;

                        case 'coor-ope-amc-exhortoverbalmascarilla':
                            exhortos_verbales_por_mascarillaI = a.valor;
                            break;

                        case 'coor-ope-amc-exhortoescritodistanciamiento':
                            exhortos_escritos_por_distanciamientoI = a.valor;
                            break;

                        case 'coor-ope-amc-actosiniciodistanciamiento':
                            actos_de_inicio_por_distanciamientoI = a.valor;
                            break;

                        case 'coor-ope-amc-actosiniciomascarilla':
                            actos_de_inicio_por_mascarillaI = a.valor;
                            break;

                        case 'coor-ope-amc-personasaglomeradasdisuadidas':
                            personas_aglomeradas_disuadidasI = a.valor;
                            break;

                        case 'coor-ope-amc-exhortoverbalnormasbioseguridad':
                            exhortos_verbales_por_normas_bioseguridadI = a.valor;
                            break;

                        case 'coor-ope-amc-exhortoescritonormasbioseguridad':
                            exhortos_escritos_por_normas_bioseguridadI = a.valor;
                            break;

                        case 'coor-ope-amc-actosinicionormasbioseguridad':
                            actos_de_inicio_por_normas_bioseguridadI = a.valor;
                            break;

                        case 'coor-ope-amc-pucasrevisados':
                            pucas_revisadosI = a.valor;
                            break;

                        case 'coor-ope-amc-ventasinformalesretiradas':
                            ventas_informales_retiradasI = a.valor;
                            break;

                        case 'coor-ope-amc-actosinicioventasinformales':
                            actos_inicio_ventas_informalesI = a.valor;
                            break;

                        case 'coor-ope-amc-libadoresretirados':
                            libadores_retiradosI = a.valor;
                            break;

                        case 'coor-ope-amc-actosiniciolibadores':
                            actos_inicio_libadoresI = a.valor;
                            break;

                        case 'coor-ope-amc-bebidasalcoholicasdestruidas':
                            bebidas_alcoholicas_destruidasI = a.valor;
                            break;

                        case 'coor-ope-amc-exhortomalusoespaciopublico':
                            exhortos_por_mal_uso_espacio_publicoI = a.valor;
                            break;

                        case 'coor-ope-amc-actosiniciomalusoespaciopublico':
                            actos_de_inicio_por_mal_uso_espacio_publicoI = a.valor;
                            break;

                        case 'coor-ope-amc-numeroretencionespresuntosdelicuentes':
                            numero_retenciones_presuntos_delincuentesI = a.valor;
                            break;

                        case 'coor-ope-amc-icumplimientotoquequeda':
                            incumplimientoToqueQuedaAmcI = a.valor;
                            break;

                        case 'coor-ope-amc-nombreproducto1':
                            nombre_producto_1I = a.valor;
                            break;

                        case 'coor-ope-amc-retencionesproducto1':
                            numero_producto_1I = a.valor;
                            break;

                        case 'coor-ope-amc-nombreproducto2':
                            nombre_producto_2I = a.valor;
                            break;

                        case 'coor-ope-amc-retencionesproducto2':
                            numero_producto_2I = a.valor;
                            break;

                        case 'coor-ope-amc-nombreproducto3':
                            nombre_producto_3I = a.valor;
                            break;

                        case 'coor-ope-amc-retencionesproducto3':
                            numero_producto_3I = a.valor;
                            break;

                        case 'coor-ope-amc-nombreproducto4':
                            nombre_producto_4I = a.valor;
                            break;

                        case 'coor-ope-amc-retencionesproducto4':
                            numero_producto_4I = a.valor;
                            break;

                        case 'coor-ope-amc-nombreproducto5':
                            nombre_producto_5I = a.valor;
                            break;

                        case 'coor-ope-amc-retencionesproducto5':
                            numero_producto_5I = a.valor;
                            break;

                        case 'coor-ope-amc-nombreproducto6':
                            nombre_producto_6I = a.valor;
                            break;

                        case 'coor-ope-amc-retencionesproducto6':
                            numero_producto_6I = a.valor;
                            break;

                        case 'coor-ope-amc-nombreproducto7':
                            nombre_producto_7I = a.valor;
                            break;

                        case 'coor-ope-amc-retencionesproducto7':
                            numero_producto_7I = a.valor;
                            break;

                        case 'coor-ope-amc-nombreproducto8':
                            nombre_producto_8I = a.valor;
                            break;

                        case 'coor-ope-amc-retencionesproducto8':
                            numero_producto_8I = a.valor;
                            break;

                        case 'coor-ope-amc-nombreproducto9':
                            nombre_producto_9I = a.valor;
                            break;

                        case 'coor-ope-amc-retencionesproducto9':
                            numero_producto_9I = a.valor;
                            break;

                        case 'coor-ope-amc-nombreproducto10':
                            nombre_producto_10I = a.valor;
                            break;

                        case 'coor-ope-amc-retencionesproducto10':
                            numero_producto_10I = a.valor;
                            break;

                        case 'camara-foto1cooropeacmc':
                            imagenOtra1I = a.valor;
                            if (imagenOtra1I === null) {
                                imagenOtra1I = '';
                            }
                            break;

                        case 'coor-ope-amc-seguimiento':
                            apoyo_seguridadAmcI = a.valor;
                            break;

                        case 'camara-foto2cooropeamc':
                            imagenOtra2I = a.valor;
                            if (imagenOtra2I === null) {
                                imagenOtra2I = '';
                            }
                            break;

                        case 'camara-foto2cooropeacmc':
                            imagenOtra3I = a.valor;
                            if (imagenOtra3I === null) {
                                imagenOtra3I = '';
                            }
                            break;

                        case 'coor-ope-cacmq-fechainicio':
                            auxFechacacmIni = a.valor;
                            break;

                        case 'coor-ope-cacmq-horainicio':
                            fecha_inicio_cacmI = auxFechacacmIni + ' ' + a.valor;
                            let fechaEmergenciaIAMC;
                            if (fecha_inicio_cacmI !== '') {
                                fechaEmergenciaIAMC = new Date(fecha_inicio_cacmI);
                            } else {
                                fechaEmergenciaIAMC = new Date();
                            }
                            auxFechaLlamadaAmc = new Date(fechaEmergenciaIAMC);
                            fechasLlamadaAux = new Date(fechaEmergenciaIAMC.setHours(fechaEmergenciaIAMC.getHours() - 5));

                            break;

                        case 'coor-ope-cacmq-fechafin':
                            auxFechacacmFin = a.valor;
                            break;

                        case 'coor-ope-cacmq-horafin':
                            fecha_fin_cacmI = auxFechacacmFin + ' ' + a.valor;
                            if (fecha_fin_cacmI !== '') {
                                fecha2amtAux = new Date(fecha_fin_cacmI).toString();
                            } else {
                                fecha2amtAux = new Date().toString();
                            }
                            break;

                        case 'coor-ope-cacmq-localesinspeccionados':
                            recintosInspecionados_cacmI = a.valor;
                            break;

                        case 'coor-ope-cacmq-personasaglomeradas':
                            numero_personas_aglomeradas_disuadidasI = a.valor;
                            break;

                        case 'coor-ope-cacmq-exhortoverbaldistanciamiento':
                            numero_exhortos_verbales_por_distanciamientoI = a.valor;
                            break;

                        case 'coor-ope-cacmq-exhortoverbalmascarilla':
                            numero_exhortos_verbales_por_mascarillaI = a.valor;
                            break;

                        case 'coor-ope-cacmq-ventasinformalesretiradas':
                            numero_ventas_informales_retiradasI = a.valor;
                            break;

                        case 'coor-ope-cacmq-libadoresretirados':
                            numero_libadores_retiradosI = a.valor;
                            break;

                        case 'coor-ope-cacmq-bebidasalcoholicasdestruidas':
                            numero_bebidas_alcoholicas_destruidasI = a.valor;
                            break;

                        case 'coor-ope-cacmqngrafiteros':
                            numero_grafiterosI = a.valor;
                            break;

                        case 'coor-ope-cacmq-puntoshumedos':
                            numero_puntos_humedosI = a.valor;
                            break;

                        case 'coor-ope-cacmq-icumplimientotoquequeda':
                            incumplimientoToqueQueda_cacmI = a.valor;
                            break;

                        case 'coor-ope-cacmq-fiestaclandestina':
                            fiestasClandestinas_cacmI = a.valor;
                            break;

                        case 'coor-ope-cacmq-numeroretencionespresuntosdelicuentes':
                            numero_retenciones_presuntos_delincuentesI = a.valor;
                            break;

                        case 'coor-ope-cacmq-informacionturistica':
                            numero_informacion_turisticaI = a.valor;
                            break;

                        case 'coor-ope-cacmq-informacionciudadana':
                            numero_informacion_ciudadanaI = a.valor;
                            break;

                        case 'coor-ope-cacmq-victimacontrapudor':
                            numero_victima_en_contra_del_pudorI = a.valor;
                            break;

                        case 'coor-ope-cacmq-primerosauxilios':
                            numero_primeros_auxiliosI = a.valor;
                            break;

                        case 'coor-ope-cacmq-seguimiento':
                            seguimiento_cacmI = a.valor;
                            break;

                        case 'acciones-recomendaciones-acciones':
                            accionesRealizadasI = a.valor;
                            break;

                        case 'acciones-recomendaciones-recomendaciones':
                            recomendacionesI = a.valor;
                            break;


                        default:
                            cidadanosI.push(ciudanoTemp);
                            daniosMaterialesI.push(daniosMaterialesTemp);
                            break;

                    }


                }

                const fechaNFInc = new Date(tipoIncidente.fecha_creacion);
                const itemNew = {
                    event_id: idI,
                    content: tipoI,
                    start: fechaNFInc,
                    className: 'yellow',
                };
                console.log('fecha ', fechaLlamadaI)
                fechaEmergenciaI = new Date(fechaLlamadaI);
                fechaEmergenciaFec = ('0' + fechaEmergenciaI.getDate()).slice(-2) +
                    '-' +
                    ('0' + (fechaEmergenciaI.getMonth() + 1)).slice(-2) +
                    '-' +
                    fechaEmergenciaI.getFullYear();
                fechaEmergenciaHor = ('0' + fechaEmergenciaI.getHours()).slice(-2) +
                    ':' +
                    ('0' + fechaEmergenciaI.getMinutes()).slice(-2);

                const dt1 = fechaEmergenciaI.getDay();
                if (dt1 === 0) {
                    nombreDiaCodAnt = 7;
                } else {
                    nombreDiaCodAnt = dt1;
                }
                // estadoEmergenciaI = tipoIncidente.estado_incidente;
                // estadoEmergenciaCodAntI = -1;
                diffDespachoArriboI = '';
                if (fechaLlamadaI !== '' && fechaArriboRecursosI !== '') {
                    const auxFechaI = new Date(fechaLlamadaI);
                    const auxFechaArribo = new Date(fechaArriboRecursosI);
                    const resultado = auxFechaArribo.getTime() - auxFechaI.getTime();
                    diffDespachoArriboI = moment.utc(resultado).format('HH:mm:ss');
                }

                if (fechaArriboRecursosI !== '' && fechaFinalizacionI !== '') {
                    const auxFechaFinaI = new Date(fechaArriboRecursosI);
                    const auxFechaArriboI = new Date(fechaFinalizacionI);
                    const resultado = auxFechaFinaI.getTime() - auxFechaArriboI.getTime();
                    diffLlamadaDespachoI = moment.utc(resultado).format('HH:mm:ss');
                }

                if (fechaFinalizacionI !== '' && fechaLlamadaI !== '') {
                    const auxFechaFinaliI = new Date(fechaArriboRecursosI);
                    const auxFechaLlamadaI = new Date(fechaFinalizacionI);
                    const resultado = auxFechaFinaliI.getTime() - auxFechaLlamadaI.getTime();
                    diffLlamadaFinalizacionI = moment.utc(resultado).format('HH:mm:ss');
                }
                if (nombreDiaCodAnt < 6 && categoriaDiaCodAntI !== '3') {
                    categoriaDiaCodAntI = '1';
                }
                if (nombreDiaCodAnt === 6 || nombreDiaCodAnt === 7) {
                    categoriaDiaCodAntI = '2';
                }
            }
            const arregloFamilia = [];
            const arregloFamiliaData = [];
            const arregloFamiliaDataC = [];
            const tamanio = cidadanosI.length;
            const dataDD = [];
            cidadanosI.sort(compareAA);
            for (let ppp = 0; ppp < tamanio; ppp++) {
                const asistenciaCiud = [];
                asistenciaCiud.push(cidadanosI[ppp].familia);
                if (cidadanosI[ppp].vestimenta === true) {
                    asistenciaCiud.push('Si');
                } else {
                    asistenciaCiud.push('No');
                }
                if (cidadanosI[ppp].calzado === true) {
                    asistenciaCiud.push('Si');
                } else {
                    asistenciaCiud.push('No');
                }
                if (cidadanosI[ppp].frazada === true) {
                    asistenciaCiud.push('Si');
                } else {
                    asistenciaCiud.push('No');
                }
                if (cidadanosI[ppp].alimentosPerecibles === true) {
                    asistenciaCiud.push('Si');
                } else {
                    asistenciaCiud.push('No');
                }
                if (cidadanosI[ppp].alimentosNoPerecibles === true) {
                    asistenciaCiud.push('Si');
                } else {
                    asistenciaCiud.push('No');
                }
                if (cidadanosI[ppp].kitHigiene === true) {
                    asistenciaCiud.push('Si');
                } else {
                    asistenciaCiud.push('No');
                }
                if (cidadanosI[ppp].bienesMuebles === true) {
                    asistenciaCiud.push('Si');
                } else {
                    asistenciaCiud.push('No');
                }
                const dataCiudadanos = [];
                dataCiudadanos.push(cidadanosI[ppp].nombre);
                dataCiudadanos.push(cidadanosI[ppp].sexo);
                dataCiudadanos.push(cidadanosI[ppp].edad);
                dataCiudadanos.push(cidadanosI[ppp].parentesco);
                dataCiudadanos.push(cidadanosI[ppp].vestimentaTalla);
                dataCiudadanos.push(cidadanosI[ppp].calzadoTalla);
                dataCiudadanos.push(cidadanosI[ppp].cedula);
                if (arregloFamilia.indexOf(cidadanosI[ppp].familia) === -1) {
                    if (generosafectadaI === 'Femenino') {
                        generosafectadaI = 2;
                    }
                    if (generosafectadaI === 'Masculino') {
                        generosafectadaI = 1;
                    }
                    arregloFamilia.push(cidadanosI[ppp].familia);
                    const arregloTenEe = [];
                    arregloTenEe.push(dataCiudadanos);
                    arregloFamiliaData.push(arregloTenEe);
                    const arregloTenEeC = [];
                    arregloTenEeC.push(cidadanosI[ppp]);
                    arregloFamiliaDataC.push(arregloTenEeC);
                    dataDD.push(asistenciaCiud);
                } else {
                    arregloFamiliaData[arregloFamilia.indexOf(cidadanosI[ppp].familia)].push(dataCiudadanos);
                    arregloFamiliaDataC[arregloFamilia.indexOf(cidadanosI[ppp].familia)].push(cidadanosI[ppp]);
                }
            }
            if (nombresafectadaI !== '' && nombresafectadaI != null) {
                numfamiliasafectadaI = arregloFamilia.length.toString();
            } else {
                numfamiliasafectadaI = '';
            }
            const zone = 0;
            const coorde = new ConvertirlogLataUTM();
            const resultadoUTM = coorde.cmdLat2UTM_click(longitud, latitud, zone);
            const latitudUTM = resultadoUTM[0];
            const longitudUTM = resultadoUTM[1];
            const zonaUTM = resultadoUTM[2];
            const referenciaI = tipoIncidente.descripcion_ubicacion;

            const hash = {};
            cidadanosI = cidadanosI.filter(o => hash[o.nombre] ? false : hash[o.nombre] = true);

            const hash1 = {};
            // tslint:disable:max-line-length
            daniosMaterialesI = daniosMaterialesI.filter(o => hash1[o.tipovivirnda] ? false : hash1[o.tipovivirnda] = true);
            recursosI = (coepersonasI ? 'COEPERSONAS=' + coepersonasI + ', ' : '') +
                (coecamionetasI ? 'COECAMIONETAS=' + coecamionetasI + ', ' : '') +
                (coevolquetasI ? 'COEVOLQUETAS=' + coevolquetasI + ', ' : '') +
                (coeminicargadorasI ? 'COEMINICARGADORAS=' + coeminicargadorasI + ', ' : '') +
                (coeretroescavadorasI ? 'COERETROESCAVADORAS=' + coeretroescavadorasI + ', ' : '') +
                (coemaquinariapesadaI ? 'COEMAQUINARIAPESADA=' + coemaquinariapesadaI + ', ' : '') +
                (cbqpersonasI ? 'CBQPERSONAS=' + cbqpersonasI + ', ' : '') +
                (cbqcamionetasI ? 'CBQCAMIONETAS=' + cbqcamionetasI + ', ' : '') +
                (cbqestacionesI ? 'CBQESTACIONES=' + cbqestacionesI + ', ' : '') +
                (cbqambulanciasAI ? 'CBQAMBULANCIASA=' + cbqambulanciasAI + ', ' : '') +
                (cbqautobombasBI ? 'CBQAUTOBOMBASB=' + cbqautobombasBI + ', ' : '') +
                (cbqtanquerosTI ? 'CBQTANQUEROST=' + cbqtanquerosTI + ', ' : '') +
                (cbqunidadesderescateI ? 'CBQUNIDADESDERESCATE=' + cbqunidadesderescateI + ', ' : '') +
                (cbqmotosI ? 'CBQMOTOS=' + cbqmotosI + ', ' : '') +
                (cbqunidaddematerialespeligrososI ? 'CBQUNIDADDEMATERIALESPELIGROSOS=' + cbqunidaddematerialespeligrososI + ', ' : '') +
                (cbqunidaddefuerzadetareaI ? 'CBQUNIDADDEFUERZADETAREA=' + cbqunidaddefuerzadetareaI + ', ' : '') +
                (cbqbusesI ? 'CBQBUSES=' + cbqbusesI + ', ' : '') +
                (cbqhelipcopterosI ? 'CBQHELIPCOPTEROS=' + cbqhelipcopterosI + ', ' : '') +
                (cbqdarlyI ? 'CBQDARLY=' + cbqdarlyI + ', ' : '') +
                (cbqnodrizaI ? 'CBQNODRIZA=' + cbqnodrizaI + ', ' : '') +
                (cbqpolivalenteI ? 'CBQPOLIVALENTE=' + cbqpolivalenteI + ', ' : '') +
                (cbqunimogI ? 'CBQUNIMOG=' + cbqunimogI + ', ' : '') +
                (msppersonasI ? 'MSPPERSONAS=' + msppersonasI + ', ' : '') +
                (mspambulanciasAI ? 'MSPAMBULANCIASA=' + mspambulanciasAI + ', ' : '') +
                (cruzrojapersonasI ? 'CRUZROJAPERSONAS=' + cruzrojapersonasI + ', ' : '') +
                (cruzrojaambulanciasAI ? 'CRUZROJAAMBULANCIASA=' + cruzrojaambulanciasAI + ', ' : '') +
                (cacmpersonasI ? 'CACMPERSONAS=' + cacmpersonasI + ', ' : '') +
                (cacmcamionetasI ? 'CACMCAMIONETAS=' + cacmcamionetasI + ', ' : '') +
                (cacmmotosI ? 'CACMMOTOS=' + cacmmotosI + ', ' : '') +
                (cacmbusesI ? 'CACMBUSES=' + cacmbusesI + ', ' : '') +
                (cacmcantersI ? 'CACMCANTERS=' + cacmcantersI + ', ' : '') +
                (cacmvehiculosI ? 'CACMVEHICULOS=' + cacmvehiculosI + ', ' : '') +
                (cacmgruposderescateI ? 'CACMGRUPOSDERESCATE=' + cacmgruposderescateI + ', ' : '') +
                (amtpersonasI ? 'AMTPERSONAS=' + amtpersonasI + ', ' : '') +
                (amtcamionetasI ? 'AMTCAMIONETAS=' + amtcamionetasI + ', ' : '') +
                (amtmotosI ? 'AMTMOTOS=' + amtmotosI + ', ' : '') +
                (amcpersonasI ? 'AMCPERSONAS=' + amcpersonasI + ', ' : '') +
                (amcvehiculosI ? 'AMCVEHICULOS=' + amcvehiculosI + ', ' : '') +
                (epmapspersonasI ? 'EPMAPSPERSONAS=' + epmapspersonasI + ', ' : '') +
                (epmapscamionetasI ? 'EPMAPSCAMIONETAS=' + epmapscamionetasI + ', ' : '') +
                (epmapsvolquetasI ? 'EPMAPSVOLQUETAS=' + epmapsvolquetasI + ', ' : '') +
                (epmapsmaquinariapesadaI ? 'EPMAPSMAQUINARIAPESADA=' + epmapsmaquinariapesadaI + ', ' : '') +
                (epmapstanquerosTI ? 'EPMAPSTANQUEROST=' + epmapstanquerosTI + ', ' : '') +
                (epmapshidrosuccionadoresI ? 'EPMAPSHIDROSUCCIONADORES=' + epmapshidrosuccionadoresI + ', ' : '') +
                (epmapseductoresI ? 'EPMAPSEDUCTORES=' + epmapseductoresI + ', ' : '') +
                (epmmoppersonasI ? 'EPMMOPPERSONAS=' + epmmoppersonasI + ', ' : '') +
                (epmmopcamionetasI ? 'EPMMOPCAMIONETAS=' + epmmopcamionetasI + ', ' : '') +
                (epmmopvolquetasI ? 'EPMMOPVOLQUETAS=' + epmmopvolquetasI + ', ' : '') +
                (epmmopminicargadorasI ? 'EPMMOPMINICARGADORAS=' + epmmopminicargadorasI + ', ' : '') +
                (epmmopmaquinariapesadaI ? 'EPMMOPMAQUINARIAPESADA=' + epmmopmaquinariapesadaI + ', ' : '') +
                (epmmoptanquerosTI ? 'EPMMOPTANQUEROST=' + epmmoptanquerosTI + ', ' : '') +
                (emaseopersonasI ? 'EMASEOPERSONAS=' + emaseopersonasI + ', ' : '') +
                (emaseocamionetasI ? 'EMASEOCAMIONETAS=' + emaseocamionetasI + ', ' : '') +
                (emaseovolquetasI ? 'EMASEOVOLQUETAS=' + emaseovolquetasI + ', ' : '') +
                (emaseomaquinariapesadaI ? 'EMASEOMAQUINARIAPESADA=' + emaseomaquinariapesadaI + ', ' : '') +
                (emgirspersonasI ? 'EMGIRSPERSONAS=' + emgirspersonasI + ', ' : '') +
                (emgirscamionetasI ? 'EMGIRSCAMIONETAS=' + emgirscamionetasI + ', ' : '') +
                (emgirsvolquetasI ? 'EMGIRSVOLQUETAS=' + emgirsvolquetasI + ', ' : '') +
                (emgirsmaquinariapesadaI ? 'EMGIRSMAQUINARIAPESADA=' + emgirsmaquinariapesadaI + ', ' : '') +
                (administracioneszonalespersonasI ? 'ADMINISTRACIONESZONALESPERSONAS=' + administracioneszonalespersonasI + ', ' : '') +
                (administracioneszonalescamionetasI ? 'ADMINISTRACIONESZONALESCAMIONETAS=' + administracioneszonalescamionetasI + ', ' : '') +
                (administracioneszonalesvolquetasI ? 'ADMINISTRACIONESZONALESVOLQUETAS=' + administracioneszonalesvolquetasI + ', ' : '') +
                (administracioneszonalesmaquinariapesadaI ? 'ADMINISTRACIONESZONALESMAQUINARIAPESADA=' + administracioneszonalesmaquinariapesadaI + ', ' : '') +
                (eeqpersonasI ? 'EEQPERSONAS=' + eeqpersonasI + ', ' : '') +
                (eeqcamionetasI ? 'EEQCAMIONETAS=' + eeqcamionetasI + ', ' : '') +
                (eeqmaquinariapesadaI ? 'EEQMAQUINARIAPESADA=' + eeqmaquinariapesadaI + ', ' : '') +
                (consejoprovincialdepichinchapersonasI ? 'CONSEJOPROVINCIALDEPICHINCHAPERSONAS=' + consejoprovincialdepichinchapersonasI + ', ' : '') +
                (consejoprovincialdepichinchacamionetasI ? 'CONSEJOPROVINCIALDEPICHINCHACAMIONETAS=' + consejoprovincialdepichinchacamionetasI + ', ' : '') +
                (consejoprovincialdepichinchavolquetasI ? 'CONSEJOPROVINCIALDEPICHINCHAVOLQUETAS=' + consejoprovincialdepichinchavolquetasI + ', ' : '') +
                (consejoprovincialdepichinchamaquinariapesadaI ? 'CONSEJOPROVINCIALDEPICHINCHAMAQUINARIAPESADA=' + consejoprovincialdepichinchamaquinariapesadaI + ', ' : '') +
                (panavialpersonasI ? 'PANAVIALPERSONAS=' + panavialpersonasI + ', ' : '') +
                (panavialcamionetasI ? 'PANAVIALCAMIONETAS=' + panavialcamionetasI + ', ' : '') +
                (panavialvolquetasI ? 'PANAVIALVOLQUETAS=' + panavialvolquetasI + ', ' : '') +
                (panavialmaquinariapesadaI ? 'PANAVIALMAQUINARIAPESADA=' + panavialmaquinariapesadaI + ', ' : '') +
                (panavialambulanciasAI ? 'PANAVIALAMBULANCIASA=' + panavialambulanciasAI + ', ' : '') +
                (ministeriodeobraspublicaspersonasI ? 'MINISTERIODEOBRASPUBLICASPERSONAS=' + ministeriodeobraspublicaspersonasI + ', ' : '') +
                (ministeriodeobraspublicascamionetasI ? 'MINISTERIODEOBRASPUBLICASCAMIONETAS=' + ministeriodeobraspublicascamionetasI + ', ' : '') +
                (ministeriodeobraspublicasvolquetasI ? 'MINISTERIODEOBRASPUBLICASVOLQUETAS=' + ministeriodeobraspublicasvolquetasI + ', ' : '') +
                (ministeriodeobraspublicasmaquinariapesadaI ? 'MINISTERIODEOBRASPUBLICASMAQUINARIAPESADA=' + ministeriodeobraspublicasmaquinariapesadaI + ', ' : '') +
                (policianacionalpersonasI ? 'POLICIANACIONALPERSONAS=' + policianacionalpersonasI + ', ' : '') +
                (policianacionalambulanciasAI ? 'POLICIANACIONALAMBULANCIASA=' + policianacionalambulanciasAI + ', ' : '') +
                (policianacionalmotosI ? 'POLICIANACIONALMOTOS=' + policianacionalmotosI + ', ' : '') +
                (policianacionalbusesI ? 'POLICIANACIONALBUSES=' + policianacionalbusesI + ', ' : '') +
                (policianacionalcamionesI ? 'POLICIANACIONALCAMIONES=' + policianacionalcamionesI + ', ' : '') +
                (policianacionalpatrullasI ? 'POLICIANACIONALPATRULLAS=' + policianacionalpatrullasI + ', ' : '') +
                (policianacionalcanterasI ? 'POLICIANACIONALCANTERAS=' + policianacionalcanterasI + ', ' : '') +
                (policianacionalhelipcopterosI ? 'POLICIANACIONALHELIPCOPTEROS=' + policianacionalhelipcopterosI + ', ' : '') +
                (policianacionalequinosI ? 'POLICIANACIONALEQUINOS=' + policianacionalequinosI + ', ' : '') +
                (policianacionalgirI ? 'POLICIANACIONALGIR=' + policianacionalgirI + ', ' : '') +
                (policianacionalgoeI ? 'POLICIANACIONALGOE=' + policianacionalgoeI + ', ' : '') +
                (policianacionalupmaI ? 'POLICIANACIONALUPMA=' + policianacionalupmaI + ', ' : '') +
                (policianacionaldinapenI ? 'POLICIANACIONALDINAPEN=' + policianacionaldinapenI + ', ' : '') +
                (policianacionalmigracionI ? 'POLICIANACIONALMIGRACION=' + policianacionalmigracionI + ', ' : '') +
                (policianacionalumoI ? 'POLICIANACIONALUMO=' + policianacionalumoI + ', ' : '') +
                (policianacionalgomI ? 'POLICIANACIONALGOM=' + policianacionalgomI + ', ' : '') +
                (policianacionalintendenciaI ? 'POLICIANACIONALINTENDENCIAPOLICIA=' + policianacionalintendenciaI + ', ' : '') +
                (fuerzasarmadaspersonasI ? 'FUERZASARMADASPERSONAS=' + fuerzasarmadaspersonasI + ', ' : '') +
                (fuerzasarmadascamionetasI ? 'FUERZASARMADASCAMIONETAS=' + fuerzasarmadascamionetasI + ', ' : '') +
                (fuerzasarmadasvolquetasI ? 'FUERZASARMADASVOLQUETAS=' + fuerzasarmadasvolquetasI + ', ' : '') +
                (fuerzasarmadasmaquinariapesadaI ? 'FUERZASARMADASMAQUINARIAPESADA=' + fuerzasarmadasmaquinariapesadaI + ', ' : '') +
                (fuerzasarmadastanquerosTI ? 'FUERZASARMADASTANQUEROST=' + fuerzasarmadastanquerosTI + ', ' : '') +
                (fuerzasarmadasbusesI ? 'FUERZASARMADASBUSES=' + fuerzasarmadasbusesI + ', ' : '') +
                (fuerzasarmadascamionesI ? 'FUERZASARMADASCAMIONES=' + fuerzasarmadascamionesI + ', ' : '') +
                (fuerzasarmadashelipcopterosI ? 'FUERZASARMADASHELIPCOPTEROS=' + fuerzasarmadashelipcopterosI + ', ' : '') +
                (fuerzasarmadasjeepsI ? 'FUERZASARMADASJEEPS=' + fuerzasarmadasjeepsI + ', ' : '') +
                (fuerzasarmadasavionesI ? 'FUERZASARMADASAVIONES=' + fuerzasarmadasavionesI + ', ' : '') +
                (fuerzasarmadasgruposderescateI ? 'FUERZASARMADASGRUPOSDERESCATE=' + fuerzasarmadasgruposderescateI + ', ' : '') +
                (iesspersonasI ? 'IESSPERSONAS=' + iesspersonasI + ', ' : '') +
                (iessambulanciasAI ? 'IESSAMBULANCIASA=' + iessambulanciasAI + ', ' : '') +
                (dmgrpersonasI ? 'DMGRPERSONAS=' + dmgrpersonasI + ', ' : '') +
                (dmgrcamionetasI ? 'DMGRCAMIONETAS=' + dmgrcamionetasI + ', ' : '') +
                (siatpersonasI ? 'SIATPERSONAS=' + siatpersonasI + ', ' : '') +
                (siatvehiculosI ? 'SIATVEHICULOS=' + siatvehiculosI + ', ' : '') +
                (imppersonasI ? 'IMPPERSONAS=' + imppersonasI + ', ' : '') +
                (impcamionesI ? 'IMPCAMIONES=' + impcamionesI + ', ' : '') +

                (tenenciapoliticapersonasI ? 'TENENCIAPOLITICAPERSONAS=' + tenenciapoliticapersonasI + ', ' : '') +
                (tenenciapoliticavehiculosI ? 'TENENCIAPOLITICAPERSONAS=' + tenenciapoliticavehiculosI + ', ' : '') +
                (antrecursospersonasI ? 'ANTPERSONAS=' + antrecursospersonasI + ', ' : '') +
                (antrecursosvehiculosI ? 'ANTVEHICULOS' + antrecursosvehiculosI + ', ' : '') +

                (secretariaseguridadriesgosI ? 'SECRETARIASEGURIDADDIRECCIONRIESGOS=' + secretariaseguridadriesgosI + ', ' : '') +
                (secretariaseguridadgobernabilidadI ? 'SECRETARIASEGURIDADGOBERNABILIDAD=' + secretariaseguridadgobernabilidadI + ', ' : '') +
                (secretariaseguridadseguridadI ? 'SECRETARIASEGURIDADSEGURIDADCIUDADANA=' + secretariaseguridadseguridadI + ', ' : '');

            fechaEmergenciaI = new Date(fechaLlamadaI);

            console.log('fecha 1', fechaEmergenciaI)

            fechaEmergenciaFec = ('0' + fechaEmergenciaI.getDate()).slice(-2) +
                '-' +
                ('0' + (fechaEmergenciaI.getMonth() + 1)).slice(-2) +
                '-' +
                fechaEmergenciaI.getFullYear();
            fechaEmergenciaHor = ('0' + fechaEmergenciaI.getHours()).slice(-2) +
                ':' +
                ('0' + fechaEmergenciaI.getMinutes()).slice(-2);
            const dt = fechaEmergenciaI.getDay();
            if (dt === 0) {
                nombreDiaCodAnt = 7;
            } else {
                nombreDiaCodAnt = dt;
            }
            if (auxFechaOtroI === false) {
                fechasLlamadaAux = new Date(fechaEmergenciaI.setHours(fechaEmergenciaI.getHours() - 5));

            }
            console.log(fechasLlamadaAux)

            if (fechasLlamadaAux === null || fechasLlamadaAux === '' || fechasLlamadaAux === undefined) {
                fechasLlamadaAux = new Date();
            }

            datosTipo = {

                id: fichaEcuI,
                Fecha: fechasLlamadaAux,
                descripcion: descripcionI,
                fondoEmergencia: fondoEmergenciaI,
                fondoEmergenciaCod: fondoEmergenciaCodI,
                fechaLlamadaFec: fechaLlamadaI,
                fechaLlamadaHor: fechaLlamadaI,
                fechaDespachoFec: fechaDespachoI,
                fechaDespachoHor: fechaDespachoI,
                zona: zonaUTM,
                fechaArriboRecursosFec: fechaArriboRecursosI,
                fechaArriboRecursosHor: fechaArriboRecursosI,
                fechaFinalizacionFec: fechaFinalizacionI,
                fechaFinalizacionHor: fechaFinalizacionI,
                tipo: tipoI,
                tipoCod: tipoCodI,
                tipoCodAnt: tipoCodAntI,
                subtipo: subtipoI,
                subtipoCod: subtipoCodI,
                subtipoCodAnt: subtipoCodAntI,
                semaforo: semaforoI,
                simbolo,
                colorItem,
                fechaEmergenciaFec,
                fechaInspeccion: fechaInspeccionI,
                fichaEcu: fichaEcuI,
                fechaLlamada: fechaLlamadaI,
                fechaDespacho: fechaDespachoI,
                fechaArriboRecursos: fechaArriboRecursosI,
                fechaFinalizacion: fechaFinalizacionI,
                reportadoPor: reportadoPorI,
                reportadoPorCodAnt: reportadoPorCodAntI,
                movimientovolumen: movimientovolumenI,
                movimientoniveldeevento: movimientoniveldeeventoI,
                movimientomovilidadviasprioritarias: movimientomovilidadviasprioritariasI,
                inundacionescalado: inundacionescaladoI,
                inundacionescausa: inundacionescausaI,
                inundacionesafectacionesmovilidad: inundacionesafectacionesmovilidadI,
                inundacionesniveldeevento: inundacionesniveldeeventoI,
                incendioarea: incendioareaI,
                indenciohectareas: indenciohectareasI,
                incendiomaterialescombustibles: incendiomaterialescombustiblesI,
                indencionivelevento: indencioniveleventoI,
                categoriaDia: categoriaDiaI,
                categoriaDiaCodAnt: categoriaDiaCodAntI,
                aguapotable: aguapotableI,
                alcantarillado: alcantarilladoI,
                areasnaturalesprotegidasybosquesprotectores: areasnaturalesprotegidasybosquesprotectoresI,
                educacion: educacionI,
                energiaehidrocarburos: energiaehidrocarburosI,
                estatal: estatalI,
                instalacionesdeprimerarespuesta: instalacionesdeprimerarespuestaI,
                municipal: municipalI,
                patrimonial: patrimonialI,
                privado: privadoI,
                salud: saludI,
                seguridad: seguridadI,
                telecomunicaciones: telecomunicacionesI,
                transporte: transporteI,
                coepersonas: coepersonasI,
                coecamionetas: coecamionetasI,
                coevolquetas: coevolquetasI,
                coeminicargadoras: coeminicargadorasI,
                coeretroescavadoras: coeretroescavadorasI,
                coemaquinariapesada: coemaquinariapesadaI,
                cbqpersonas: cbqpersonasI,
                cbqcamionetas: cbqcamionetasI,
                cbqestaciones: cbqestacionesI,
                cbqambulanciasA: cbqambulanciasAI,
                cbqautobombasB: cbqautobombasBI,
                cbqtanquerosT: cbqtanquerosTI,
                cbqunidadesderescate: cbqunidadesderescateI,
                cbqmotos: cbqmotosI,
                cbqunidaddematerialespeligrosos: cbqunidaddematerialespeligrososI,
                cbqunidaddefuerzadetarea: cbqunidaddefuerzadetareaI,
                cbqbuses: cbqbusesI,
                cbqhelipcopteros: cbqhelipcopterosI,
                cbqpolivalente: cbqpolivalenteI,
                cbqdarly: cbqdarlyI,
                cbqnodriza: cbqnodrizaI,
                cbqunimog: cbqunimogI,
                msppersonas: msppersonasI,
                mspambulanciasA: mspambulanciasAI,
                cruzrojapersonas: cruzrojapersonasI,
                cruzrojaambulanciasA: cruzrojaambulanciasAI,
                cacmpersonas: cacmpersonasI,
                cacmcamionetas: cacmcamionetasI,
                cacmmotos: cacmmotosI,
                cacmbuses: cacmbusesI,
                cacmcanters: cacmcantersI,
                cacmvehiculos: cacmvehiculosI,
                cacmgruposderescate: cacmgruposderescateI,
                amtpersonas: amtpersonasI,
                amtcamionetas: amtcamionetasI,
                amtmotos: amtmotosI,
                amcpersonas: amcpersonasI,
                amcvehiculos: amcvehiculosI,
                epmapspersonas: epmapspersonasI,
                epmapscamionetas: epmapscamionetasI,
                epmapsvolquetas: epmapsvolquetasI,
                epmapsmaquinariapesada: epmapsmaquinariapesadaI,
                epmapstanquerosT: epmapstanquerosTI,
                epmapshidrosuccionadores: epmapshidrosuccionadoresI,
                epmapseductores: epmapseductoresI,
                epmmoppersonas: epmmoppersonasI,
                epmmopcamionetas: epmmopcamionetasI,
                epmmopvolquetas: epmmopvolquetasI,
                epmmopminicargadoras: epmmopminicargadorasI,
                epmmopmaquinariapesada: epmmopmaquinariapesadaI,
                epmmoptanquerosT: epmmoptanquerosTI,
                emaseopersonas: emaseopersonasI,
                emaseocamionetas: emaseocamionetasI,
                emaseovolquetas: emaseovolquetasI,
                emaseomaquinariapesada: emaseomaquinariapesadaI,
                emgirspersonas: emgirspersonasI,
                emgirscamionetas: emgirscamionetasI,
                emgirsvolquetas: emgirsvolquetasI,
                emgirsmaquinariapesada: emgirsmaquinariapesadaI,
                administracioneszonalespersonas: administracioneszonalespersonasI,
                administracioneszonalescamionetas: administracioneszonalescamionetasI,
                administracioneszonalesvolquetas: administracioneszonalesvolquetasI,
                administracioneszonalesmaquinariapesada: administracioneszonalesmaquinariapesadaI,
                eeqpersonas: eeqpersonasI,
                eeqcamionetas: eeqcamionetasI,
                eeqmaquinariapesada: eeqmaquinariapesadaI,
                consejoprovincialdepichinchapersonas: consejoprovincialdepichinchapersonasI,
                consejoprovincialdepichinchacamionetas: consejoprovincialdepichinchacamionetasI,
                consejoprovincialdepichinchavolquetas: consejoprovincialdepichinchavolquetasI,
                consejoprovincialdepichinchamaquinariapesada: consejoprovincialdepichinchamaquinariapesadaI,
                panavialpersonas: panavialpersonasI,
                panavialcamionetas: panavialcamionetasI,
                panavialvolquetas: panavialvolquetasI,
                panavialmaquinariapesada: panavialmaquinariapesadaI,
                panavialambulanciasA: panavialambulanciasAI,
                ministeriodeobraspublicaspersonas: ministeriodeobraspublicaspersonasI,
                ministeriodeobraspublicascamionetas: ministeriodeobraspublicascamionetasI,
                ministeriodeobraspublicasvolquetas: ministeriodeobraspublicasvolquetasI,
                ministeriodeobraspublicasmaquinariapesada: ministeriodeobraspublicasmaquinariapesadaI,
                policianacionalpersonas: policianacionalpersonasI,
                policianacionalambulanciasA: policianacionalambulanciasAI,
                policianacionalmotos: policianacionalmotosI,
                policianacionalbuses: policianacionalbusesI,
                policianacionalcamiones: policianacionalcamionesI,
                policianacionalpatrullas: policianacionalpatrullasI,
                policianacionalcanteras: policianacionalcanterasI,
                policianacionalhelipcopteros: policianacionalhelipcopterosI,
                policianacionalequinos: policianacionalequinosI,
                policianacionalgir: policianacionalgirI,
                policianacionalgoe: policianacionalgoeI,
                fuerzasarmadaspersonas: fuerzasarmadaspersonasI,
                fuerzasarmadascamionetas: fuerzasarmadascamionetasI,
                fuerzasarmadasvolquetas: fuerzasarmadasvolquetasI,
                fuerzasarmadasmaquinariapesada: fuerzasarmadasmaquinariapesadaI,
                fuerzasarmadastanquerosT: fuerzasarmadastanquerosTI,
                fuerzasarmadasbuses: fuerzasarmadasbusesI,
                fuerzasarmadascamiones: fuerzasarmadascamionesI,
                fuerzasarmadashelipcopteros: fuerzasarmadashelipcopterosI,
                fuerzasarmadasjeeps: fuerzasarmadasjeepsI,
                fuerzasarmadasaviones: fuerzasarmadasavionesI,
                fuerzasarmadasgruposderescate: fuerzasarmadasgruposderescateI,
                iesspersonas: iesspersonasI,
                iessambulanciasA: iessambulanciasAI,
                dmgrpersonas: dmgrpersonasI,
                dmgrcamionetas: dmgrcamionetasI,
                siatpersonas: siatpersonasI,
                siatvehiculos: siatvehiculosI,
                imppersonas: imppersonasI,
                impcamiones: impcamionesI,
                botton1: `<td>
                      <a  href='#' class='btn btn-primary nowfor' data-dismiss='modal'>Informe</a>
                      <a  href='#' class='btn btn-primary nowforGE' data-dismiss='modal'>Informe GE</a>
                    </td>`,
                botton: `<td>
                    <a  href='#' class='btn btn-primary prel'>Preliminar</a>
                    <a  href='#' class='btn btn-primary seg'>Seguimiento</a>
                    <a  href='#' class='btn btn-primary cier'>Cierre</a>
                  </td>`,


                cidadanos: cidadanosI,
                numpersonasafectada: numeroPersonaAfectadaI,
                numeroViviendasAfectadas: numeroViviendasAfectadasI,
                numeroViviendasAfectadasPatrimoniales: numeroViviendasAfectadasPatrimonialesI,
                numeroViviendasDestruidas: numeroViviendasDestruidasI,
                numeroViviendasDestruidasPatrimoniales: numeroViviendasDestruidasPatrimonialesI,
                arregloAsitenciaFamilia: arregloAsitenciaFamiliaI,
                nombreIncidenteGFI,
                ascistenciabasicainicialGF: ascistenciabasicainicialGFI,
                ascistenciabasicainicialValorGF: ascistenciabasicainicialValorGFI,
                bienesMueblesGF: bienesMueblesGFI,
                bienesMueblesValorGF: bienesMueblesValorGFI,
                bienesInMueblesGF: bienesInMueblesGFI,
                bienesInMueblesValorGF: bienesInMueblesValorGFI,
                gastosMortuoriosGF: gastosMortuoriosGFI,
                gastosMortuoriosValorGF: gastosMortuoriosValorGFI,
                suministrosMaterialesGF: suministrosMaterialesGFI,
                suministrosMaterialesValorGF: suministrosMaterialesValorGFI,
                cuadrillasDeEmergenciaGF: cuadrillasDeEmergenciaGFI,
                cuadrillasDeEmergenciaValorGF: cuadrillasDeEmergenciaValorGFI,
                asistenciaAlSISGF: asistenciaAlSISGFI,
                cantidadAsistenciaAlSISGF: cantidadAsistenciaAlSISGFI,
                barrio: barrioI,
                administracioZonal: administracioZonalI,
                parroquia: parroquiaI,
                barrioCod: barrioCodI,
                administracioZonalCod: administracioZonalCodI,
                parroquiaCod: parroquiaCodI,
                latitud,
                longitud,
                daniosMateriales: daniosMaterialesI,
                accionesRealizadas: accionesRealizadasI,
                recomendaciones: recomendacionesI,
                direccion: direccionI,
                calles: direccionI,
                coordenadaX: latitudUTM,
                coordenadaY: longitudUTM,
                nombreDiaCodAnt: nombreDiaCodAnt !== undefined ? nombreDiaCodAnt : '',
                estadoEmergencia: estadoEmergenciaI,
                diffDespachoArribo: diffDespachoArriboI,
                diffLlamadaDespacho: diffLlamadaDespachoI,
                diffLlamadaFinalizacion: diffLlamadaFinalizacionI,
                referencia: referenciaI,
                estadoEmergenciaCodAnt: estadoEmergenciaCodAntI,
                numfamiliasafectada: numfamiliasafectadaI,
                nombresafectada: nombresafectadaI,
                edadesafectada: edadesafectadaI,
                generosafectada: generosafectadaI,
                numpersonasevacuada: numpersonasevacuadaI,
                numfamiliasevacuada: numfamiliasevacuadaI,
                nombresevacuada: nombresevacuadaI,
                edadesevacuada: edadesevacuadaI,
                generosevacuada: generosevacuadaI,
                numpersonasdamnificada: numpersonasdamnificadaI,
                numfamiliasdamnificada: numfamiliasdamnificadaI,
                nombresdamnificada: nombresdamnificadaI,
                edadesdamnificada: edadesdamnificadaI,
                generosdamnificada: generosdamnificadaI,
                numpersonasenfamiliaacogiente: numpersonasenfamiliaacogienteI,
                numfamiliasenfamiliaacogiente: numfamiliasenfamiliaacogienteI,
                nombresenfamiliaacogiente: nombresenfamiliaacogienteI,
                edadesenfamiliaacogiente: edadesenfamiliaacogienteI,
                generosenfamiliaacogiente: generosenfamiliaacogienteI,
                numpersonasreubicadas: numpersonasreubicadasI,
                numfamiliasreubicadas: numfamiliasreubicadasI,
                nombresreubicadas: nombresreubicadasI,
                edadesreubicadas: edadesreubicadasI,
                generosreubicadas: generosreubicadasI,
                numpersonasdesaparecido: numpersonasdesaparecidoI,
                numfamiliasdesaparecido: numfamiliasdesaparecidoI,
                nombresdesaparecido: nombresdesaparecidoI,
                edadesdesaparecido: edadesdesaparecidoI,
                generosdesaparecido: generosdesaparecidoI,
                numpersonasalbergada: numpersonasalbergadaI,
                numfamiliasalbergada: numfamiliasalbergadaI,
                nombresalbergada: nombresalbergadaI,
                edadesalbergada: edadesalbergadaI,
                generosalbergada: generosalbergadaI,
                alberguealbergada: alberguealbergadaI,
                numpersonasheridos: numpersonasheridosI,
                numfamiliasheridos: numfamiliasheridosI,
                nombresheridos: nombresheridosI,
                edadesheridos: edadesheridosI,
                generosheridos: generosheridosI,
                medicoheridos: medicoheridosI,
                casasaludheridos: casasaludheridosI,
                diagnosticoheridos: diagnosticoheridosI,
                albergueheridos: albergueheridosI,
                numpersonasfallecidos: numpersonasfallecidosI,
                numfamiliasfallecidos: numfamiliasfallecidosI,
                nombresfallecidos: nombresfallecidosI,
                edadesfallecidos: edadesfallecidosI,
                generosfallecidos: generosfallecidosI,
                medicofallecidos: medicofallecidosI,
                casasaludfallecidos: casasaludfallecidosI,
                diagnosticofallecidos: diagnosticofallecidosI,
                alberguefallecidos: alberguefallecidosI,
                numpersonasnacionalesdesaparecidas: numpersonasnacionalesdesaparecidasI,
                numpersonasextranjerasdesaparecidas: numpersonasextranjerasdesaparecidasI,
                numeroFaunaUrbana: numeroFaunaUrbanaI,
                recursos: recursosI,
                factura: facturaI,
                recomendacionesFE: recomendacionesFEI,
                accionesRealizadasFE: accionesRealizadasFEI,
                imagenFE1: imagen1FEI,
                imagenFE2: imagen2FEI,
                imagenF33: imagen3FEI,
                foto1: imagenOtra1I,
                foto2: imagenOtra2I,
                foto3: imagenOtra3I,
                nombreResponsableFE: nombreResponsableFEI,
                cargoResponsableFE: cargoResponsableFEI,
                resposabilidadResponsableFE: responsabilidadResponsableFEI,
                firmaResponsableFE: firmaResponsableFEI,
                nombreAprobacionFE: nombreAprobacionFEI,
                cargoAprobacionFE: cargoAprobacionFEI,
                responsabilidadAprobacionFE: responsabilidadAprobacionFEI,
                firmaAprobacionFE: firmaAprobacionFEI,
                personalIncidenteFE: personalIncidenteI,
                amt: amtI,
                votaciones: votacionesI,
                fecha1Llamada: auxFechaLlamadaAmc,
                fecha2Despacho: fecha2amtAux,
                fecha3ArriboRecurso: fecha3amtAux,
                fecha4Finalizacion: fecha4amtAux,
                seguimientoAmt: seguimientoAMT,
                reportadoPorAmc: repordatoPorAMC,
                centroControl: centroControlI,
                exhortoVerbalCheckA: exhortoVerbalCheck,
                numExhortoVerbalA: numExhortoVerbal,
                exhortoEscritoCheckA: exhortoEscritoCheck,
                numExhortoEscritoA: numExhortoEscrito,
                cintaAreaControlCheckA: cintaAreaControlCheck,
                cintaAreaControlValorA: cintaAreaControlValor,
                selloSuspencionCheckA: selloSuspencionCheck,
                numSelloObraA: numSelloObra,
                selloClausuraCheckA: selloClausuraCheck,
                numSello1A: numSello1,
                actuacionesInicioCheckA: actuacionesInicioCheck,
                numActosA: numActos,
                actuacionesPreviasCheckA: actuacionesPreviasCheck,
                numActuacionesA: numActuaciones,
                retencionesCheckA: retencionesCheck,
                numActaRetencionesA: numActaRetenciones,
                producto1CheckA: producto1Check,
                producto1NombreA: producto1Nombre,
                numRetencionesProducto1A: numRetencionesProducto1,
                producto2CheckA: producto2Check,
                producto2NombreA: producto2Nombre,
                numRetencionesProducto2A: numRetencionesProducto2,
                producto3CheckA: producto3Check,
                producto3NombreA: producto3Nombre,
                numRetencionesProducto3A: numRetencionesProducto3,
                producto4CheckA: producto4Check,
                producto4NombreA: producto4Nombre,
                numRetencionesProducto4A: numRetencionesProducto4,
                producto5CheckA: producto5Check,
                producto5NombreA: producto5Nombre,
                numRetencionesProducto5A: numRetencionesProducto5,
                producto6CheckA: producto6Check,
                producto6NombreA: producto6Nombre,
                numRetencionesProducto6A: numRetencionesProducto6,
                producto7CheckA: producto7Check,
                producto7NombreA: producto7Nombre,
                numRetencionesProducto7A: numRetencionesProducto7,
                producto8CheckA: producto8Check,
                producto8NombreA: producto8Nombre,
                numRetencionesProducto8A: numRetencionesProducto8,
                producto9CheckA: producto9Check,
                producto9NombreA: producto9Nombre,
                numRetencionesProducto9A: numRetencionesProducto9,
                producto10CheckA: producto10Check,
                producto10NombreA: producto10Nombre,
                numRetencionesProducto10A: numRetencionesProducto10,
                nombresAmcFormA: nombresAmcForm,
                patrullaReaccionCheckA: patrullaReaccionCheck,
                patrullaReaccionValorA: patrullaReaccionValor,
                enlaceGoogle: 'https://www.google.com.ec/maps/@' + latitud + ',' + longitud + ',21z',
                subClasificacionEventosAmc: subClasificacionEventosAmcAux,
                rescateAnimalesAmc: rescateAnimalesAmcAux,
                numRescateAnimalesAmc: numRescateAnimalesAmcAux,
                operativoControlAmc: operativoControlAmcAux,

                // nuevos

                emaseo: emaseoI,
                epmmop: epmmopI,
                epmaps: epmapsI,
                eeq: eeqI,
                operativo: operativoI,

                licenciamientoF: licenciamientoDatosI,
                espacioPublicoDatosF: espacioPublicoDatosI,
                bioseguridadDatosF: bioseguridadDatosI,
                residuosSolidosDatosF: residuosSolidosDatosI,
                faunaDatosF: faunaDatosI,
                construccionesDatosF: construccionesDatosI,

                locales_inspeccionados: locales_inspeccionadosI,
                exhortos_verbales_por_mal_uso_luae: exhortos_verbales_por_mal_uso_luaeI,
                exhortos_verbales_por_no_tener_luae: exhortos_verbales_por_no_tener_luaeI,
                exhortos_escritos_por_mal_uso_luae: exhortos_escritos_por_mal_uso_luaeI,
                exhortos_escritos_por_no_tener_luae: exhortos_escritos_por_no_tener_luaeI,
                actos_de_inicio_por_mal_uso_luae: actos_de_inicio_por_mal_uso_luaeI,
                actos_de_inicio_por_no_tener_luae: actos_de_inicio_por_no_tener_luaeI,
                sellos_clausura_establecimiento: sellos_clausura_establecimientoI,
                fiestas_clandestinas: fiestas_clandestinasI,
                night_clubs: night_clubsI,
                canchas_deportivas: canchas_deportivasI,
                parques_intervenidos: parques_intervenidosI,
                discotecas: discotecasI,
                galleras: gallerasI,
                corridas_de_toros: corridas_de_torosI,
                personas_aglomeradas_disuadidas_bioseguridad: personas_aglomeradas_disuadidas_bioseguridadI,
                exhortos_verbales_por_distanciamiento: exhortos_verbales_por_distanciamientoI,
                exhortos_verbales_por_mascarilla: exhortos_verbales_por_mascarillaI,
                exhortos_escritos_por_distanciamiento: exhortos_escritos_por_distanciamientoI,
                actos_de_inicio_por_distanciamiento: actos_de_inicio_por_distanciamientoI,
                actos_de_inicio_por_mascarilla: actos_de_inicio_por_mascarillaI,
                personas_aglomeradas_disuadidas: personas_aglomeradas_disuadidasI,
                exhortos_verbales_por_normas_bioseguridad: exhortos_verbales_por_normas_bioseguridadI,
                exhortos_escritos_por_normas_bioseguridad: exhortos_escritos_por_normas_bioseguridadI,
                actos_de_inicio_por_normas_bioseguridad: actos_de_inicio_por_normas_bioseguridadI,
                pucas_revisados: pucas_revisadosI,
                ventas_informales_retiradas: ventas_informales_retiradasI,
                actos_inicio_ventas_informales: actos_inicio_ventas_informalesI,
                libadores_retirados: libadores_retiradosI,
                actos_inicio_libadores: actos_inicio_libadoresI,
                bebidas_alcoholicas_destruidas: bebidas_alcoholicas_destruidasI,
                exhortos_por_mal_uso_espacio_publico: exhortos_por_mal_uso_espacio_publicoI,
                actos_de_inicio_por_mal_uso_espacio_publico: actos_de_inicio_por_mal_uso_espacio_publicoI,
                fecha_inicio_op: fecha_inicio_opI,
                fecha_fin_op: fecha_fin_opI,
                nombre_producto_1: nombre_producto_1I,
                numero_producto_1: numero_producto_1I,
                nombre_producto_2: nombre_producto_2I,
                numero_producto_2: numero_producto_2I,
                nombre_producto_3: nombre_producto_3I,
                numero_producto_3: numero_producto_3I,
                nombre_producto_4: nombre_producto_4I,
                numero_producto_4: numero_producto_4I,
                nombre_producto_5: nombre_producto_5I,
                numero_producto_5: numero_producto_5I,
                nombre_producto_6: nombre_producto_6I,
                numero_producto_6: numero_producto_6I,
                nombre_producto_7: nombre_producto_7I,
                numero_producto_7: numero_producto_7I,
                nombre_producto_8: nombre_producto_8I,
                numero_producto_8: numero_producto_8I,
                nombre_producto_9: nombre_producto_9I,
                numero_producto_9: numero_producto_9I,
                nombre_producto_10: nombre_producto_10I,
                numero_producto_10: numero_producto_10I,
                seguimiento_op: seguimiento_opI,
                numero_personas_aglomeradas_disuadidas: numero_personas_aglomeradas_disuadidasI,
                numero_exhortos_verbales_por_distanciamiento: numero_exhortos_verbales_por_distanciamientoI,
                numero_exhortos_verbales_por_mascarilla: numero_exhortos_verbales_por_mascarillaI,
                numero_ventas_informales_retiradas: numero_ventas_informales_retiradasI,
                numero_libadores_retirados: numero_libadores_retiradosI,
                numero_bebidas_alcoholicas_destruidas: numero_bebidas_alcoholicas_destruidasI,
                numero_grafiteros: numero_grafiterosI,
                numero_puntos_humedos: numero_puntos_humedosI,
                numero_informacion_turistica: numero_informacion_turisticaI,
                numero_informacion_ciudadana: numero_informacion_ciudadanaI,
                numero_victima_en_contra_del_pudor: numero_victima_en_contra_del_pudorI,
                numero_primeros_auxilios: numero_primeros_auxiliosI,
                numero_retenciones_presuntos_delincuentes: numero_retenciones_presuntos_delincuentesI,
                seguimiento_cacm: seguimiento_cacmI,
                fotografia_1_cacm: fotografia_1_cacmI,
                fotografia_2_cacm: fotografia_2_cacmI,
                fotografia_3_cacm: fotografia_3_cacmI,
                fecha_inicio_cacm: fecha_inicio_cacmI,
                fecha_fin_cacm: fecha_fin_cacmI,
                secretariaseguridadriesgos: secretariaseguridadriesgosI,
                secretariaseguridadgobernabilidad: secretariaseguridadgobernabilidadI,
                secretariaseguridadseguridad: secretariaseguridadseguridadI,
                antrecursospersonas: antrecursospersonasI,
                tenenciapoliticapersonas: tenenciapoliticapersonasI,
                antrecursosvehiculos: antrecursosvehiculosI,
                tenenciapoliticavehiculos: tenenciapoliticavehiculosI,
                policianacionalupma: policianacionalupmaI,
                policianacionaldinapen: policianacionaldinapenI,
                policianacionalmigracion: policianacionalmigracionI,
                policianacionalumo: policianacionalumoI,
                policianacionalgom: policianacionalgomI,
                policianacionalintendencia: policianacionalintendenciaI,
                apoyo_seguridadAmc: apoyo_seguridadAmcI,
                incumplimientoToqueQuedaAmc: incumplimientoToqueQuedaAmcI,
                recintosInspecionados_cacm: recintosInspecionados_cacmI,
                incumplimientoToqueQueda_cacm: incumplimientoToqueQueda_cacmI,
                fiestasClandestinas_cacm: fiestasClandestinas_cacmI,
            };
            cidadanosI = [];
            this.insertarOActualizarIncidentes(datosTipo);
        }


    }


    async insertarOActualizarIncidentes(incidentesNowForce) {

        const incidenteConsultado = await this.incidenteNowForceService.seleccionarPorIdNowForce(incidentesNowForce.id);
        try {
            if (incidenteConsultado) {
                await this.incidenteNowForceService.actualizarPorIdNowForce(incidentesNowForce.id, incidentesNowForce);
            } else {
                await this.incidenteNowForceService.insertar(incidentesNowForce);
            }
        } catch (e) {
            Logger.error(`Error al guardar el incidente now force ${JSON.stringify(incidentesNowForce)}`, e.toString(), NowForceTimer.name);
        }

    }


}

function formatoFecha(fechaACadena) {
    return (
        fechaACadena.getFullYear() +
        '-' +
        ('0' + (fechaACadena.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + fechaACadena.getDate()).slice(-2) +
        ' ' +
        ('0' + fechaACadena.getHours()).slice(-2) +
        ':' +
        ('0' + fechaACadena.getMinutes()).slice(-2) +
        ':' +
        ('0' + fechaACadena.getSeconds()).slice(-2)
    );
}

// tslint:disable:max-classes-per-file
class ConvertirlogLataUTM {
    pi = 3.14159265358979;
    sm_a = 6378137.0;
    sm_b = 6356752.314;
    sm_EccSquared = 6.69437999013e-3;
    UTMScaleFactor = 0.9996;
    numerodecimales = 2;

    cmdLat2UTM_click(longitud, latitud, zone) {
        const xy = new Array(2);
        const respuesta = [];
        const long = parseFloat(longitud);
        const lati = parseFloat(latitud);

        zone = Math.floor((long + 180.0) / 6) + 1;
        zone = this.LatLonToUTMXY(
            this.DegToRad(lati),
            this.DegToRad(long),
            zone,
            xy,
        );
        respuesta[0] = xy[0].toFixed(this.numerodecimales);
        respuesta[1] = xy[1].toFixed(this.numerodecimales);
        respuesta[2] = zone;
        if (lati < 0) {
            respuesta[2] += ' S';
        } else {
            respuesta[2] += ' N';
        }
        return respuesta;
    }

    DegToRad(deg) {
        return (deg / 180.0) * this.pi;
    }

    LatLonToUTMXY(lat, lon, zone, xy) {
        this.MapLatLonToXY(lat, lon, this.UTMCentralMeridian(zone), xy);
        xy[0] = xy[0] * this.UTMScaleFactor + 500000.0;
        xy[1] = xy[1] * this.UTMScaleFactor;
        if (xy[1] < 0.0) {
            xy[1] = xy[1] + 10000000.0;
        }
        return zone;
    }

    UTMCentralMeridian(zone) {
        let cmeridian;
        cmeridian = this.DegToRad(-183.0 + zone * 6.0);
        return cmeridian;
    }

    MapLatLonToXY(phi, lambda, lambda0, xy) {
        let N;
        let nu2;
        let ep2;
        let t;
        let t2;
        let l;
        let l3coef;
        let l4coef;
        let l5coef;
        let l6coef;
        let l7coef;
        let l8coef;
        let tmp;
        ep2 =
            (Math.pow(this.sm_a, 2.0) - Math.pow(this.sm_b, 2.0)) /
            Math.pow(this.sm_b, 2.0);
        nu2 = ep2 * Math.pow(Math.cos(phi), 2.0);
        N = Math.pow(this.sm_a, 2.0) / (this.sm_b * Math.sqrt(1 + nu2));
        t = Math.tan(phi);
        t2 = t * t;
        tmp = t2 * t2 * t2 - Math.pow(t, 6.0);
        l = lambda - lambda0;
        l3coef = 1.0 - t2 + nu2;
        l4coef = 5.0 - t2 + 9 * nu2 + 4.0 * (nu2 * nu2);
        l5coef = 5.0 - 18.0 * t2 + t2 * t2 + 14.0 * nu2 - 58.0 * t2 * nu2;
        l6coef = 61.0 - 58.0 * t2 + t2 * t2 + 270.0 * nu2 - 330.0 * t2 * nu2;
        l7coef = 61.0 - 479.0 * t2 + 179.0 * (t2 * t2) - t2 * t2 * t2;
        l8coef = 1385.0 - 3111.0 * t2 + 543.0 * (t2 * t2) - t2 * t2 * t2;
        xy[0] =
            N * Math.cos(phi) * l +
            (N / 6.0) * Math.pow(Math.cos(phi), 3.0) * l3coef * Math.pow(l, 3.0) +
            (N / 120.0) * Math.pow(Math.cos(phi), 5.0) * l5coef * Math.pow(l, 5.0) +
            (N / 5040.0) * Math.pow(Math.cos(phi), 7.0) * l7coef * Math.pow(l, 7.0);

        xy[1] =
            this.ArcLengthOfMeridian(phi) +
            (t / 2.0) * N * Math.pow(Math.cos(phi), 2.0) * Math.pow(l, 2.0) +
            (t / 24.0) *
            N *
            Math.pow(Math.cos(phi), 4.0) *
            l4coef *
            Math.pow(l, 4.0) +
            (t / 720.0) *
            N *
            Math.pow(Math.cos(phi), 6.0) *
            l6coef *
            Math.pow(l, 6.0) +
            (t / 40320.0) *
            N *
            Math.pow(Math.cos(phi), 8.0) *
            l8coef *
            Math.pow(l, 8.0);
        return;
    }

    ArcLengthOfMeridian(phi) {
        let alpha;
        let beta;
        let gamma;
        let delta;
        let epsilon;
        let n;
        let result;
        n = (this.sm_a - this.sm_b) / (this.sm_a + this.sm_b);
        alpha =
            ((this.sm_a + this.sm_b) / 2.0) *
            (1.0 + Math.pow(n, 2.0) / 4.0 + Math.pow(n, 4.0) / 64.0);
        beta =
            (-3.0 * n) / 2.0 +
            (9.0 * Math.pow(n, 3.0)) / 16.0 +
            (-3.0 * Math.pow(n, 5.0)) / 32.0;
        gamma =
            (15.0 * Math.pow(n, 2.0)) / 16.0 + (-15.0 * Math.pow(n, 4.0)) / 32.0;
        delta =
            (-35.0 * Math.pow(n, 3.0)) / 48.0 + (105.0 * Math.pow(n, 5.0)) / 256.0;

        epsilon = (315.0 * Math.pow(n, 4.0)) / 512.0;
        result =
            alpha *
            (phi +
                beta * Math.sin(2.0 * phi) +
                gamma * Math.sin(4.0 * phi) +
                delta * Math.sin(6.0 * phi) +
                epsilon * Math.sin(8.0 * phi));

        return result;
    }
}

function cargarIncidentesSinSubtipo(tipoI) {
    const datosTipo: any = {};
    if (tipoI === 'INCENDIO ESTRUCTURAL') {
        datosTipo.tipoCodI = 71;
        datosTipo.tipoCodAntI = 47;
    } else if (tipoI === 'ACCIDENTE AÉREO') {
        datosTipo.tipoCodI = 96;
        datosTipo.tipoCodAntI = 74;
    } else if (tipoI === 'ACCIDENTE LABORAL') {
        datosTipo.tipoCodI = 75;
        datosTipo.tipoCodI = 75;
        datosTipo.tipoCodAntI = 51;
    } else if (tipoI === 'AGRESIÓN ANIMAL') {
        datosTipo.tipoCodI = 95;
        datosTipo.tipoCodAntI = 73;
    } else if (tipoI === 'AGRESIÓN SEXUAL VIOLACIÓN') {
        datosTipo.tipoCodI = 85;
        datosTipo.tipoCodAntI = 61;
    } else if (tipoI === 'AMAGO DE INCENDIO ESTRUCTURAL') {
        datosTipo.tipoCodI = 26;
        datosTipo.tipoCodAntI = 2;
    } else if (tipoI === 'AMENAZA Y/O ABORTO') {
        datosTipo.tipoCodI = 385;
        datosTipo.tipoCodAntI = 385;
    } else if (tipoI === 'AMENZA DE BOMBA') {
        datosTipo.tipoCodI = 44;
        datosTipo.tipoCodAntI = 20;
    } else if (tipoI === 'ASESINATO') {
        datosTipo.tipoCodI = 27;
        datosTipo.tipoCodAntI = 3;
    } else if (tipoI === 'ATRAPADO APLASTADO') {
        datosTipo.tipoCodI = 45;
        datosTipo.tipoCodAntI = 21;
    } else if (tipoI === 'BALACERA') {
        datosTipo.tipoCodI = 28;
        datosTipo.tipoCodAntI = 4;
    } else if (tipoI === 'BUSQUEDA DE PERSONAS EXTRAVIADAS') {
        datosTipo.tipoCodI = 31;
        datosTipo.tipoCodAntI = 8;
    } else if (tipoI === 'CAÍDA DE ALTURA') {
        datosTipo.tipoCodI = 29;
        datosTipo.tipoCodAntI = 5;
    } else if (tipoI === 'CAÍDA DE ANTENA') {
        datosTipo.tipoCodI = 47;
        datosTipo.tipoCodAntI = 23;
    } else if (tipoI === 'CAÍDA DE CENIZA') {
        datosTipo.tipoCodI = 89;
        datosTipo.tipoCodAntI = 65;
    } else if (tipoI === 'CAÍDA DE NIEVE') {
        datosTipo.tipoCodI = 999;
        datosTipo.tipoCodAntI = 69;
    } else if (tipoI === 'CAIDA DE POSTE') {
        datosTipo.tipoCodI = 100;
        datosTipo.tipoCodAntI = 6;
    } else if (tipoI === 'COLAPSO ESTRUCTURAL') {
        datosTipo.tipoCodI = 30;
        datosTipo.tipoCodAntI = 7;
    } else if (tipoI === 'COLAPSO ESTRUCTURAL (LLUVIA)') {
        datosTipo.tipoCodI = 78;
        datosTipo.tipoCodAntI = 54;
    } else if (tipoI === 'CONATO DE INCENDIO FORESTAL') {
        datosTipo.tipoCodI = 37;
        datosTipo.tipoCodAntI = 13;
    } else if (tipoI === 'CONVULSIÓN EPILEPSIA') {
        datosTipo.tipoCodI = 94;
        datosTipo.tipoCodAntI = 72;
    } else if (tipoI === 'CORTOCIRCUITO') {
        datosTipo.tipoCodI = 90;
        datosTipo.tipoCodAntI = 66;
    } else if (tipoI === 'DEFLAGRACIÓN') {
        datosTipo.tipoCodI = 387;
        datosTipo.tipoCodAntI = 387;
    } else if (tipoI === 'DERRAME DE SUSTANCIAS TÓXICAS PELIGROSAS') {
        datosTipo.tipoCodI = 48;
        datosTipo.tipoCodAntI = 24;
    } else if (
        tipoI === 'DESBORDAMIENTO RIO ESTERO QUEBRADA CANAL DE RIEGO' ||
        tipoI === 'DESBORDAMIENTO RIO ESTERO QUEBRADA  CANAL DE RIEGO'
    ) {
        datosTipo.tipoCodI = 51;
        datosTipo.tipoCodAntI = 27;
    } else if (tipoI === 'DESCARGA ATMOSFÉRICA') {
        datosTipo.tipoCodI = 50;
        datosTipo.tipoCodAntI = 26;
    } else if (tipoI === 'ELECTROCUTADO') {
        datosTipo.tipoCodI = 52;
        datosTipo.tipoCodAntI = 28;
    } else if (tipoI === 'ERUPCIÓN VOLCÁNICA') {
        datosTipo.tipoCodI = 53;
        datosTipo.tipoCodAntI = 29;
    } else if (tipoI === 'ESCÁNDALO') {
        datosTipo.tipoCodI = 54;
        datosTipo.tipoCodAntI = 30;
    } else if (tipoI === 'EXPLOSIÓN') {
        datosTipo.tipoCodI = 32;
        datosTipo.tipoCodAntI = 9;
    } else if (tipoI === 'FUGA DE SUSTANCIAS TÓXICAS PELIGROSAS') {
        datosTipo.tipoCodI = 49;
        datosTipo.tipoCodAntI = 22;
    } else if (tipoI === 'FUGA GLP') {
        datosTipo.tipoCodI = 33;
        datosTipo.tipoCodAntI = 10;
    } else if (tipoI === 'HIPOTERMIA') {
        datosTipo.tipoCodI = 91;
        datosTipo.tipoCodAntI = 67;
    } else if (tipoI === 'HOMICIDIO') {
        datosTipo.tipoCodI = 34;
        datosTipo.tipoCodAntI = 11;
    } else if (tipoI === 'INCENDIO VEHICULAR') {
        datosTipo.tipoCodI = 35;
        datosTipo.tipoCodAntI = 12;
    } else if (tipoI === 'INTOXICACIÓN POR ALCOHOL') {
        datosTipo.tipoCodI = 80;
        datosTipo.tipoCodAntI = 56;
    } else if (tipoI === 'INTOXICACIÓN POR ALERGIAS') {
        datosTipo.tipoCodI = 84;
        datosTipo.tipoCodAntI = 60;
    } else if (tipoI === 'INTOXICACIÓN POR ALIMENTOS') {
        datosTipo.tipoCodI = 83;
        datosTipo.tipoCodAntI = 59;
    } else if (tipoI === 'INTOXICACIÓN POR DROGAS') {
        datosTipo.tipoCodI = 81;
        datosTipo.tipoCodAntI = 57;
    } else if (tipoI === 'INTOXICACIÓN POR FÁRMACOS') {
        datosTipo.tipoCodI = 79;
        datosTipo.tipoCodAntI = 55;
    } else if (tipoI === 'INTOXICACIÓN POR MONOXIDO DE CARBONO') {
        datosTipo.tipoCodI = 76;
        datosTipo.tipoCodAntI = 52;
    } else if (tipoI === 'INTOXICACIÓN POR PRODUCTOS QUIMICOS') {
        datosTipo.tipoCodI = 82;
        datosTipo.tipoCodAntI = 58;
    } else if (tipoI === 'INUNDACIÓN') {
        datosTipo.tipoCodI = 55;
        datosTipo.tipoCodAntI = 31;
    } else if (tipoI === 'LAHAR') {
        datosTipo.tipoCodI = 56;
        datosTipo.tipoCodAntI = 32;
    } else if (tipoI === 'LEVANTAMIENTO DE CADAVER') {
        datosTipo.tipoCodI = 39;
        datosTipo.tipoCodAntI = 15;
    } else if (tipoI === 'MANIFESTACIÓN SOCIAL') {
        datosTipo.tipoCodI = 40;
        datosTipo.tipoCodAntI = 16;
    } else if (tipoI === 'PROBLEMAS INTRAFAMILIARES') {
        datosTipo.tipoCodI = 57;
        datosTipo.tipoCodAntI = 33;
    } else if (tipoI === 'QUEMA CONTROLADA') {
        datosTipo.tipoCodI = 99;
        datosTipo.tipoCodAntI = 77;
    } else if (tipoI === 'QUEMA DE BASURA') {
        datosTipo.tipoCodI = 99;
        datosTipo.tipoCodAntI = 75;
    } else if (tipoI === 'QUEMA DE VEGETACIÓN MUERTA') {
        datosTipo.tipoCodI = 98;
        datosTipo.tipoCodAntI = 76;
    } else if (tipoI === 'QUEMADURA DE FUEGO PIROTECNICO') {
        datosTipo.tipoCodI = 77;
        datosTipo.tipoCodAntI = 53;
    } else if (tipoI === 'QUEMADURA ELÉCTRICA') {
        datosTipo.tipoCodI = 58;
        datosTipo.tipoCodAntI = 34;
    } else if (tipoI === 'RESCATE DE PERSONAS') {
        datosTipo.tipoCodI = 59;
        datosTipo.tipoCodAntI = 35;
    } else if (tipoI === 'RIÑA CALLEJERA') {
        datosTipo.tipoCodI = 60;
        datosTipo.tipoCodAntI = 36;
    } else if (tipoI === 'ROBO A AUTOMOTOR') {
        datosTipo.tipoCodI = 65;
        datosTipo.tipoCodAntI = 41;
    } else if (tipoI === 'ROBO A DOMICILIO') {
        datosTipo.tipoCodI = 61;
        datosTipo.tipoCodAntI = 37;
    } else if (tipoI === 'ROBO A ENTIDAD') {
        datosTipo.tipoCodI = 62;
        datosTipo.tipoCodAntI = 38;
    } else if (tipoI === 'ROBO A LOCAL COMERCIAL') {
        datosTipo.tipoCodI = 63;
        datosTipo.tipoCodAntI = 39;
    } else if (tipoI === 'ROBO A PERSONAS') {
        datosTipo.tipoCodI = 64;
        datosTipo.tipoCodAntI = 40;
    } else if (tipoI === 'ROBO EN CARRETERA') {
        datosTipo.tipoCodI = 66;
        datosTipo.tipoCodAntI = 42;
    } else if (tipoI === 'ROTURA DE COLECTOR') {
        datosTipo.tipoCodI = 88;
        datosTipo.tipoCodAntI = 64;
    } else if (tipoI === 'ROTURA DE HIDRANTE') {
        datosTipo.tipoCodI = 87;
        datosTipo.tipoCodAntI = 63;
    } else if (tipoI === 'ROTURA DE TUBERIA') {
        datosTipo.tipoCodI = 86;
        datosTipo.tipoCodAntI = 62;
    } else if (tipoI === 'SALIDA EN FALSO') {
        datosTipo.tipoCodI = 92;
        datosTipo.tipoCodAntI = 70;
    } else if (tipoI === 'SIN ESPECIFICAR') {
        datosTipo.tipoCodI = 93;
        datosTipo.tipoCodAntI = 71;
    } else if (tipoI === 'SISMO') {
        datosTipo.tipoCodI = 67;
        datosTipo.tipoCodAntI = 43;
    } else if (tipoI === 'SUICIDIO') {
        datosTipo.tipoCodI = 42;
        datosTipo.tipoCodAntI = 18;
    } else if (tipoI === 'VIENTOS FUERTES') {
        datosTipo.tipoCodI = 69;
        datosTipo.tipoCodAntI = 45;
    } else if (tipoI === 'VIOLACIÓN') {
        datosTipo.tipoCodI = 43;
        datosTipo.tipoCodAntI = 19;
    } else if (tipoI === 'VIOLENCIA CIVIL') {
        datosTipo.tipoCodI = 68;
        datosTipo.tipoCodAntI = 44;
    } else if (tipoI === 'VIOLENCIA INTRAFAMILIAR') {
        datosTipo.tipoCodI = 70;
        datosTipo.tipoCodAntI = 46;
    } else if (tipoI === 'INCIDENTE DE TRÁNSITO') {
        datosTipo.tipoCodI = 36;
        datosTipo.tipoCodAntI = 1;
    } else if (tipoI === 'INCENDIO FORESTAL') {
        datosTipo.tipoCodI = 72;
        datosTipo.tipoCodAntI = 48;
    } else if (tipoI === 'CAIDA DE ARBOL') {
        datosTipo.tipoCodI = 69;
        datosTipo.tipoCodAntI = 22;
    } else if (tipoI === 'VIOLACIÓN') {
        datosTipo.tipoCodI = 69;
        datosTipo.tipoCodAntI = 19;
    } else if (tipoI === 'QUEMA AGRÍCOLA') {
        datosTipo.tipoCodI = 69;
        datosTipo.tipoCodAntI = 14;
    } else if (tipoI === 'ABANDONO DE MENOR') {
        datosTipo.tipoCodI = 69;
        datosTipo.tipoCodAntI = 68;
    } else if (tipoI === 'AHOGAMIENTO') {
        datosTipo.tipoCodI = 69;
        datosTipo.tipoCodAntI = 394;
    } else if (tipoI === 'CAIDA DE GRANIZO') {
        datosTipo.tipoCodI = 69;
        datosTipo.tipoCodAntI = 401;
    } else if (tipoI === 'AGRESIÓN A LA AUTORIDAD') {
        datosTipo.tipoCodI = 69;
        datosTipo.tipoCodAntI = 405;
    } else if (tipoI === 'AGLOMERACIÓN DE PERSONAS') {
        datosTipo.tipoCodI = 69;
        datosTipo.tipoCodAntI = 411;
    } else if (tipoI === 'LEVANTAMIENTO CADAVER COVID 19') {
        datosTipo.tipoCodI = 69;
        datosTipo.tipoCodAntI = 425;
    } else if (tipoI === 'QUEMADURA TÉRMICA / FUEGO - AGUA') {
        datosTipo.tipoCodI = 69;
        datosTipo.tipoCodAntI = 426;
    } else {
        const codigoTipoIncidenteDesconocido = -1;
        datosTipo.tipoCodI = codigoTipoIncidenteDesconocido;
        datosTipo.tipoCodAntI = codigoTipoIncidenteDesconocido;
    }

    return datosTipo;
}

function compareAA(a, b) {
    if (a.familia < b.familia) {
        return -1;
    }
    if (a.familia > b.familia) {
        return 1;
    }
    return 0;
}






