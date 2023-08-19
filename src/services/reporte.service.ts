import {BadRequestException, Injectable, Param} from '@nestjs/common';
import {IncidenteNowForceService} from "./external/incidente-now-force.service";
import {AppUtil} from "../app.util";
// tslint:disable-next-line:no-var-requires
const ejs = require('ejs');
// tslint:disable-next-line:no-var-requires
const pdf = require('html-pdf');

@Injectable()
export class ReporteService {
    BING_MAPS_KEY = 'AgjvGQMEE_LBCkAQ5uT5lFT4BLkMev3f6GWdciTaXDI5rbpHUGgGhVarSFW6MQHY';

    constructor(private incidenteNowForceService: IncidenteNowForceService) {
    }

    generarReporteIncidentesNowForcesInforme(id, referencia, fechaInspecciondato, anexo2Dato, anexo3Dato, nombreTecnico, cargoTecnico, responsabilidadTecnico, nombreRevisor, cargoRevisor, responsabilidadRevisor, cb) {
        this.incidenteNowForceService.seleccionarPorIdNowForce(id)
            .then(incidenteNowForce => {
                if (!incidenteNowForce) {
                    throw new BadRequestException(`El incidente con identificador ${id} no existe.`);
                }
                const incidenteNowForceMapeado = this.mapearIncidenteAReporteNowForce(incidenteNowForce, referencia, fechaInspecciondato, anexo2Dato, anexo3Dato, nombreTecnico, cargoTecnico, responsabilidadTecnico, nombreRevisor, cargoRevisor, responsabilidadRevisor);
                ejs.renderFile('reportes/incidentes-now-force.ejs', incidenteNowForceMapeado, (err, data) => {
                    if (err) {
                        cb(err);
                    }
                    else {
                        const options = {
                            format: 'A4',
                            footer: {
                                height: '5mm',
                                contents: {
                                    default: '<span class="text-left border-report px-2">Página {{page}} de {{pages}}</span>',
                                },
                            },
                            border: {
                                top: '0in',
                                right: '2cm',
                                bottom: '15mm',
                                left: '2cm',
                            },
                        };
                        pdf.create(data, options).toBuffer((err2, data2) => {
                            if (err2) {
                                cb(err2);
                            }
                            else {
                                cb(null, data2);
                            }
                        });
                    }
                });
            });
    }
    generarReporteIncidentesNowForcesInformeFe(id, referencia, cb) {
        this.incidenteNowForceService.seleccionarPorIdNowForce(id)
            .then(incidenteNowForce => {
                if (!incidenteNowForce) {
                    throw new BadRequestException(`El incidente con identificador ${id} no existe.`);
                }
                const incidenteNowForceMapeado = this.mapearIncidenteAReporteNowForceFe(incidenteNowForce, referencia);
                ejs.renderFile('reportes/incidentes-now-force-fe.ejs', incidenteNowForceMapeado, (err, data) => {
                    if (err) {
                        cb(err);
                    }
                    else {
                        const options = {
                            format: 'A4',
                            footer: {
                                height: '5mm',
                                contents: {
                                    default: '<span class="text-left border-report px-2">Página {{page}} de {{pages}}</span>',
                                },
                            },
                            border: {
                                top: '0in',
                                right: '2cm',
                                bottom: '15mm',
                                left: '2cm',
                            },
                        };
                        pdf.create(data, options).toBuffer((err2, data2) => {
                            if (err2) {
                                cb(err2);
                            }
                            else {
                                cb(null, data2);
                            }
                        });
                    }
                });
            });
    }
    generarReporteIncidentesNowForcesInformeGe(id, numeroInforme, nombreEmergencia, solicitadoPor, referencia, cb) {
        this.incidenteNowForceService.seleccionarPorIdNowForce(id)
            .then(incidenteNowForce => {
                if (!incidenteNowForce) {
                    throw new BadRequestException(`El incidente con identificador ${id} no existe.`);
                }
                const incidenteNowForceMapeado = this.mapearIncidenteAReporteNowForceGe(incidenteNowForce, numeroInforme, nombreEmergencia, solicitadoPor, referencia);
                ejs.renderFile('reportes/incidentes-now-force-ge.ejs', incidenteNowForceMapeado, (err, data) => {
                    if (err) {
                        cb(err);
                    }
                    else {
                        const options = {
                            format: 'A4',
                            footer: {
                                height: '5mm',
                                contents: {
                                    default: '<span class="text-left border-report px-2">Página {{page}} de {{pages}}</span>',
                                },
                            },
                            border: {
                                top: '0in',
                                right: '2cm',
                                bottom: '15mm',
                                left: '2cm',
                            },
                        };
                        pdf.create(data, options).toBuffer((err2, data2) => {
                            if (err2) {
                                cb(err2);
                            }
                            else {
                                cb(null, data2);
                            }
                        });
                    }
                });
            });
    }
    generarReporteIncidentesCierre(id, elaborado, fuente, numCOE, cb) {
        this.incidenteNowForceService.seleccionarPorIdNowForce(id)
            .then(incidenteNowForce => {
                if (!incidenteNowForce) {
                    throw new BadRequestException(`El incidente con identificador ${id} no existe.`);
                }
                const incidenteNowForceMapeado = this.mapearIncidenteAReporteCierre(incidenteNowForce, elaborado, fuente, numCOE);
                ejs.renderFile('reportes/cierre.ejs', incidenteNowForceMapeado, (err, data) => {
                    if (err) {
                        cb(err);
                    }
                    else {
                        const options = {
                            format: 'A4',
                            orientation: 'landscape',
                            border: {
                                top: '0in',
                                right: '1cm',
                                bottom: '0',
                                left: '1cm',
                            },
                        };
                        pdf.create(data, options).toBuffer((err2, data2) => {
                            if (err2) {
                                cb(err2);
                            }
                            else {
                                cb(null, data2);
                            }
                        });
                    }
                });
            });
    }
    generarReporteIncidentesPreliminar(id, elaborado, fuente, numCOE, cb) {
        this.incidenteNowForceService.seleccionarPorIdNowForce(id)
            .then(incidenteNowForce => {
                if (!incidenteNowForce) {
                    throw new BadRequestException(`El incidente con identificador ${id} no existe.`);
                }
                const incidenteNowForceMapeado = this.mapearIncidenteAReportePreliminar(incidenteNowForce, elaborado, fuente, numCOE);
                ejs.renderFile('reportes/preliminar.ejs', incidenteNowForceMapeado, (err, data) => {
                    if (err) {
                        cb(err);
                    }
                    else {
                        const options = {
                            format: 'A4',
                            orientation: 'landscape',
                            border: {
                                top: '0in',
                                right: '1cm',
                                bottom: '0',
                                left: '1cm',
                            },
                        };
                        pdf.create(data, options).toBuffer((err2, data2) => {
                            if (err2) {
                                cb(err2);
                            }
                            else {
                                cb(null, data2);
                            }
                        });
                    }
                });
            });
    }
    generarReporteIncidentesSeguimiento(id, elaborado, fuente, numCOE, cb) {
        this.incidenteNowForceService.seleccionarPorIdNowForce(id)
            .then(incidenteNowForce => {
                if (!incidenteNowForce) {
                    throw new BadRequestException(`El incidente con identificador ${id} no existe.`);
                }
                const incidenteNowForceMapeado = this.mapearIncidenteAReporteSeguimiento(incidenteNowForce, elaborado, fuente, numCOE);
                ejs.renderFile('reportes/seguimiento.ejs', incidenteNowForceMapeado, (err, data) => {
                    if (err) {
                        cb(err);
                    }
                    else {
                        const options = {
                            format: 'A4',
                            orientation: 'landscape',
                            border: {
                                top: '0in',
                                right: '1cm',
                                bottom: '0',
                                left: '1cm',
                            },
                        };
                        pdf.create(data, options).toBuffer((err2, data2) => {
                            if (err2) {
                                cb(err2);
                            }
                            else {
                                cb(null, data2);
                            }
                        });
                    }
                });
            });
    }
    mapearIncidenteAReporteNowForce(incidenteNowForce, referencia, fechaInspecciondato, anexo2Dato, anexo3Dato, nombreTecnico, cargoTecnico, responsabilidadTecnico, nombreRevisor, cargoRevisor, responsabilidadRevisor) {
        let anexo2 = '';
        let anexo3 = '';
        if (!referencia) {
            referencia = '';
        }
        if (!fechaInspecciondato) {
            fechaInspecciondato = '';
        }
        if (!anexo2Dato) {
            anexo2 = '';
        }
        if (!anexo3Dato) {
            anexo3 = '';
        }
        if (!nombreTecnico) {
            nombreTecnico = '';
        }
        if (!cargoTecnico) {
            cargoTecnico = '';
        }
        if (!responsabilidadTecnico) {
            responsabilidadTecnico = '';
        }
        if (!nombreRevisor) {
            nombreRevisor = '';
        }
        if (!cargoRevisor) {
            cargoRevisor = '';
        }
        if (!responsabilidadRevisor) {
            responsabilidadRevisor = '';
        }
        const dataTable = [];
        const arregloFamilia = [];
        const arregloFamiliaData = [];
        const arregloFamiliaDataC = [];
        let numafectadosH = 0;
        let numafectadosM = 0;
        let numalbergadosH = 0;
        let numalbergadosM = 0;
        let numDamnificadosH = 0;
        let numDamnificadosM = 0;
        let numHeridos = 0;
        let numFallecidos = 0;
        const dataDD = [];
        const dataTT = new Array();
        if (!(incidenteNowForce.coepersonas === null)) {
            const arrRecursos = ['COE,' + incidenteNowForce.coepersonas + ','];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.coecamionetas === null)) {
            const arrRecursos = ['COE,' + incidenteNowForce.coecamionetas + ',Camionetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.coevolquetas === null)) {
            const arrRecursos = ['COE,' + incidenteNowForce.coevolquetas + ',Volquetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.coeminicargadoras === null)) {
            const arrRecursos = ['COE,' + incidenteNowForce.coeminicargadoras + ',Minicargadoras'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.coeretroescavadoras === null)) {
            const arrRecursos = ['COE,' + incidenteNowForce.coeretroescavadoras + ',Retroescavadoras'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.coemaquinariapesada === null)) {
            const arrRecursos = ['COE,' + incidenteNowForce.coemaquinariapesada + ',Maquinaria Pesada'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cbqpersonas === null)) {
            const arrRecursos = ['CBQ,' + incidenteNowForce.cbqpersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cbqcamionetas === null)) {
            const arrRecursos = ['CBQ,' + incidenteNowForce.cbqcamionetas + ',Camionetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cbqestaciones === null)) {
            const arrRecursos = ['CBQ,' + incidenteNowForce.cbqestaciones + ',Estaciones'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cbqambulanciasA === null)) {
            const arrRecursos = ['CBQ,' + incidenteNowForce.cbqambulanciasA + ',Ambulancias'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cbqautobombasB === null)) {
            const arrRecursos = ['CBQ,' + incidenteNowForce.cbqautobombasB + ',Autobombas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cbqtanquerosT === null)) {
            const arrRecursos = ['CBQ,' + incidenteNowForce.cbqtanquerosT + ',Tanqueros'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cbqunidadesderescate === null)) {
            const arrRecursos = ['CBQ,' + incidenteNowForce.cbqunidadesderescate + ',Unidades de Rescate'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cbqmotos === null)) {
            const arrRecursos = ['CBQ,' + incidenteNowForce.cbqmotos + ',Motos'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cbqunidaddematerialespeligrosos === null)) {
            const arrRecursos = ['CBQ,' + incidenteNowForce.cbqunidaddematerialespeligrosos + ',unidad de materiales peligrosos'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cbqunidaddefuerzadetarea === null)) {
            const arrRecursos = ['CBQ,' + incidenteNowForce.cbqunidaddefuerzadetarea + ',Unidad Fuerza de tarea'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cbqbuses === null)) {
            const arrRecursos = ['CBQ,' + incidenteNowForce.cbqbuses + ',Buses'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cbqhelipcopteros === null)) {
            const arrRecursos = ['CBQ,' + incidenteNowForce.cbqhelipcopteros + ',Helicopteros'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cbqdarly === null)) {
            const arrRecursos = ['CBQ,' + incidenteNowForce.cbqdarly + ',Darly'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cbqnodriza === null)) {
            const arrRecursos = ['CBQ,' + incidenteNowForce.cbqnodriza + ',Nodriza'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cbqunimog === null)) {
            const arrRecursos = ['CBQ,' + incidenteNowForce.cbqunimog + ',UNIMOG'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cbqpolivalente === null)) {
            const arrRecursos = ['CBQ,' + incidenteNowForce.cbqpolivalente + ',Polivalente'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.msppersonas === null)) {
            const arrRecursos = ['MSP,' + incidenteNowForce.msppersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.mspambulanciasA === null)) {
            const arrRecursos = ['MSP,' + incidenteNowForce.mspambulanciasA + ',Ambulancias'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cruzrojapersonas === null)) {
            const arrRecursos = ['Cruz Roja,' + incidenteNowForce.cruzrojapersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cruzrojaambulanciasA === null)) {
            const arrRecursos = ['Cruz Roja,' + incidenteNowForce.cruzrojaambulanciasA + ',Ambulancia '];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cacmpersonas === null)) {
            const arrRecursos = ['CACM,' + incidenteNowForce.cacmpersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cacmcamionetas === null)) {
            const arrRecursos = ['CACM,' + incidenteNowForce.cacmcamionetas + ',Camionetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cacmmotos === null)) {
            const arrRecursos = ['CACM,' + incidenteNowForce.cacmmotos + ',Motos'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cacmbuses === null)) {
            const arrRecursos = ['CACM,' + incidenteNowForce.cacmbuses + ',Buses'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cacmcanters === null)) {
            const arrRecursos = ['CACM,' + incidenteNowForce.cacmcanters + ',Canters '];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cacmvehiculos === null)) {
            const arrRecursos = ['CACM,' + incidenteNowForce.cacmvehiculos + ',Vehiculos '];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.cacmgruposderescate === null)) {
            const arrRecursos = ['CACM,' + incidenteNowForce.cacmgruposderescate + ',Grupos de Rescate'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.amtpersonas === null)) {
            const arrRecursos = ['AMT,' + incidenteNowForce.amtpersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.amtcamionetas === null)) {
            const arrRecursos = ['AMT,' + incidenteNowForce.amtcamionetas + ',Camionetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.amtmotos === null)) {
            const arrRecursos = ['AMT,' + incidenteNowForce.amtmotos + ',Motos'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.amcpersonas === null)) {
            const arrRecursos = ['AMC,' + incidenteNowForce.amcpersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.amcvehiculos === null)) {
            const arrRecursos = ['AMC,' + incidenteNowForce.amcvehiculos + ',Vehiculos'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.epmapspersonas === null)) {
            const arrRecursos = ['EPMAPS,' + incidenteNowForce.epmapspersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.epmapscamionetas === null)) {
            const arrRecursos = ['EPMAPS,' + incidenteNowForce.epmapscamionetas + ',Camionetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.epmapsvolquetas === null)) {
            const arrRecursos = ['EPMAPS,' + incidenteNowForce.epmapsvolquetas + ',Volquetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.epmapsmaquinariapesada === null)) {
            const arrRecursos = ['EPMAPS,' + incidenteNowForce.epmapsmaquinariapesada + ',Maquinaria Pesada'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.epmapstanquerosT === null)) {
            const arrRecursos = ['EPMAPS,' + incidenteNowForce.epmapstanquerosT + ',Tanqueros'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.epmapshidrosuccionadores === null)) {
            const arrRecursos = ['EPMAPS,' + incidenteNowForce.epmapshidrosuccionadores + ',HidroSuccionadores'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.epmapseductores === null)) {
            const arrRecursos = ['EPMAPS,' + incidenteNowForce.epmapseductores + ',Seductores'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.epmmoppersonas === null)) {
            const arrRecursos = ['EPMMOP,' + incidenteNowForce.epmmoppersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.epmmopcamionetas === null)) {
            const arrRecursos = ['EPMMOP,' + incidenteNowForce.epmmopcamionetas + ',Camionetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.epmmopvolquetas === null)) {
            const arrRecursos = ['EPMMOP,' + incidenteNowForce.epmmopvolquetas + ',Volquetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.epmmopminicargadoras === null)) {
            const arrRecursos = ['EPMMOP,' + incidenteNowForce.epmmopminicargadoras + ',Mini Cargadoras'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.epmmopmaquinariapesada === null)) {
            const arrRecursos = ['EPMMOP,' + incidenteNowForce.epmmopmaquinariapesada + ',Maquinaria Pesada'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.epmmoptanquerosT === null)) {
            const arrRecursos = ['EPMMOP,' + incidenteNowForce.epmmoptanquerosT + ',Tanqueros'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.emaseopersonas === null)) {
            const arrRecursos = ['EMASEO,' + incidenteNowForce.emaseopersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.emaseocamionetas === null)) {
            const arrRecursos = ['EMASEO,' + incidenteNowForce.emaseocamionetas + ',Camionetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.emaseovolquetas === null)) {
            const arrRecursos = ['EMASEO,' + incidenteNowForce.emaseovolquetas + ',Volquetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.emaseomaquinariapesada === null)) {
            const arrRecursos = ['EMASEO,' + incidenteNowForce.emaseomaquinariapesada + ',Maquinaria Pesada'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.emgirspersonas === null)) {
            const arrRecursos = ['EMGIRS,' + incidenteNowForce.emgirspersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.emgirscamionetas === null)) {
            const arrRecursos = ['EMGIRS,' + incidenteNowForce.emgirscamionetas + ',Camionetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.emgirsvolquetas === null)) {
            const arrRecursos = ['EMGIRS,' + incidenteNowForce.emgirsvolquetas + ',Volquetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.emgirsmaquinariapesada === null)) {
            const arrRecursos = ['EMGIRS,' + incidenteNowForce.emgirsmaquinariapesada + ',Maquinaria Pesada'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.administracioneszonalespersonas === null)) {
            const arrRecursos = ['Administraciones Zonales,' + incidenteNowForce.administracioneszonalespersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.administracioneszonalescamionetas === null)) {
            const arrRecursos = ['Administraciones Zonales,' + incidenteNowForce.administracioneszonalescamionetas + ',Camionetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.administracioneszonalesvolquetas === null)) {
            const arrRecursos = ['Administraciones Zonales,' + incidenteNowForce.administracioneszonalesvolquetas + ',Volquetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.administracioneszonalesmaquinariapesada === null)) {
            const arrRecursos = ['Administraciones Zonales,' + incidenteNowForce.administracioneszonalesmaquinariapesada + ',Maquinaria Pesada'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.eeqpersonas === null)) {
            const arrRecursos = ['EEQ,' + incidenteNowForce.eeqpersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.eeqcamionetas === null)) {
            const arrRecursos = ['EEQ,' + incidenteNowForce.eeqcamionetas + ',Camionetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.eeqmaquinariapesada === null)) {
            const arrRecursos = ['EEQ,' + incidenteNowForce.eeqmaquinariapesada + ',Maquinaria Pesada'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.consejoprovincialdepichinchapersonas === null)) {
            const arrRecursos = ['Consejo Pronvincial de Pichincha,' + incidenteNowForce.consejoprovincialdepichinchapersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.consejoprovincialdepichinchacamionetas === null)) {
            const arrRecursos = ['Consejo Pronvincial de Pichincha,' + incidenteNowForce.consejoprovincialdepichinchacamionetas + ',Camionetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.consejoprovincialdepichinchavolquetas === null)) {
            const arrRecursos = ['Consejo Pronvincial de Pichincha,' + incidenteNowForce.consejoprovincialdepichinchavolquetas + ',Volquetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.consejoprovincialdepichinchamaquinariapesada === null)) {
            const arrRecursos = ['Consejo Pronvincial de Pichincha,' + incidenteNowForce.consejoprovincialdepichinchamaquinariapesada + ',Maquinaria Pesada'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.panavialpersonas === null)) {
            const arrRecursos = ['Panavial,' + incidenteNowForce.panavialpersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.panavialcamionetas === null)) {
            const arrRecursos = ['Panavial,' + incidenteNowForce.panavialcamionetas + ',Camionetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.panavialvolquetas === null)) {
            const arrRecursos = ['Panavial,' + incidenteNowForce.panavialvolquetas + ',Volquetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.panavialmaquinariapesada === null)) {
            const arrRecursos = ['Panavial,' + incidenteNowForce.panavialmaquinariapesada + ',Maquinaria Pesada'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.panavialambulanciasA === null)) {
            const arrRecursos = ['Panavial,' + incidenteNowForce.panavialambulanciasA + ',Ambulancias'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.ministeriodeobraspublicaspersonas === null)) {
            const arrRecursos = ['Ministerio de Obras Publicas,' + incidenteNowForce.ministeriodeobraspublicaspersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.ministeriodeobraspublicascamionetas === null)) {
            const arrRecursos = ['Ministerio de Obras Publicas,' + incidenteNowForce.ministeriodeobraspublicascamionetas + ',Camionetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.ministeriodeobraspublicasvolquetas === null)) {
            const arrRecursos = ['Ministerio de Obras Publicas,' + incidenteNowForce.ministeriodeobraspublicasvolquetas + ',Volquetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.ministeriodeobraspublicasmaquinariapesada === null)) {
            const arrRecursos = ['Ministerio de Obras Publicas,' + incidenteNowForce.ministeriodeobraspublicasmaquinariapesada + ',Maquinaria Pesada'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.policianacionalpersonas === null)) {
            const arrRecursos = ['Policia Nacional,' + incidenteNowForce.policianacionalpersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.policianacionalambulanciasA === null)) {
            const arrRecursos = ['Policia Nacional,' + incidenteNowForce.policianacionalambulanciasA + ',Ambulancias'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.policianacionalmotos === null)) {
            const arrRecursos = ['Policia Nacional,' + incidenteNowForce.policianacionalmotos + ',Motos'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.policianacionalbuses === null)) {
            const arrRecursos = ['Policia Nacional,' + incidenteNowForce.policianacionalbuses + ',Buses'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.policianacionalcamiones === null)) {
            const arrRecursos = ['Policia Nacional,' + incidenteNowForce.policianacionalcamiones + ',Camiones'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.policianacionalpatrullas === null)) {
            const arrRecursos = ['Policia Nacional,' + incidenteNowForce.policianacionalpatrullas + ',Patrullas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.policianacionalcanteras === null)) {
            const arrRecursos = ['Policia Nacional,' + incidenteNowForce.policianacionalcanteras + ',Canteras'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.policianacionalhelipcopteros === null)) {
            const arrRecursos = ['Policia Nacional,' + incidenteNowForce.policianacionalhelipcopteros + ',Helicopteros'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.policianacionalequinos === null)) {
            const arrRecursos = ['Policia Nacional,' + incidenteNowForce.policianacionalequinos + ',Equinos'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.policianacionalgir === null)) {
            const arrRecursos = ['Policia Nacional,' + incidenteNowForce.policianacionalgir + ',GIR'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.policianacionalgoe === null)) {
            const arrRecursos = ['Policia Nacional,' + incidenteNowForce.policianacionalgoe + ',GOE'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.fuerzasarmadaspersonas === null)) {
            const arrRecursos = ['FF AA,' + incidenteNowForce.fuerzasarmadaspersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.fuerzasarmadascamionetas === null)) {
            const arrRecursos = ['FF AA,' + incidenteNowForce.fuerzasarmadascamionetas + ',Camionetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.fuerzasarmadasvolquetas === null)) {
            const arrRecursos = ['FF AA,' + incidenteNowForce.fuerzasarmadasvolquetas + ',Volquetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.fuerzasarmadasmaquinariapesada === null)) {
            const arrRecursos = ['FF AA,' + incidenteNowForce.fuerzasarmadasmaquinariapesada + ',Maquinaria Pesada'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.fuerzasarmadastanquerosT === null)) {
            const arrRecursos = ['FF AA,' + incidenteNowForce.fuerzasarmadastanquerosT + ',Tanqueros'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.fuerzasarmadasbuses === null)) {
            const arrRecursos = ['FF AA,' + incidenteNowForce.fuerzasarmadasbuses + ',Buses'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.fuerzasarmadascamiones === null)) {
            const arrRecursos = ['FF AA,' + incidenteNowForce.fuerzasarmadascamiones + ',Camiones'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.fuerzasarmadashelipcopteros === null)) {
            const arrRecursos = ['FF AA,' + incidenteNowForce.fuerzasarmadashelipcopteros + ',Helicopteros'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.fuerzasarmadasjeeps === null)) {
            const arrRecursos = ['FF AA,' + incidenteNowForce.fuerzasarmadasjeeps + ',Jeeps'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.fuerzasarmadasaviones === null)) {
            const arrRecursos = ['FF AA,' + incidenteNowForce.fuerzasarmadasaviones + ',Aviones'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.fuerzasarmadasgruposderescate === null)) {
            const arrRecursos = ['FF AA,' + incidenteNowForce.fuerzasarmadasgruposderescate + ',Grupos de Rescate'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.iesspersonas === null)) {
            const arrRecursos = ['IESS,' + incidenteNowForce.iesspersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.iessambulanciasA === null)) {
            const arrRecursos = ['IESS,' + incidenteNowForce.iessambulanciasA + ',Ambulancias'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.dmgrpersonas === null)) {
            const arrRecursos = ['DMGR,' + incidenteNowForce.dmgrpersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.dmgrcamionetas === null)) {
            const arrRecursos = ['DMGR,' + incidenteNowForce.dmgrcamionetas + ',Camionetas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.siatpersonas === null)) {
            const arrRecursos = ['SIAT,' + incidenteNowForce.siatpersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.siatvehiculos === null)) {
            const arrRecursos = ['SIAT,' + incidenteNowForce.siatvehiculos + ',Vehiculos'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.imppersonas === null)) {
            const arrRecursos = ['IMP,' + incidenteNowForce.imppersonas + ',Personas'];
            dataTT.push(arrRecursos);
        }
        if (!(incidenteNowForce.impcamiones === null)) {
            const arrRecursos = ['IMP,' + incidenteNowForce.impcamiones + ',Camiones'];
            dataTT.push(arrRecursos);
        }
        const recursosEnviados = [];
        if (dataTT) {
            for (let a = 0; a < dataTT.length; a++) {
                const integranteRecursos = {
                    institucion: '',
                    numeroParticipantes: '',
                    recursosMateriales: '',
                };
                recursosEnviados.push(integranteRecursos);
                integranteRecursos.institucion = dataTT[a].toString().split(',')[0];
                integranteRecursos.numeroParticipantes = dataTT[a].toString().split(',')[1];
                integranteRecursos.recursosMateriales = dataTT[a].toString().split(',')[2];
            }
        }
        incidenteNowForce.cidadanos.sort((a, b) => {
            if (a.familia < b.familia) {
                return -1;
            }
            if (a.familia > b.familia) {
                return 1;
            }
            return 0;
        });
        const integrantesFamilia = [];
        for (let ppp = 0; ppp < incidenteNowForce.cidadanos.length; ppp++) {
            const integranteFamilia = {
                nombres: '',
                sexo: '',
                edad: '',
                cedula: '',
                parentesco: '',
                numeroTelefonoContacto: '',
                familia: '',
                vestimenta: '',
                calzado: '',
            };
            integrantesFamilia.push(integranteFamilia);
            integranteFamilia.nombres = incidenteNowForce.cidadanos[ppp].nombre;
            integranteFamilia.sexo = incidenteNowForce.cidadanos[ppp].sexo;
            integranteFamilia.edad = incidenteNowForce.cidadanos[ppp].edad;
            integranteFamilia.cedula = incidenteNowForce.cidadanos[ppp].cedula;
            integranteFamilia.parentesco = incidenteNowForce.cidadanos[ppp].parentesco;
            integranteFamilia.numeroTelefonoContacto = '';
            integranteFamilia.familia = incidenteNowForce.cidadanos[ppp].familia;
            const asistenciaCiud = {
                familia: undefined,
                vestimenta: undefined,
                calzado: undefined,
                frazada: undefined,
                alimentosPerecibles: undefined,
                alimentosNoPerecibles: undefined,
                kitHigiene: undefined,
                kitEscolar: undefined,
                toallas:undefined,
                medicinas:undefined,
                gastosMortuorios:undefined,
                bienesMuebles: undefined,
                otros:undefined,
            };
            asistenciaCiud.familia = incidenteNowForce.cidadanos[ppp].familia;
            if (incidenteNowForce.cidadanos[ppp].vestimenta === true) {
                asistenciaCiud.vestimenta = 'Si';
                integranteFamilia.vestimenta = incidenteNowForce.cidadanos[ppp].vestimentaTalla;
            }
            else {
                asistenciaCiud.vestimenta = ('No');
                integranteFamilia.vestimenta = 'No';
            }
            if (incidenteNowForce.cidadanos[ppp].calzado === true) {
                asistenciaCiud.calzado = ('Si');
                integranteFamilia.calzado = incidenteNowForce.cidadanos[ppp].calzadoTalla;
            }
            else {
                asistenciaCiud.calzado = ('No');
                integranteFamilia.calzado = 'No';
            }
            if (incidenteNowForce.cidadanos[ppp].frazada === true)
                asistenciaCiud.frazada = ('Si');
            else
                asistenciaCiud.frazada = ('No');
            if (incidenteNowForce.cidadanos[ppp].alimentosPerecibles === true)
                asistenciaCiud.alimentosPerecibles = ('Si');
            else
                asistenciaCiud.alimentosPerecibles = ('No');
            if (incidenteNowForce.cidadanos[ppp].alimentosNoPerecibles === true)
                asistenciaCiud.alimentosNoPerecibles = ('Si');
            else
                asistenciaCiud.alimentosNoPerecibles = ('No');
            if (incidenteNowForce.cidadanos[ppp].kitHigiene === true)
                asistenciaCiud.kitHigiene = ('Si');
            else
                asistenciaCiud.kitHigiene = 'No';

            if (incidenteNowForce.cidadanos[ppp].kitEscolar === true)
                asistenciaCiud.kitEscolar = ('Si');
            else
                asistenciaCiud.kitEscolar = 'No';

            if (incidenteNowForce.cidadanos[ppp].toallas === true)
                asistenciaCiud.toallas = ('Si');
            else
                asistenciaCiud.toallas = 'No';

            if (incidenteNowForce.cidadanos[ppp].medicinas === true)
                asistenciaCiud.medicinas = incidenteNowForce.cidadanos[ppp].medicinasTalla;
            else
                asistenciaCiud.medicinas = 'No';

            if (incidenteNowForce.cidadanos[ppp].gastosMortuorios === true)
                asistenciaCiud.gastosMortuorios = ('Si');
            else
                asistenciaCiud.gastosMortuorios = 'No';

            if (incidenteNowForce.cidadanos[ppp].otros)
                asistenciaCiud.otros = incidenteNowForce.cidadanos[ppp].otros;



            if (incidenteNowForce.cidadanos[ppp].bienesMuebles === true)
                asistenciaCiud.bienesMuebles = 'Si';
            else
                asistenciaCiud.bienesMuebles = 'No';
            const dataCiudadanos = [];
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].nombre);
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].sexo);
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].edad);
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].parentesco);
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].vestimentaTalla);
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].calzadoTalla);
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].cedula);
            dataTable.push(dataCiudadanos);
            if (arregloFamilia.indexOf(incidenteNowForce.cidadanos[ppp].familia) === -1) {
                arregloFamilia.push(incidenteNowForce.cidadanos[ppp].familia);
                const arregloTenEe = [];
                arregloTenEe.push(dataCiudadanos);
                arregloFamiliaData.push(arregloTenEe);
                const arregloTenEeC = [];
                arregloTenEeC.push(incidenteNowForce.cidadanos[ppp]);
                arregloFamiliaDataC.push(arregloTenEeC);
                dataDD.push(asistenciaCiud);
            }
            else {
                arregloFamiliaData[arregloFamilia.indexOf(incidenteNowForce.cidadanos[ppp].familia)].push(dataCiudadanos);
                arregloFamiliaDataC[arregloFamilia.indexOf(incidenteNowForce.cidadanos[ppp].familia)].push(incidenteNowForce.cidadanos[ppp]);
            }
            if (incidenteNowForce.cidadanos[ppp].sexo === 'Masculino' && incidenteNowForce.cidadanos[ppp].afectada === true)
                numafectadosH++;
            if (incidenteNowForce.cidadanos[ppp].sexo === 'Femenino' && incidenteNowForce.cidadanos[ppp].afectada === true)
                numafectadosM++;
            if (incidenteNowForce.cidadanos[ppp].sexo === 'Masculino' && incidenteNowForce.cidadanos[ppp].albergada === true)
                numalbergadosH++;
            if (incidenteNowForce.cidadanos[ppp].sexo === 'Femenino' && incidenteNowForce.cidadanos[ppp].albergada === true)
                numalbergadosM++;
            if (incidenteNowForce.cidadanos[ppp].sexo === 'Masculino' && incidenteNowForce.cidadanos[ppp].damnificada === true)
                numDamnificadosH++;
            if (incidenteNowForce.cidadanos[ppp].sexo === 'Femenino' && incidenteNowForce.cidadanos[ppp].damnificada === true)
                numDamnificadosM++;
            if (incidenteNowForce.cidadanos[ppp].herido === true)
                numHeridos++;
            if (incidenteNowForce.cidadanos[ppp].fallecido === true)
                numFallecidos++;
        }
        let famiAfectadas = 0;
        let famiAlbergadas = 0;
        let famiDamnificadas = 0;
        for (let tt = 0; tt < arregloFamilia.length; tt++) {
            for (let ttt = 0; ttt < arregloFamiliaDataC[tt].length; ttt++) {
                if (arregloFamiliaDataC[tt][ttt].afectada === true) {
                    famiAfectadas++;
                    break;
                }
            }
            for (let ttt = 0; ttt < arregloFamiliaDataC[tt].length; ttt++) {
                if (arregloFamiliaDataC[tt][ttt].albergada === true) {
                    famiAlbergadas++;
                    break;
                }
            }
            for (let ttt = 0; ttt < arregloFamiliaDataC[tt].length; ttt++) {
                if (arregloFamiliaDataC[tt][ttt].damnificada === true) {
                    famiDamnificadas++;
                    break;
                }
            }
        }
        let metalicaTC = '';
        let hormigonTC = '';
        let adobeTC = '';
        let maderaTC = '';
        let mixtaTC = '';
        let otrosTC = '';
        if (incidenteNowForce.daniosMateriales.length > 0) {
            if (incidenteNowForce.daniosMateriales[0].metalicaTC === true)
                metalicaTC = 'X';
            if (incidenteNowForce.daniosMateriales[0].hormigoArmadoTC === true)
                hormigonTC = 'X';
            if (incidenteNowForce.daniosMateriales[0].adobeTC === true)
                adobeTC = 'X';
            if (incidenteNowForce.daniosMateriales[0].maderaTC === true)
                maderaTC = 'X';
            if (incidenteNowForce.daniosMateriales[0].mixtaTC === true)
                mixtaTC = 'X';
            if (incidenteNowForce.daniosMateriales[0].otrosTC === true)
                otrosTC = 'X';
        }
        const mapa = this.getUrlImgenMapa({ base: 500, altura: 500 }, {
            latitud: incidenteNowForce.latitud.toFixed(7),
            longitud: incidenteNowForce.longitud.toFixed(7),
        });
        const mamposteriaAux = [];
        let mamposteria = {
            vestibulo: '',
            comedor: '',
            pasillo: '',
            cocina: '',
            sshh: '',
            dormitorios: '',
            garage: '',
            edAdicionales: '',
            patioJardin: '',
        };
        const cubiertaAux = [];
        let cubierta = {
            vestibulo: '',
            comedor: '',
            pasillo: '',
            cocina: '',
            sshh: '',
            dormitorios: '',
            garage: '',
            edAdicionales: '',
            patioJardin: '',
        };
        const pisoAux = [];
        let piso = {
            vestibulo: '',
            comedor: '',
            pasillo: '',
            cocina: '',
            sshh: '',
            dormitorios: '',
            garage: '',
            edAdicionales: '',
            patioJardin: '',
        };
        const entrepisoAux = [];
        let entrepiso = {
            vestibulo: '',
            comedor: '',
            pasillo: '',
            cocina: '',
            sshh: '',
            dormitorios: '',
            garage: '',
            edAdicionales: '',
            patioJardin: '',
        };
        const columnasAux = [];
        let columnas = {
            vestibulo: '',
            comedor: '',
            pasillo: '',
            cocina: '',
            sshh: '',
            dormitorios: '',
            garage: '',
            edAdicionales: '',
            patioJardin: '',
        };
        const ventanasAux = [];
        let ventanas = {
            vestibulo: '',
            comedor: '',
            pasillo: '',
            cocina: '',
            sshh: '',
            dormitorios: '',
            garage: '',
            edAdicionales: '',
            patioJardin: '',
        };
        if (incidenteNowForce.daniosMateriales.length > 0) {
            mamposteriaAux.push(mamposteria);
            const arregloTemDM = new Array();
            if (!(incidenteNowForce.daniosMateriales[0].mamposteriaVestibulo === null)) {
                if (incidenteNowForce.daniosMateriales[0].mamposteriaVestibulo.split('. ').length > 1)
                    mamposteria.vestibulo = incidenteNowForce.daniosMateriales[0].mamposteriaVestibulo.split('. ')[0];
                else
                    mamposteria.vestibulo = '0';
            }
            else
                mamposteria.vestibulo = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].mamposteriaComedor === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].mamposteriaComedor === null))
                    if (incidenteNowForce.daniosMateriales[0].mamposteriaComedor.split('. ').length > 1)
                        mamposteria.comedor = (incidenteNowForce.daniosMateriales[0].mamposteriaComedor.split('. ')[0]);
                    else
                        mamposteria.comedor = ('0');
            }
            else
                mamposteria.comedor = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].mamposteriaPasillo === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].mamposteriaPasillo === null))
                    if (incidenteNowForce.daniosMateriales[0].mamposteriaPasillo.split('. ').length > 1)
                        mamposteria.pasillo = (incidenteNowForce.daniosMateriales[0].mamposteriaPasillo.split('. ')[0]);
                    else
                        mamposteria.pasillo = ('0');
            }
            else
                mamposteria.pasillo = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].mamposteriaCocina === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].mamposteriaCocina === null))
                    if (incidenteNowForce.daniosMateriales[0].mamposteriaCocina.split('. ').length > 1)
                        mamposteria.cocina = (incidenteNowForce.daniosMateriales[0].mamposteriaCocina.split('. ')[0]);
                    else
                        mamposteria.cocina = ('0');
            }
            else
                mamposteria.cocina = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].mamposteriaSSHH === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].mamposteriaSSHH === null))
                    if (incidenteNowForce.daniosMateriales[0].mamposteriaSSHH.split('. ').length > 1)
                        mamposteria.sshh = (incidenteNowForce.daniosMateriales[0].mamposteriaSSHH.split('. ')[0]);
                    else
                        mamposteria.sshh = ('0');
            }
            else
                mamposteria.sshh = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].mamposteriaDormitorios === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].mamposteriaDormitorios === null))
                    if (incidenteNowForce.daniosMateriales[0].mamposteriaDormitorios.split('. ').length > 1)
                        mamposteria.dormitorios = (incidenteNowForce.daniosMateriales[0].mamposteriaDormitorios.split('. ')[0]);
                    else
                        mamposteria.dormitorios = ('0');
            }
            else
                mamposteria.dormitorios = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].mamposteriaGarage === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].mamposteriaGarage === null))
                    if (incidenteNowForce.daniosMateriales[0].mamposteriaGarage.split('. ').length > 1)
                        mamposteria.garage = (incidenteNowForce.daniosMateriales[0].mamposteriaGarage.split('. ')[0]);
                    else
                        mamposteria.garage = ('0');
            }
            else
                mamposteria.garage = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].mamposteriaEdAdicionales === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].mamposteriaEdAdicionales === null))
                    if (incidenteNowForce.daniosMateriales[0].mamposteriaEdAdicionales.split('. ').length > 1)
                        mamposteria.edAdicionales = (incidenteNowForce.daniosMateriales[0].mamposteriaEdAdicionales.split('. ')[0]);
                    else
                        mamposteria.edAdicionales = ('0');
            }
            else
                mamposteria.edAdicionales = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].mamposteriaPatioJardin === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].mamposteriaPatioJardin === null))
                    if (incidenteNowForce.daniosMateriales[0].mamposteriaPatioJardin.split('. ').length > 1)
                        mamposteria.patioJardin = (incidenteNowForce.daniosMateriales[0].mamposteriaPatioJardin.split('. ')[0]);
                    else
                        mamposteria.patioJardin = ('0');
            }
            else
                mamposteria.patioJardin = ('0');
            cubiertaAux.push(cubierta);
            if (!(incidenteNowForce.daniosMateriales[0].cubiertaVestibulo === null)) {
                if (incidenteNowForce.daniosMateriales[0].cubiertaVestibulo.split('. ').length > 1)
                    cubierta.vestibulo = (incidenteNowForce.daniosMateriales[0].cubiertaVestibulo.split('. ')[0]);
                else
                    cubierta.vestibulo = ('0');
            }
            else
                cubierta.vestibulo = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].cubiertaComedor === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].cubiertaComedor === null))
                    if (incidenteNowForce.daniosMateriales[0].cubiertaComedor.split('. ').length > 1)
                        cubierta.comedor = (incidenteNowForce.daniosMateriales[0].cubiertaComedor.split('. ')[0]);
                    else
                        cubierta.comedor = ('0');
            }
            else
                cubierta.comedor = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].cubiertaPasillo === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].cubiertaPasillo === null))
                    if (incidenteNowForce.daniosMateriales[0].cubiertaPasillo.split('. ').length > 1)
                        cubierta.pasillo = (incidenteNowForce.daniosMateriales[0].cubiertaPasillo.split('. ')[0]);
                    else
                        cubierta.pasillo = ('0');
            }
            else
                cubierta.pasillo = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].cubiertaCocina === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].cubiertaCocina === null))
                    if (incidenteNowForce.daniosMateriales[0].cubiertaCocina.split('. ').length > 1)
                        cubierta.cocina = (incidenteNowForce.daniosMateriales[0].cubiertaCocina.split('. ')[0]);
                    else
                        cubierta.cocina = ('0');
            }
            else
                cubierta.cocina = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].cubiertaSSHH === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].cubiertaSSHH === null))
                    if (incidenteNowForce.daniosMateriales[0].cubiertaSSHH.split('. ').length > 1)
                        cubierta.sshh = (incidenteNowForce.daniosMateriales[0].cubiertaSSHH.split('. ')[0]);
                    else
                        cubierta.sshh = ('0');
            }
            else
                cubierta.sshh = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].cubiertaDormitorios === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].cubiertaDormitorios === null))
                    if (incidenteNowForce.daniosMateriales[0].cubiertaDormitorios.split('. ').length > 1)
                        cubierta.dormitorios = (incidenteNowForce.daniosMateriales[0].cubiertaDormitorios.split('. ')[0]);
                    else
                        cubierta.dormitorios = ('0');
            }
            else
                cubierta.dormitorios = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].cubiertaGarage === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].cubiertaGarage === null))
                    if (incidenteNowForce.daniosMateriales[0].cubiertaGarage.split('. ').length > 1)
                        cubierta.garage = (incidenteNowForce.daniosMateriales[0].cubiertaGarage.split('. ')[0]);
                    else
                        cubierta.garage = ('0');
            }
            else
                cubierta.garage = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].cubiertaEdAdicionales === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].cubiertaEdAdicionales === null))
                    if (incidenteNowForce.daniosMateriales[0].cubiertaEdAdicionales.split('. ').length > 1)
                        cubierta.edAdicionales = (incidenteNowForce.daniosMateriales[0].cubiertaEdAdicionales.split('. ')[0]);
                    else
                        cubierta.edAdicionales = ('0');
            }
            else
                cubierta.edAdicionales = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].cubiertaPatioJardin === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].cubiertaPatioJardin === null))
                    if (incidenteNowForce.daniosMateriales[0].cubiertaPatioJardin.split('. ').length > 1)
                        cubierta.patioJardin = (incidenteNowForce.daniosMateriales[0].cubiertaPatioJardin.split('. ')[0]);
                    else
                        cubierta.patioJardin = ('0');
            }
            else
                cubierta.patioJardin = ('0');
            pisoAux.push(piso);
            if (!(incidenteNowForce.daniosMateriales[0].pisoVestibulo === null)) {
                if (incidenteNowForce.daniosMateriales[0].pisoVestibulo.split('. ').length > 1)
                    piso.vestibulo = (incidenteNowForce.daniosMateriales[0].pisoVestibulo.split('. ')[0]);
                else
                    piso.vestibulo = ('0');
            }
            else
                piso.vestibulo = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].pisoComedor === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].pisoComedor === null))
                    if (incidenteNowForce.daniosMateriales[0].pisoComedor.split('. ').length > 1)
                        piso.comedor = (incidenteNowForce.daniosMateriales[0].pisoComedor.split('. ')[0]);
                    else
                        piso.comedor = ('0');
            }
            else
                piso.comedor = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].pisoPasillo === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].pisoPasillo === null))
                    if (incidenteNowForce.daniosMateriales[0].pisoPasillo.split('. ').length > 1)
                        piso.pasillo = (incidenteNowForce.daniosMateriales[0].pisoPasillo.split('. ')[0]);
                    else
                        piso.pasillo = ('0');
            }
            else
                piso.pasillo = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].pisoCocina === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].pisoCocina === null))
                    if (incidenteNowForce.daniosMateriales[0].pisoCocina.split('. ').length > 1)
                        piso.cocina = (incidenteNowForce.daniosMateriales[0].pisoCocina.split('. ')[0]);
                    else
                        piso.cocina = ('0');
            }
            else
                piso.cocina = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].pisoSSHH === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].pisoSSHH === null))
                    if (incidenteNowForce.daniosMateriales[0].pisoSSHH.split('. ').length > 1)
                        piso.sshh = (incidenteNowForce.daniosMateriales[0].pisoSSHH.split('. ')[0]);
                    else
                        piso.sshh = ('0');
            }
            else
                piso.sshh = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].pisoDormitorios === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].pisoDormitorios === null))
                    if (incidenteNowForce.daniosMateriales[0].pisoDormitorios.split('. ').length > 1)
                        piso.dormitorios = (incidenteNowForce.daniosMateriales[0].pisoDormitorios.split('. ')[0]);
                    else
                        piso.dormitorios = ('0');
            }
            else
                piso.dormitorios = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].pisoGarage === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].pisoGarage === null))
                    if (incidenteNowForce.daniosMateriales[0].pisoGarage.split('. ').length > 1)
                        piso.garage = (incidenteNowForce.daniosMateriales[0].pisoGarage.split('. ')[0]);
                    else
                        piso.garage = ('0');
            }
            else
                piso.garage = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].pisoEdAdicionales === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].pisoEdAdicionales === null))
                    if (incidenteNowForce.daniosMateriales[0].pisoEdAdicionales.split('. ').length > 1)
                        piso.edAdicionales = (incidenteNowForce.daniosMateriales[0].pisoEdAdicionales.split('. ')[0]);
                    else
                        piso.edAdicionales = ('0');
            }
            else
                piso.edAdicionales = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].pisoPatioJardin === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].pisoPatioJardin === null))
                    if (incidenteNowForce.daniosMateriales[0].pisoPatioJardin.split('. ').length > 1)
                        piso.patioJardin = (incidenteNowForce.daniosMateriales[0].pisoPatioJardin.split('. ')[0]);
                    else
                        piso.patioJardin = ('0');
            }
            else
                piso.patioJardin = ('0');
            entrepisoAux.push(entrepiso);
            if (!(incidenteNowForce.daniosMateriales[0].entrepisoVestibulo === null)) {
                if (incidenteNowForce.daniosMateriales[0].entrepisoVestibulo.split('. ').length > 1)
                    entrepiso.vestibulo = (incidenteNowForce.daniosMateriales[0].entrepisoVestibulo.split('. ')[0]);
                else
                    entrepiso.vestibulo = ('0');
            }
            else
                entrepiso.vestibulo = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].entrepisoComedor === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].entrepisoComedor === null))
                    if (incidenteNowForce.daniosMateriales[0].entrepisoComedor.split('. ').length > 1)
                        entrepiso.comedor = (incidenteNowForce.daniosMateriales[0].entrepisoComedor.split('. ')[0]);
                    else
                        entrepiso.comedor = ('0');
            }
            else
                entrepiso.comedor = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].entrepisoPasillo === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].entrepisoPasillo === null))
                    if (incidenteNowForce.daniosMateriales[0].entrepisoPasillo.split('. ').length > 1)
                        entrepiso.pasillo = (incidenteNowForce.daniosMateriales[0].entrepisoPasillo.split('. ')[0]);
                    else
                        entrepiso.pasillo = ('0');
            }
            else
                entrepiso.pasillo = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].entrepisoCocina === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].entrepisoCocina === null))
                    if (incidenteNowForce.daniosMateriales[0].entrepisoCocina.split('. ').length > 1)
                        entrepiso.cocina = (incidenteNowForce.daniosMateriales[0].entrepisoCocina.split('. ')[0]);
                    else
                        entrepiso.cocina = ('0');
            }
            else
                entrepiso.cocina = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].entrepisoSSHH === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].entrepisoSSHH === null))
                    if (incidenteNowForce.daniosMateriales[0].entrepisoSSHH.split('. ').length > 1)
                        entrepiso.sshh = (incidenteNowForce.daniosMateriales[0].entrepisoSSHH.split('. ')[0]);
                    else
                        entrepiso.sshh = ('0');
            }
            else
                entrepiso.sshh = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].entrepisoDormitorios === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].entrepisoDormitorios === null))
                    if (incidenteNowForce.daniosMateriales[0].entrepisoDormitorios.split('. ').length > 1)
                        entrepiso.dormitorios = (incidenteNowForce.daniosMateriales[0].entrepisoDormitorios.split('. ')[0]);
                    else
                        entrepiso.dormitorios = ('0');
            }
            else
                entrepiso.dormitorios = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].entrepisoGarage === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].entrepisoGarage === null))
                    if (incidenteNowForce.daniosMateriales[0].entrepisoGarage.split('. ').length > 1)
                        entrepiso.garage = (incidenteNowForce.daniosMateriales[0].entrepisoGarage.split('. ')[0]);
                    else
                        entrepiso.garage = ('0');
            }
            else
                entrepiso.garage = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].entrepisoEdAdicionales === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].entrepisoEdAdicionales === null))
                    if (incidenteNowForce.daniosMateriales[0].entrepisoEdAdicionales.split('. ').length > 1)
                        entrepiso.edAdicionales = (incidenteNowForce.daniosMateriales[0].entrepisoEdAdicionales.split('. ')[0]);
                    else
                        entrepiso.edAdicionales = ('0');
            }
            else
                entrepiso.edAdicionales = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].entrepisoPatioJardin === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].entrepisoPatioJardin === null))
                    if (incidenteNowForce.daniosMateriales[0].entrepisoPatioJardin.split('. ').length > 1)
                        entrepiso.patioJardin = (incidenteNowForce.daniosMateriales[0].entrepisoPatioJardin.split('. ')[0]);
                    else
                        entrepiso.patioJardin = ('0');
            }
            else
                entrepiso.patioJardin = ('0');
            columnasAux.push(columnas);
            if (!(incidenteNowForce.daniosMateriales[0].columnasVestibulo === null)) {
                if (incidenteNowForce.daniosMateriales[0].columnasVestibulo.split('. ').length > 1)
                    columnas.vestibulo = (incidenteNowForce.daniosMateriales[0].columnasVestibulo.split('. ')[0]);
                else
                    columnas.vestibulo = ('0');
            }
            else
                columnas.vestibulo = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].columnasComedor === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].columnasComedor === null))
                    if (incidenteNowForce.daniosMateriales[0].columnasComedor.split('. ').length > 1)
                        columnas.comedor = (incidenteNowForce.daniosMateriales[0].columnasComedor.split('. ')[0]);
                    else
                        columnas.comedor = ('0');
            }
            else
                columnas.comedor = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].columnasPasillo === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].columnasPasillo === null))
                    if (incidenteNowForce.daniosMateriales[0].columnasPasillo.split('. ').length > 1)
                        columnas.pasillo = (incidenteNowForce.daniosMateriales[0].columnasPasillo.split('. ')[0]);
                    else
                        columnas.pasillo = ('0');
            }
            else
                columnas.pasillo = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].columnasCocina === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].columnasCocina === null))
                    if (incidenteNowForce.daniosMateriales[0].columnasCocina.split('. ').length > 1)
                        columnas.cocina = (incidenteNowForce.daniosMateriales[0].columnasCocina.split('. ')[0]);
                    else
                        columnas.cocina = ('0');
            }
            else
                columnas.cocina = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].columnasSSHH === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].columnasSSHH === null))
                    if (incidenteNowForce.daniosMateriales[0].columnasSSHH.split('. ').length > 1)
                        columnas.sshh = (incidenteNowForce.daniosMateriales[0].columnasSSHH.split('. ')[0]);
                    else
                        columnas.sshh = ('0');
            }
            else
                columnas.sshh = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].columnasDormitorios === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].columnasDormitorios === null))
                    if (incidenteNowForce.daniosMateriales[0].columnasDormitorios.split('. ').length > 1)
                        columnas.dormitorios = (incidenteNowForce.daniosMateriales[0].columnasDormitorios.split('. ')[0]);
                    else
                        columnas.dormitorios = ('0');
            }
            else
                columnas.dormitorios = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].columnasGarage === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].columnasGarage === null))
                    if (incidenteNowForce.daniosMateriales[0].columnasGarage.split('. ').length > 1)
                        columnas.garage = (incidenteNowForce.daniosMateriales[0].columnasGarage.split('. ')[0]);
                    else
                        columnas.garage = ('0');
            }
            else
                columnas.garage = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].columnasEdAdicionales === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].columnasEdAdicionales === null))
                    if (incidenteNowForce.daniosMateriales[0].columnasEdAdicionales.split('. ').length > 1)
                        columnas.edAdicionales = (incidenteNowForce.daniosMateriales[0].columnasEdAdicionales.split('. ')[0]);
                    else
                        columnas.edAdicionales = ('0');
            }
            else
                columnas.edAdicionales = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].columnasPatioJardin === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].columnasPatioJardin === null))
                    if (incidenteNowForce.daniosMateriales[0].columnasPatioJardin.split('. ').length > 1)
                        columnas.patioJardin = (incidenteNowForce.daniosMateriales[0].columnasPatioJardin.split('. ')[0]);
                    else
                        columnas.patioJardin = ('0');
            }
            else
                columnas.patioJardin = ('0');
            ventanasAux.push(ventanas);
            if (!(incidenteNowForce.daniosMateriales[0].ventanasVestibulo === null)) {
                if (incidenteNowForce.daniosMateriales[0].ventanasVestibulo.split('. ').length > 1)
                    ventanas.vestibulo = (incidenteNowForce.daniosMateriales[0].ventanasVestibulo.split('. ')[0]);
                else
                    ventanas.vestibulo = ('0');
            }
            else
                ventanas.vestibulo = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].ventanasComedor === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].ventanasComedor === null))
                    if (incidenteNowForce.daniosMateriales[0].ventanasComedor.split('. ').length > 1)
                        ventanas.comedor = (incidenteNowForce.daniosMateriales[0].ventanasComedor.split('. ')[0]);
                    else
                        ventanas.comedor = ('0');
            }
            else
                ventanas.comedor = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].ventanasPasillo === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].ventanasPasillo === null))
                    if (incidenteNowForce.daniosMateriales[0].ventanasPasillo.split('. ').length > 1)
                        ventanas.pasillo = (incidenteNowForce.daniosMateriales[0].ventanasPasillo.split('. ')[0]);
                    else
                        ventanas.pasillo = ('0');
            }
            else
                ventanas.pasillo = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].ventanasCocina === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].ventanasCocina === null))
                    if (incidenteNowForce.daniosMateriales[0].ventanasCocina.split('. ').length > 1)
                        ventanas.cocina = (incidenteNowForce.daniosMateriales[0].ventanasCocina.split('. ')[0]);
                    else
                        ventanas.cocina = ('0');
            }
            else
                ventanas.cocina = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].ventanasSSHH === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].ventanasSSHH === null))
                    if (incidenteNowForce.daniosMateriales[0].ventanasSSHH.split('. ').length > 1)
                        ventanas.sshh = (incidenteNowForce.daniosMateriales[0].ventanasSSHH.split('. ')[0]);
                    else
                        ventanas.sshh = ('0');
            }
            else
                ventanas.sshh = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].ventanasDormitorios === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].ventanasDormitorios === null))
                    if (incidenteNowForce.daniosMateriales[0].ventanasDormitorios.split('. ').length > 1)
                        ventanas.dormitorios = (incidenteNowForce.daniosMateriales[0].ventanasDormitorios.split('. ')[0]);
                    else
                        ventanas.dormitorios = ('0');
            }
            else
                ventanas.dormitorios = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].ventanasGarage === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].ventanasGarage === null))
                    if (incidenteNowForce.daniosMateriales[0].ventanasGarage.split('. ').length > 1)
                        ventanas.garage = (incidenteNowForce.daniosMateriales[0].ventanasGarage.split('. ')[0]);
                    else
                        ventanas.garage = ('0');
            }
            else
                ventanas.garage = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].ventanasEdAdicionales === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].ventanasEdAdicionales === null))
                    if (incidenteNowForce.daniosMateriales[0].ventanasEdAdicionales.split('. ').length > 1)
                        ventanas.edAdicionales = (incidenteNowForce.daniosMateriales[0].ventanasEdAdicionales.split('. ')[0]);
                    else
                        ventanas.edAdicionales = ('0');
            }
            else
                ventanas.edAdicionales = ('0');
            if (!(incidenteNowForce.daniosMateriales[0].ventanasPatioJardin === null)) {
                if (!(incidenteNowForce.daniosMateriales[0].ventanasPatioJardin === null))
                    if (incidenteNowForce.daniosMateriales[0].ventanasPatioJardin.split('. ').length > 1)
                        ventanas.patioJardin = (incidenteNowForce.daniosMateriales[0].ventanasPatioJardin.split('. ')[0]);
                    else
                        ventanas.patioJardin = ('0');
            }
            else
                ventanas.patioJardin = ('0');
        } else{
            ventanas.patioJardin = ('0');
            ventanas.edAdicionales = ('0');
            ventanas.garage = ('0');
            ventanas.dormitorios = ('0');
            ventanas.sshh = ('0');
            ventanas.cocina = ('0');
            ventanas.pasillo = ('0');
            ventanas.comedor = ('0');
            ventanas.comedor = ('0');
            ventanas.vestibulo = ('0');

            mamposteria.patioJardin = ('0');
            mamposteria.edAdicionales = ('0');
            mamposteria.garage = ('0');
            mamposteria.dormitorios = ('0');
            mamposteria.sshh = ('0');
            mamposteria.cocina = ('0');
            mamposteria.pasillo = ('0');
            mamposteria.comedor = ('0');
            mamposteria.comedor = ('0');
            mamposteria.vestibulo = ('0');

            cubierta.patioJardin = ('0');
            cubierta.edAdicionales = ('0');
            cubierta.garage = ('0');
            cubierta.dormitorios = ('0');
            cubierta.sshh = ('0');
            cubierta.cocina = ('0');
            cubierta.pasillo = ('0');
            cubierta.comedor = ('0');
            cubierta.comedor = ('0');
            cubierta.vestibulo = ('0');



            piso.patioJardin = ('0');
            piso.edAdicionales = ('0');
            piso.garage = ('0');
            piso.dormitorios = ('0');
            piso.sshh = ('0');
            piso.cocina = ('0');
            piso.pasillo = ('0');
            piso.comedor = ('0');
            piso.comedor = ('0');
            piso.vestibulo = ('0');

            entrepiso.patioJardin = ('0');
            entrepiso.edAdicionales = ('0');
            entrepiso.garage = ('0');
            entrepiso.dormitorios = ('0');
            entrepiso.sshh = ('0');
            entrepiso.cocina = ('0');
            entrepiso.pasillo = ('0');
            entrepiso.comedor = ('0');
            entrepiso.comedor = ('0');
            entrepiso.vestibulo = ('0');

            columnas.patioJardin = ('0');
            columnas.edAdicionales = ('0');
            columnas.garage = ('0');
            columnas.dormitorios = ('0');
            columnas.sshh = ('0');
            columnas.cocina = ('0');
            columnas.pasillo = ('0');
            columnas.comedor = ('0');
            columnas.comedor = ('0');
            columnas.vestibulo = ('0');

        }
        let imagen1 = '';
        let imagen2 = '';
        let imagen3 = '';
        let hayFotos = false;
        if (incidenteNowForce.daniosMateriales[0]) {
            if (incidenteNowForce.daniosMateriales[0].foto1 !== null) {
                hayFotos = true;
                imagen1 = incidenteNowForce.daniosMateriales[0].foto1;
            }
            if (incidenteNowForce.daniosMateriales[0].foto2 !== null) {
                hayFotos = true;
                imagen2 = incidenteNowForce.daniosMateriales[0].foto2;
            }
            if (incidenteNowForce.daniosMateriales[0].foto3 !== null) {
                hayFotos = true;
                imagen3 = incidenteNowForce.daniosMateriales[0].foto3;
            }
        }
        if (hayFotos === false) {
        }
        let bienesMueblesPerdidos = 0;
        const requerimientoAsistenciaHumanitaria = {
            vestimenta: '',
            calzado: '',
            frazadas: '',
            alimentosPreparados: '',
            alimentosNoPerecibles: '',
            kitHigiene: '',
            reposicionMenaje: '',
            kitEscolar: '',
            toallas:'',
            medicinas:'',
            gastosMortuorios:'',
            bienesMuebles: '',
            otros:'',
        };
        const fechaTempIO = new Date(incidenteNowForce.Fecha);
        const horauString = ('0' + fechaTempIO.getHours()).slice(-2) + ':' + ('0' + fechaTempIO.getMinutes()).slice(-2) + ':' + ('0' + fechaTempIO.getSeconds()).slice(-2);
        const horauInspeccion = '';
        let inspeccionCierreAux = '';
        let inspeccionSeguimientoAux = '';
        let inspeccionInicialAux = '';
        if (anexo2 !== ' ') {
            if (anexo2Dato === 'inicial') {
                inspeccionInicialAux = 'x';
            }
            if (anexo2Dato === 'seguimiento') {
                inspeccionSeguimientoAux = 'x';
            }
            if (anexo2Dato === 'cierre') {
                inspeccionCierreAux = 'x';
            }
        }
        let horauStringCierre = '';
        if (fechaInspecciondato !== '' || fechaInspecciondato) {
            const fechaTempIOCierre = new Date(fechaInspecciondato);
            horauStringCierre = ('0' + fechaTempIOCierre.getHours()).slice(-2) + ':' + ('0' + fechaTempIOCierre.getMinutes()).slice(-2) + ':' + ('0' + fechaTempIOCierre.getSeconds()).slice(-2);
        }
        else {
            horauStringCierre = '';
        }
        let accionesRealizadas = '';
        let recomendaciones = '';
        if(incidenteNowForce.daniosMateriales[0]){
            if (incidenteNowForce.daniosMateriales[0].BienesMuebles !== null || incidenteNowForce.daniosMateriales[0].BienesMuebles !== undefined) {
                bienesMueblesPerdidos = incidenteNowForce.daniosMateriales[0].BienesMuebles;
            }
        }
        const fechaImpresionAux = new Date();
        let auxNumeFamilias = 0;
        if (integrantesFamilia) {
            for (const aux of integrantesFamilia) {
                if (aux.nombres === '' || aux.nombres === null) {
                    auxNumeFamilias = 0;
                }
                else {
                    auxNumeFamilias = arregloFamilia.length;
                }
            }
        }
        if (incidenteNowForce.accionesRealizadas !== null) {
            accionesRealizadas = incidenteNowForce.accionesRealizadas;
        }
        if (incidenteNowForce.recomendaciones !== null) {
            recomendaciones = incidenteNowForce.recomendaciones;
        }

        let fechaEventoAux = new Date(incidenteNowForce.Fecha.setHours(incidenteNowForce.Fecha.getHours() + 5));
        return {
            numero: incidenteNowForce.id,
            logo: 'data:image/png;base64,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',
            colores: 'data:image/png;base64,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',
            administracionZonal: incidenteNowForce.administracioZonal,
            fechaEvento: AppUtil.formatearFechaHora(fechaEventoAux),
            fechaInspeccion: AppUtil.formatearFechaHora(fechaInspecciondato),
            inspeccionInicial: inspeccionInicialAux,
            inspeccionSeguimiento: inspeccionSeguimientoAux,
            inspeccionCierre: inspeccionCierreAux,
            inspeccionHoraInicial: horauString,
            inspeccionHoraFin: horauStringCierre,
            parroquia: incidenteNowForce.parroquia,
            barrio: incidenteNowForce.barrio,
            direccion: incidenteNowForce.direccion,
            referencia: referencia.toString(),
            solicitadoPor: 'COEM',
            tipoEvento: incidenteNowForce.tipo,
            latitud: incidenteNowForce.latitud.toFixed(7),
            longitud: incidenteNowForce.longitud.toFixed(7),
            zona: incidenteNowForce.zona,
            coordenadaX: incidenteNowForce.coordenadaX,
            coordenadaY: incidenteNowForce.coordenadaY,
            integrantesFamilia,
            numeroFamiliasAfectadas: auxNumeFamilias,
            numeroFamiliasAlbergados: famiAlbergadas,
            numeroFamiliasDamnificados: famiDamnificadas,
            numeroFamiliasRenuentes: 0,
            numeroPersonasAfectadosMujeres: numafectadosM,
            numeroPersonasAfectadosHombres: numafectadosH,
            numeroPersonasAlbergadosMujeres: numalbergadosM,
            numeroPersonasAlbergadosHombres: numalbergadosH,
            numeroPersonasDamnificadosMujeres: numDamnificadosM,
            numeroPersonasDamnificadosHombres: numDamnificadosH,
            numeroPersonasHeridosEstables: 0,
            numeroPersonasHeridosCriticos: numHeridos,
            numeroPersonasFallecidos: numFallecidos,
            numeroPersonasRenuentes: 0,
            metalica: metalicaTC,
            hormigonArmado: hormigonTC,
            adobe: adobeTC,
            madera: maderaTC,
            mixta: mixtaTC,
            otros: otrosTC,
            mamposteriaAux,
            cubiertaAux,
            pisoAux,
            entrepisoAux,
            columnasAux,
            ventanasAux,
            mapa,
            bienesMueblesPerdidos,
            requerimientoAsistenciaHumanitaria,
            recursosEnviados,
            acciones: accionesRealizadas,
            recomendacionesAux: recomendaciones,
            fechaImpresion: AppUtil.formatearFechaHora(fechaImpresionAux),
            imagen1,
            imagen2,
            imagen3,
            anexo2,
            anexo3,
            nombreTecnico,
            cargoTecnico,
            responsabilidadTecnico,
            nombreRevisor,
            cargoRevisor,
            responsabilidadRevisor,
            dataDD,
        };
    }
    mapearIncidenteAReporteNowForceFe(incidenteNowForce, referencia) {
        if (!referencia) {
            referencia = '';
        }
        const dataTable = [];
        const arregloFamilia = [];
        const arregloFamiliaData = [];
        const arregloFamiliaDataC = [];
        let numafectadosH = 0;
        let numafectadosM = 0;
        let numalbergadosH = 0;
        let numalbergadosM = 0;
        let numDamnificadosH = 0;
        let numDamnificadosM = 0;
        let numHeridos = 0;
        let numFallecidos = 0;
        const dataDD = [];
        incidenteNowForce.cidadanos.sort((a, b) => {
            if (a.familia < b.familia) {
                return -1;
            }
            if (a.familia > b.familia) {
                return 1;
            }
            return 0;
        });
        const integrantesFamilia = [];
        for (let ppp = 0; ppp < incidenteNowForce.cidadanos.length; ppp++) {
            const integranteFamilia: any = {};
            integrantesFamilia.push(integranteFamilia);
            integranteFamilia.nombres = incidenteNowForce.cidadanos[ppp].nombre;
            integranteFamilia.sexo = incidenteNowForce.cidadanos[ppp].sexo;
            integranteFamilia.edad = incidenteNowForce.cidadanos[ppp].edad;
            integranteFamilia.cedula = incidenteNowForce.cidadanos[ppp].cedula;
            integranteFamilia.parentesco = incidenteNowForce.cidadanos[ppp].parentesco;
            integranteFamilia.numeroTelefonoContacto = '';
            const asistenciaCiud = [];
            asistenciaCiud.push(incidenteNowForce.cidadanos[ppp].familia);
            if (incidenteNowForce.cidadanos[ppp].vestimenta === true) {
                asistenciaCiud.push('Si');
                integranteFamilia.vestimenta = 'Si';
            }
            else {
                asistenciaCiud.push('No');
                integranteFamilia.vestimenta = 'No';
            }
            if (incidenteNowForce.cidadanos[ppp].calzado === true) {
                asistenciaCiud.push('Si');
                integranteFamilia.calzado = 'Si';
            }
            else {
                asistenciaCiud.push('No');
                integranteFamilia.calzado = 'No';
            }
            if (incidenteNowForce.cidadanos[ppp].frazada === true)
                asistenciaCiud.push('Si');
            else
                asistenciaCiud.push('No');
            if (incidenteNowForce.cidadanos[ppp].alimentosPerecibles === true)
                asistenciaCiud.push('Si');
            else
                asistenciaCiud.push('No');
            if (incidenteNowForce.cidadanos[ppp].alimentosNoPerecibles === true)
                asistenciaCiud.push('Si');
            else
                asistenciaCiud.push('No');
            if (incidenteNowForce.cidadanos[ppp].kitHigiene === true)
                asistenciaCiud.push('Si');
            else
                asistenciaCiud.push('No');
            if (incidenteNowForce.cidadanos[ppp].bienesMuebles === true)
                asistenciaCiud.push('Si');
            else
                asistenciaCiud.push('No');
            const dataCiudadanos = [];
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].nombre);
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].sexo);
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].edad);
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].parentesco);
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].vestimentaTalla);
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].calzadoTalla);
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].cedula);
            dataTable.push(dataCiudadanos);
            if (arregloFamilia.indexOf(incidenteNowForce.cidadanos[ppp].familia) === -1) {
                arregloFamilia.push(incidenteNowForce.cidadanos[ppp].familia);
                const arregloTenEe = [];
                arregloTenEe.push(dataCiudadanos);
                arregloFamiliaData.push(arregloTenEe);
                const arregloTenEeC = [];
                arregloTenEeC.push(incidenteNowForce.cidadanos[ppp]);
                arregloFamiliaDataC.push(arregloTenEeC);
                dataDD.push(asistenciaCiud);
            }
            else {
                arregloFamiliaData[arregloFamilia.indexOf(incidenteNowForce.cidadanos[ppp].familia)].push(dataCiudadanos);
                arregloFamiliaDataC[arregloFamilia.indexOf(incidenteNowForce.cidadanos[ppp].familia)].push(incidenteNowForce.cidadanos[ppp]);
            }
            if (incidenteNowForce.cidadanos[ppp].sexo === 'Masculino' && incidenteNowForce.cidadanos[ppp].afectada === true)
                numafectadosH++;
            if (incidenteNowForce.cidadanos[ppp].sexo === 'Femenino' && incidenteNowForce.cidadanos[ppp].afectada === true)
                numafectadosM++;
            if (incidenteNowForce.cidadanos[ppp].sexo === 'Masculino' && incidenteNowForce.cidadanos[ppp].albergada === true)
                numalbergadosH++;
            if (incidenteNowForce.cidadanos[ppp].sexo === 'Femenino' && incidenteNowForce.cidadanos[ppp].albergada === true)
                numalbergadosM++;
            if (incidenteNowForce.cidadanos[ppp].sexo === 'Masculino' && incidenteNowForce.cidadanos[ppp].damnificada === true)
                numDamnificadosH++;
            if (incidenteNowForce.cidadanos[ppp].sexo === 'Femenino' && incidenteNowForce.cidadanos[ppp].damnificada === true)
                numDamnificadosM++;
            if (incidenteNowForce.cidadanos[ppp].herido === true)
                numHeridos++;
            if (incidenteNowForce.cidadanos[ppp].fallecido === true)
                numFallecidos++;
        }
        let famiAfectadas = 0;
        let famiAlbergadas = 0;
        let famiDamnificadas = 0;
        for (let tt = 0; tt < arregloFamilia.length; tt++) {
            for (let ttt = 0; ttt < arregloFamiliaDataC[tt].length; ttt++) {
                if (arregloFamiliaDataC[tt][ttt].afectada === true) {
                    famiAfectadas++;
                    break;
                }
            }
            for (let ttt = 0; ttt < arregloFamiliaDataC[tt].length; ttt++) {
                if (arregloFamiliaDataC[tt][ttt].albergada === true) {
                    famiAlbergadas++;
                    break;
                }
            }
            for (let ttt = 0; ttt < arregloFamiliaDataC[tt].length; ttt++) {
                if (arregloFamiliaDataC[tt][ttt].damnificada === true) {
                    famiDamnificadas++;
                    break;
                }
            }
        }
        let metalicaTC = '';
        let hormigonTC = '';
        let adobeTC = '';
        let maderaTC = '';
        let mixtaTC = '';
        let otrosTC = '';
        if (incidenteNowForce.daniosMateriales.length > 0) {
            if (incidenteNowForce.daniosMateriales[0].metalicaTC === true)
                metalicaTC = 'X';
            if (incidenteNowForce.daniosMateriales[0].hormigoArmadoTC === true)
                hormigonTC = 'X';
            if (incidenteNowForce.daniosMateriales[0].adobeTC === true)
                adobeTC = 'X';
            if (incidenteNowForce.daniosMateriales[0].maderaTC === true)
                maderaTC = 'X';
            if (incidenteNowForce.daniosMateriales[0].mixtaTC === true)
                mixtaTC = 'X';
            if (incidenteNowForce.daniosMateriales[0].otrosTC === true)
                otrosTC = 'X';
        }
        let fechaEventoAux = new Date(incidenteNowForce.Fecha.setHours(incidenteNowForce.Fecha.getHours() + 5));
        const mapa = this.getUrlImgenMapa({ base: 500, altura: 500 }, { latitud: -0.298817, longitud: -78.5667955999 });
        return {
            numero: incidenteNowForce.id,
            logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAG9CAMAAADayeLuAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAYNQTFRFAAAALhUQPR0VDwcFTCQbiEAwtVVA8nJVWysgl0c1pk461GRKHg4LxF1FajIleTkrABknADFOAENrAEl1AFySAGKcABIdAAwUAB8xAFaIACtFAAYKACU7AD1hADdXOQcJDgICKwUHHAMEcQ4SmxMYqRQaxhgf4hsjtxYcjREWRwgLVQoNfw8U1BkhYwwPAFB/AAcLADRMAFJ3AENhADxXAB4rAHCiAC1BABYhAEpsACU2AA8WAGGMAHetAFmCAGiX8nJV8nJV8nJV8nJV8nJV8nJV8nJV8nJV8nJV8nJV8nJV8nJV8nJV8nJV8nJVAGKcAGKcAGKcAGKcAGKcAGKcAGKcAGKcAGKcAGKcAGKcAGKcAGKcAGKc4hsj4hsj4hsj4hsj4hsj4hsj4hsj4hsj4hsj4hsj4hsj4hsj4hsj4hsj4hsjAGKcAHetAHetAHetAHetAHetAHetAHetAHetAHetAHetAHetAHetAHetAHetAHet8nJVAGKc4hsjAHet////nkic/gAAAHx0Uk5TAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADBAEFCPv2Cfr98gz3DvgECAr7/vMCBQ33AQYJ+PQBAwIL+PgK/fz59QYO9wzxBwr4+AQM/vYDCf31C/IGj9h4UAAAABYktHRIBlvZ5oAAAACXBIWXMAAABIAAAASABGyWs+AAAnN0lEQVR42u2d6UPbVr6GT5uZtL3Te0uSljSBBAIlDU2mYwiULYEk0zRN0gaD2YxjY2PAYPAuL9jI51+/HyTZkiwbHUm2tvf5dCfptRX5PPotZxEhAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAu/jiyy+/wF0AoIMb//jnza++evX69auvvrr5z69v4I4A0OLLb9789/e3VyJvf//jzf98jbsCACGEkH/86/W7KxV//vEvKAIAId/e/O/7Kw3e//G/qEeA7/m/D2+vuvDx1Xe4P8DffPPX31fd+XQT1TrwMTf+991VT96+gSHAv7z5eHUNH2EI8G9+da0fV1cf3+A+AZ/W5++udPDxn7hTwI988deVLn7/B+4V8CGvrnTyX5QhwH98/VGvIO9RhgD/8ceVbj4hhADfBZD3+gX5GyEEIID0CiG4X8BffPuWRZD3WLYI/MWHKyZe4Y4BX/EXmyC/444BX/EnmyAfcceAr3jPJsjVl7hlwEd8yejH1WvcM+AjXkMQACwUBDMhAIJAEAAgCAAQBIBBCvIH7hnwER/QxQKgB6yCfMAtA37iLZsff+OOAV/xO5sgf+KOAVTpqNEBEPmbSRDsuQXIsbrzDvcL+IwPaPIC0IN3+v14i7sF/BdC/kYAAaA7n7AhHYAe6JwsxMmjwJ+80ZVk/f0Kdwr4k1d/Y44QAFOGwA8AQ7rnV/AD+NuQnm8JeY/6A/i9Uu+x5uRP9K8AeNWl3fsR84MAEELIa42Tet+i+gBA4sNfijDy8RO22PqNoaFbt27fufP9Dy2+v3Pn9q1bQ8O4N2Ic+ePTp0+fPn36C6mVv7j74607935YXw8GNzY3Q3yL0ObmRjC4vvXDvTu3fryL+wR8yPD9299v7wQ3d/ke7G4Gd7bv3b6PWAL8xMjog++39jZCvC52N/a27j34cQT3DfjDjtvh/YhOOVqSRHbCt0fhCPA6o7fD+xu8ITb2ww9+xB0EHi7KH35v1A6ByM69W2aL9jG9GPz8cb2f/8jQx3+r+acTY+Z5hAFqL0N3tj+HeJPsBrcfDJm6jKheDH5+TO/nHxjR4xvtaZB41DwHJm7qo7HJyZ+mph7/LPFkamp6ctLwU8aPudW99U3eEiLrd8wo0tSLUQH1fn7CiB7vrrStPGyaJmHonzs+NvnTk58PosnkUSJx3Pqwk0QilUxGoz8/npr8ZQLD/3o99nd5y9g0o4hrBbnxzYd3V1dyQeTZZjw1eEHGn04/iUWTRyc9PvU4kTyNP55+Ckl68KOlephUxKWC3PjujXAckOzPtm/LFYkmBirIo8knsbPUia6PPk6dxR8/+wUmdKk9dizWQ1Dk9l3/CHLjuzefxB1Usj/d3Nh+IG99R48HJcijZ48PkidMH398ePrvaTjSwcgDq2qPjrbv9q0Rfwgi00MpCM9HwoqbcHY8AEHGf318cGjki9Kp08fPkGspuB+O8H0jGB7ygyBfy/RQC8KHguFR+X+cTPdZkLHp2LlxDY8P41NPoUWriryzF+L7yO76gxGvC/L1v/54L1/wrhKE50P79+Tzp7FkPwV5OhU12w1InD3+dRxuEELI/e1Nvs9EmIOIuwRR66EhCM/v7ihaFgYbWjqu5+njM5OdACGMnMcmoQgZ6XP4EJfGrz8c8awgX95U66EpSEfL4iDRD0GePj47blpDOglFhsKb/ED4HB72piBf3nytsSldUxCe39h+oOj5nlgtyNiUZXqIivi7Frm1HuIHxMXWqAcF0dajqyA8H9k219DqeT0TP0UTTWs5Pnvi35UoI7eD/OAI7T/0miDffvO6y5EmXQXhQ8HwfRMNrV7XMxk/alrPSXTap3nWcHiDHyif74x4SZBvhVUljILwfGjv3qiioZW2RJBHT4w3j3uTivly6nB464IfMJvhu54RpJcevQXh+d19ww2trtczeXDS7Bfp05/8F0RGt0L8wLnYHvaGIDe++9DzHWy9BeH5zfU7ikWMCZPXM/Ek2ewnRzG/VSKj+7wdhLaGPSDIje/eXPN+qesE4flNVUMrYUaQp/GTZn9JR5/5q31ljx88H9LXzHKyIIpFV4YFMdjQ0hRk+izd7DuHUz5Ksx4EebsI7Y+6W5Cvr9dDnyB8KBi+Jf/k87QhQcafpJqDIBHzzX7fBxHeRvQY4lhBvv7XH3reK6VLEJ4PBVkbWp2CPIqdNAdD+sAns4a3bPWD5/d/dKsgnYuuzAnC87v7/2FqaHUI8stBujkwziZ9UZ8HeZvZGXapIDr1YBCE5y/W7wzrb2ipBXl6OkA/ms3kNPpXjuhlOVQQva9GZxGE5ze39De0VII8PWsOlpTnDRmy3w+eD22NQJDuDa3TY53XMz1oP5rN1BNvN7OG13knEAqPQBDlvktFQ6tr31ZxPdOp5uA5iXnZkBE75s81M+8wBDHS0JJfzzM7/Gg2T2IeFiS8yzuEjVsQpGdDK5a65nqeHjbt4cS7dcjDTd4xBIcgSGdDS9HzPep1PU/Pmnbh2Ur9x8+8g1i/C0E6FzFe09BqXc+YfX40mylvLsy6u+MkP/jQNgTRamg97NXQkq7nUbRpJ4eenFPfDjlKEH7zFgTR3L7fYxGjeD3jB2lbBWmeeXBd1n1LCpDdTRELbAsOQxDtRYxdG1ri9cSOmzZz4Llm7/Ce2c5sZG9d0Zzd2glumNNkC4J0aWjdUzS0DlXX8yxhtx/NtOeavVum6oXIfpeJi609EzvbL255X5D9oDaRa46j1N6VmyCEkF8Om/Zz4rFC/b6JHeiRnd6TK/sXVidZHhKkG+uMDa1kMplMJs8IIROnTSdw6KmjHO4aTrB298I66v+ItUkWBOF5PrKtfahxPO0IQZqnXipDjHawdvf1ztEHDX3D5igE6aGI1rPp14Qz/PBUGTJkrFAI7TN8R9jQNOT+CATpkYJ2/v9NnDedwpF3kixja3iDYcYwZaBjEwpDECZBnJJgeSrJGjVSRV9ssX+RgaPig3chCIMgv5hPsBKJVDKZTB4lTpBkSa1GI+HDWK3DHkS2IYj+H2HcXAfr5PA0rghHp4emLDnyxnlyo+yL3EPrRr+Mecd75C4E0S1IzESCdXSm+cCPm3nfTtSnAeRi2/i37YTMhxAIoi3IhOEpwnQy3v1a4odGvTv+1ZcBZCNs5vtYdy1qhBAIoi1I3Og4PrvmamJGj4Y/H/dhAImY/MLwhdkQAkE0BRk7Mhg9dBTTBt8r6oE6nTmAREx/JaMhkREIoksQY5tAjuL6bkrcUC2SHPdbAIlY8J2MhoQhiB5BxoyM4PSp/ttynvZhCBneHLwfhIRDplrKEETrxhgJICdxlvti5C08bg8hjMvcL6z6WhZDdkchyPWCPDIQQFKMNyZ25LcQMsK2znY3bNUXM61u2Ycg1wtyYODpzn5rUoP4EgcRZjwT1LpvZllgv3kXglwnyAT70D0zcm+Yu1lpV5/gwFai71v51RvGO70QpFOQ+GD8IOR8QN/jCO4ytZM2rA1eDGXIHgS5TpDDgY1b1lB14uIjTrbNLz03DsM5XLvDEKS3IE9ZW7CHxn84VkMO3CsI007bHau/nSHJ2oIgvQVhPUnxyMwPx9jtTbnWD6YMa9P6DoH+JOszBOkpyARj//XYVPOVcdGwe8t0pgxr284AdnEXgvQSJD7YrCfqkzKdJcP63I8L2DWmJwRRC8LYWjI9N8HWEjgad6kgG/ZV6Kxd5j0I0kOQCbaq4MT0D8d4uKlLZ9OH+r7F1roQsgFBevwo8YG3ldiSrFN3CrJudwBhCCGhYQjSXRC2HtahFb9cwgd9LIb94ZF+XcOukUYvBFEJwtTDsmb5IFPQSrtzrnDT1hYWo6R7EKSrII/SA63QDUwXunKucNjOORDmTvMGBOkqyMHgAwhjCHHlkl6GrSD7/bsKvZ203REI0k2Qc1vGKksISXh8FiTcv6vYN3ANEEQpCFMJErfql4t6vQjRf5r0Rh+vQveOlHUI0kWQCZYS5Mi6n+7E40XIphMyLP05VhCCdLklTNWAhVMSLJmdC1ebjDigh8WS6UUgSBdBWA7kTVv4y8UGPfcyWPTvtr3o63Vss3fSIIhCEJZdsJZO2R15ukrXP4/+ub8XoneuEIJ0EeTIngyLLceacJ0g+84oQfQXIUMQRFsQlmLZ0l8ubkfzbGAEnVGC6L+QdQiiKciEffMRDGt63fcmBP0nYjkk14Mg2oKwPMctntFmmCs8926Xd7PPF6K3St+DIJqCsEzYWfwcP7dNTScJstHvK2GeCIEg8jvC0uW1eOdS1Kb22UDQvdA86BBVIYj2HWHo8qat/um83Oc1emqbbYJEIIhZQSwfpWkIolgEZWu7YBOCaApyZGOek7AvePlIkCAEMSNIwsZKmUFOCAJB/CdIEoJAEA8JEoUgEASCQBAIAkEgCASBIBAEgkAQCAJBIAgEgSCG2YAgAxLkFIL0QZBgv69E51KTzxAE8yAD5MIxguyyXgcEcYogCQ8L4pj9IMM8BBmQIEf2CZL2riAXfb4QvUeg7kMQp63mHffyal79BysO9fdCdpibBRDEoCBWny0Sa3pYkKBT2lh6L2QLgmgKwvL2nLi1P52ndxTu6Bakzzum9OZ6BIKY3pNucZ83aWN/oO/oPzgu0tfr0FujhyCItiAsbwexeJgybAdx36km+o8eVbwf0LYaHUePduvrMQhyMm7lT8fyZiv3nYtFQroN2XJCCfIZgnQRhOWVzJYea3JgX/XjqD5vX4uQuxfsFwFBFIIk7CpCWM7mdZ8fDH3ei7uWfvHIfdn/2DbQS9P9q4z5QhC7TnefYDgU2I3vYNN/erW1p/OOhPfutF84qPtFcMSAINE+Pxld+H6Qp9b9kCxnnrrw/SAsL/EMWurHBb8ZlgwZ1pthXQxQkKS7BGF6w5SFr3pK2vO1TqzSd3+01A+evwgPM1oaMSKIwa5mwthz0baXeLK8ozBh2WT6LyzNAVe+KH1DfwjZsWzWIyyEjNDWj4QQMqL7jHn5S0p0Dwhji/P0dy+TzhDEnrfc2vXmt8HB8B7oTYumQoa3pLXtoZ1RpsmYbSNPeGNvHz5oukwQpvekpywKIWMszbMjVwrCUIRYNBUyvCVL6/YfkhHdC8J2DaVAxiL7udsEYZmPsCyEsKxwceE8OmMRwkeGrfaD5z8/CIeMlCAMKYWR5glD9/LUGYIwFSEWhRCmAOLOEoTlJVOWhBCVHzwf0T8Vs2+sfXJsYCaEoSkUdYggqcGHEKYAcuxOP1hmQvjNIbPfNrTFELHUhA32Fw00epNGh5p9gpwxCXI0Zn7oPGUKICmXChJmGaJmd4WMrpvwY9Po0+uIOZ94ytC9JA4RJMYkSDM6bnbkjLMpeepSQVgavfzuLXN+7PMm2DPYZjKQTzD89CdOEYSt0ds8Nr1kMcZU9aTd6gdTjsUHh23zQ73WhSW6M+YTkwwB5MgxgrA90JuHJpOsp2xCplwrCFOOxW+N2OWH+mAVlgSYrQqZYFk/kXSMIIw5lskk6xGjj67NsNhyLP4ibJMfyh4WIeSQZY/Qr0wtrLRx92wUhDHHaqZjJgwZP0g3/ZFhsWxM53mej4wa+5aHJv3gw8brhGbznGE6/Vem5kzMOYKcMoaQExNlSOyEMaFzsSCErbO0b6gMefDZpB8dm+LZpo4PdD8tHzEt2lDV6LYKwrStsNlsNlPTRofMNKMfbp0lFAiyDdUtA4Y8iJj0Q6PDnO7L03L8wNST0VZBks0BGTKdYvyihJv90L+hT1xiyF6om/dD42hHth/pSN9YGGdrXnbUnrYKEm8OxhBmP9y5FaQN4/C9CI8M2o+OEp29ralrLIyz5tYxJwlCUoMwZPwn5q85drcfDMdjGTFkxAI/Qlp1ovVjgdmPjtTBXkEOmuyGTDH2siZiR8xfknS5IAyHm0iG6D/CYSRs3g/t/b4nVo+FR6x+dC7htlcQpskhyfEY04aZsfgJ81ekY8RnIYS/2B7W7ceFeT9CmrMv5+xjoefs8a+MvX2tRSw2CxJlF6R5fDCpP716Fk03/RdA2EMIH9oaHZwfXQ6MYK9J09FnXYPIxBSzcB1NXtsFMRJCms3kE51BZCx2aODj3R9ADIQQPrT/UM8HW+JHqMv0PXsy3DyMaZ95Mz4dNzC2zhwniJEQ0myeHEzrWPE88VP02JB/hPgwhPD85/8MD0iQYJcPPzPyODt7PNkxGB5Nx1LWPBrtFoSkDBnSTMUnr1FkYjp+ZOijj2NeEGTdwLi92NKx+t2CEj3Udf1X2tAPloz/9Ksspxh79uTA2LDSWKFquyBxY4I008n4dI8KbWw6blA9t8+BSGwYGbnB/wxZPsuiaw7E6NSxNGt4fvDz1NTk5OSzqSc/Rw9PDH7MgQMFMXxPms1U9PEzzWLk0bPHUaN6aNRpvphOl4LI+u3rG7575vzo8X7EeNM4iUQymTxMnJj4BOJEQWLHxv9Fx4cH//7p1zFZI2N8bPKnfx8cmvjMqEcEYV2RJbGx/eBaRcwt5O21zzfVtJFTRwrCvKhXlWodnUdjPz+Zmpqampp68nMsmjxKm/m8Q6/4QcK7BgdwZPvOdaeS7pjYit7z3VZxG/3QXD/hAEHIkfl/20kikUgkzIRXD7V4zdTp4ma/ne8f9upojYwaP8wk1HuHlo0h5MypgsTTTcdwSjzEholG0+etew9GNXOt4fu3w/sbfajQbQ4h2sWnEwQxmWRZyZGX/CDhkJlSYTeyv33vzq3RoVYsGRq69fDOD1t7JsTr2InunBASda4gViRZ1mShMU8Jwrj5VkuSzeD++tYPIuvrwc+bJj/x2nXDMZvyiS5bgJwhiJlOVv8fIi7G7L5Y62m9RMTyuRCTxJ0siJF1730gSTzHhfMMuXaH77GTfnuHCMK+0nlwQdbd04Uhxxly7brhqCOS6y9u3rx58+ZNpwhi7wyRJwsQi8qQPhiyf7/3NR86Ibl+9fbt27dv3zpGkNiJzX6kD4gniTjPEH7vQe86feBJlsb08H+v2Oi3ILZ1Lzy2RtENZQjPR273bGYNuiTVmgL55DRByEEafvRlNsSJhmz0bvee2588/Ok4QWwpznrsBEChbmO798j2h+NH5wliaEMZ/LieLScaEtoa6lWGnNhagBDyxZUDBbHNEG/7wfbq28EZst6r3Tu4hFu7u//KkYLYZIjX/TC7gaNf9DwmYlAJd5dDfl87UxBbDPG+H0415PMD24dCt/0NnxwqiA2G+MEPpxoS+c+IvUOh6+zXO6cKQqJp+OEfQ3o2s87s84O8dawgA54POSN+wZG9rN5rF89s8+PbK+cKMsgWX/qUEBji3LWLZzb5QT44WRASG9TKxeMD4ie2LxxpSK+1i/005KTHr//a0YIMaqnBUYz4i/CmIwuRXmsX+1eS9nyJ2yeHC0IOBrCg85z4j8+ONKTX2sWDPiXcqZ5Px3dOF4TEjpBe9aWZ5chCpNfaxf6MhGuejm8dLwghp33tZh3GiD/ZcmQh0rPdmxz40/HGlQsE6WcQOY4S/+LINKvn2kWrE+5ri883rhCEkNM+VSLJGPEz67tONKTX2sWYlbtwdfT2X7tEEBLrxxkwiQPic8JBJwaR3msXjwcWPgghf7lFEELiVs+JHJ8S0OdKZMPYx/dcu0iS6cEl17+7RxBCogkr9TiDHAJ7fWtn7a4b3efbc+2iFc/KtM6jz966SRALFYEe8jyrP+edhPZMfPo1G3EPEib10Fl73vjbXYIQcpCCHtazvWG9HsHW2w2MGXLNuYvRo/7rYaiJZbMghMSTJqu0VBRGdP5kG/3Sgxh8xdW15y7GU8be9HnO0Ll87UJBCCGnxp8ex+dx2KAdRSJ90oMY3IJy7bmLJHbGvPokxdaZ+cu8IIGZ2edz84MVhJDYmRFHjg8PIEIPRYKWlOu7+52vjjK2ruWacxcJISTO8hbKozPWaa/fTQsSyGRz+ULxtwXrBJlX+9bVEaYQe5KEHdeW6/umm74R7TdzGtuCcs25i6Ij53oq9nTqzMCk8FvTgmRKlFJKufKiVYIsFAvFJb0lu84XdZ4cnsYw/PXNi3w2Mbt+sdf1vYPGDNkIj+i66mgy0WMgnKTODT4c35sVZD5PRSpWCVKmlFafM/S1zpKJHmE2kUqiKB+IIxd72z2jk6HgdP1rdtopRfQ8mVB6cpw4Sp6Z+PkNLFVUCVKU/KAFiwRZLFFKaZ55hiSaTKYSCUmVRCKRSCbPoqjIDTqyx7ajKrSxH742f7sw1swyMF0WjUajViTUb14bQP4Bc7WWIEWLfpqKkLJhjNrf+Q1u6kqLdjf29A3irlOGmx1Egi32XHwLA4WWH1aN6ECVUkppDePTGY2tneBGjwf/ZiS4HmZxbn19fctHty/DtQSpWvuRZYxNJ2myvhMMfpY94DeCwb31ddwYXQGklqGU0kuLPrNMKaW0jpsLvBJAihkLMyyhRLesoAHA7gBSFfqylpboCCDAMwGksVhXzYKYL9FRgQAPUBYCSIVSWrLUuXYLa3kGtxm4lOUapZQ2VqoWPvLL0pxjYH5hbvbFy8vsAm40cCeXQgBpUEq5jJUlOpd58TJTLBdyJWRbwLWs5IQKpKpaZmK+RK/VS9Ty+RUABkujXYHQhiXGzbyo0g4gCHAnWUoprczXrRnEKzMvGtlShx5cvYE7DVyZYZUopXVhNW+jH3aUqoViBvcZuDnDulwomQ8gK7+p7ajlsphKB+7PsGqBsgUBpMEp7cgiqwLup04pLWQ4CyqQojK1QuwAHmCZUkobeUop17BGkBI2ggDvcEkpzVWoFXMgDUppLtsQ2mKYGASeIE8pLdetmUS/LGeI2BbDVlvgCQIlSmnW0id+gxo6rEEnC3PL+NXAwMhQSkucpTs3hAyrTx2spXLhEoaAgZYgHLVuH4iUYfVpp9RS1cJNwcA7zC/2sQShFq5SlDIsMWFbnLf0aueqlFKaE+/JzCIGhg+Lgvn5lY4/fFGsrDKMhsWA7se9eBxWzWiFvjgzpxqnWdqu+J9XimsWKrJQaMkcmPutmK2sBjBgfKbH80yx2FAf17lYorReWREeyTJ9FufmZjqHyOJvlczqCplf+u3lizmtEbQy3wpIDfWk3sLsy7U53cNuYa2SLWQrS+qqX5pzzFNaKy53XPfKzNzcigEZhV1YpQwhM5kCRymty7x+8fLly1UhtMwjtHiUuUyeo5TmVUc+V8Syd+X5b5ViQ4ol82uVQiGb6RjNFY7SemO2WOVoqZDpGIgrS41isSI82ANihpUX/255rZyjtYLOcBJYLQsBqDqnrPpbZYL4fwdm1irFxqoYS1ZmG9lCocE8iAMVjgrzmYGlLKdeQ78orLkkC7Mvi8XK6goGkwcLjbWC9Lsr96cKU9SFpUaeo5TWK8uEkMBssSY9TzXKimpOXGau7ibNN6qUUlorLpDW4W7iRvTA0qUw4Ou6Bm8gU9c4zrcsmwRZFP4xS5lsjVJaL84RQshcI0cppVyFMT0KiBdbJIFMtfMYSOEhMrdWzlFKab2BIOK98FFsn49bVmTu4gbv1rC4JGQxIxpA6zPKt3AESr32KS0UpRWF5QBZKcjPc5eNO10trUz7i2TLSnKyMloYtNUq1/YosCodcspl5q7fpv785eyi8usKii+mrf/yUvhb6RYy+wecXn2sFuT7i4qzgc5Wk0SdLFTaK2ezhaK8WM2odiop/Si3/yIjLb/Nin60x11WxwXP1KnGOJ2X97DKHde92I46NF8or13znJ/P01xlUdbAojlCngsfUc/JzQyo7xGHLSje8iNTV/7AOdkPrPirOuUuF8rKleXyYvVSNVI0ylwxhMyVqOxxL/pR65xVDyxoTM0FsmKE4hRfUpTPEioGbZ2j2cVKTbkiXhGqVl6sqWJKkVLKVWQNrFpGepFJtsLJ5+sznHoPYxaDylN+SI/vmjSE2oXAomxElTOEkPnWOK/nOkZDvrsgYplLuQKllJYK8g7WczGDueyYBl/IlDWm5lpnU5fkXyKc0ch1iM0VMrLvp7Qkpl05+Uc2SrXyYmc5lWubzVVIQFCw3KjJw0RAEX6Ff8nqy7XZhXbjbPXlb6s4esjtftSL7V1HFWX9SSml+QwhhCyK68q5ckaqXNtV8mLrGZ3LqgXJ1KRh1mGQ8FzmKhX1spPF1TKnDEMCBVHMZfmXLGTk0+iLqnAYEL+fVhtkqd6xJn6ppK5+hFmaetussvRvyBa5VnBRBZCqtOq+Tmu5spB8zs82snXK1cvPMdZciZTeXJLOQmBxSYoXXFkRB3IZsij95wWitokri+mOIqOXanzZqSMlWWpUKXLKxlhgqVKnlNKO2b4F6eTEy5YRi89/Kyt0raj+JeLFlioksFql6rN7l6odyZ00KS89BvKtUFGlCj9WWiG1VpzJqZPP+dWi9Gd5jDU3Ita71QxZkv26l4SQlZm1SqsJVFG3c5YrnLrPupiXujjS+FpU1Qc0SwjJZPOKNteC8Lq0grJxHJiTGlsduwPLYidsvk4ppfn5mdnfKvlWg0z4b7LK/7lcleb52qV6vW1itXONY1mUUDJLGSpafszPNlrNq8ZCVlXLzawW69oVGXAJK1kpPoijhBN9WJ5tZGWtX/G/zkvj+vklp5qICMxVarLBo8zUhLEspv3tSJVV9ZtafgTmMtK8TMeJvYGcGMQE6YrFbI7r2GxbVT61L6WPX6iUqEqQedFE5ZKwqnB90l3JKC5UKvAX2vGBVjML5Y5ivd61pwfcQUPKp8WRQIU0YmbtMqcxodEQR9b8mqwcz88TQlbmMgVFUlNX1O9F2aqruapiNK+UOvxYWWrpoWiSKXvJHEc1kFcQLbmEE4C5zMqsrAVXmiGEBBZeiFNAqjXAJUopzSxUZQE0pyxrVubWyi0B6kUyI/ejJlejXs6QShnHSLixQq8KP7+UZdBygVJK69maZl9fSL8zq8WaYt7kxepaozWia7ImUGlZ/jXC031B1vRpkPaSrJYLy7ONlkI1jR5WmWrDyR7TDWWvQQggl0sNRY2QXVt9kSmXVMFLDCuUUlqXYkJZ3hjLXRJCAguzjdbMIK2VSWCpnV9x+Urgudwd4NoKXchDlqV8v0zqGkOvlXwIYaGdV5fF1L5e65gDEIbo5aKs0ZMjpDVdWKpJj3vpPBIuKz6W27GL01yZVdDUo1rMy+JAWTmTL1jf9q5aVp/fq57bK1JKaaGsCKB1Sim9nJ+fX55bzZRzsv43IUS2BKWQIfMZKcRy2EHiZi4ppTT/UlwHRcvibHRrIKkGT701nScWG43ONEcZbSoLAbK82i6C50Q/Gq0MqEgppbVCkRCyOPNC9ljmuixcrFNKaVk+Xcnlyhnxz6vykqehEERRUamOYCw1tMJUSVkFVSmltFQsFi8LdXn+1E7JKKU01yCB560Qm8OkuqtRPI25sjQVJg7QRlnVn+zoYnbmOzlFdUO5cublZatCD8wWxHym3aEVBMmsrq6+rMgOR+S6ruutU0ppRmyi1fOFckX25wVZydOuKrIdU+gVrtvSgY4b03o+XGoErlb+JAsY7fBh4V4wYAvykcNVZMsQhQFaUy0flOuT1a4ILpXRSZ7yBxbEjy9lxGW/7Zq7Vq/XFScjdn/y5iilVHxEV9XiXMp6WO15DfliEGHCU26IVqEjE6SiLNzld6zaUP1dLqNc+Inyw+1NLEVAmGn3QIVh1DHjXJclEiKVnPgob9RVvSCVO9mMmBaVMorHfefrCkplnVIrKmvZiKwrkj35eK+1hmxGmOMpVYtdc0/1GVvKsKOUuMEJ3XLlwk+MMLdTbgeEwGxWPfxr6qe0NJGuHFQV4QT1TLVeVTz4pbkSrtaxCJ5rC6Je61ct6pVaueFEJkVOPYEiTfcpzWsUu7deS1rz3+0HCNdxlZl8vkEUS4ZVy72AKynmKKW1QkaeXrWGUaWuThMahXpe/8HQmUKNUlptlNV+BBTLQjh9uZWElOGXlFtHZI/sTE69pDaTzVULLKenNDjN9SGX1Xq9Xi90c3heWjLMqfJN4HZm2qvB5TlVpWByfqtSVKRm4pqujCJDF7MdWsrrG8IFjlLK5VUqKXKahul3H2Ry2tVJL6QtYZzQFsQRwZ5Bll71JTEQo1OrNVVUl7CVYrHIpF2nSpxy9ZcNSPOK9UwZRwR7Cll61a/tPo1sQZaYFPuQgdQtPYPOhB95sawqYWB5hAXlZrsB9CaLfZglyFFKqY27LkQ/uLK0th89Xo+kV61NH7n8oHqTmT4Ikm0vnbQlCrc2Hq4U8WpdL/nRWkWUF7KUgWQGQq4esDSJs3VubrHS2pgrriHAIhOPlB+lVnM3UBvYzjdxKs/SmrpgY2UsnSxXac25oMXrDT9ajfuK6mTC/iIut63MWfmhlyWt/SMDQbCCqxDyvIoNtl7yg5NNul2qV2j0cUBxnlrNt9DaqL6Qp+hgedCPDCHSJqfBfHWR0j6+y2PArLTmPaRWFrYPesoPIS8RNr8OKjeo1L2TqQtleb59Ol4Fg8tLfogNycaAf9tGseiNB+1yTgyGi+0ztIDn/BBfP4Mbw94cELMq6Y5im5QXCKj9WKljestYhS4cuNg61Ru30BNI8x+tn7OB9RHGEPavk5ky/PAQS2o/hAwLK7TZK5AapZReSuuhsUnKG2lBVe3Hcg3zW8YrkJq0HrqEFSaeKNDLHed6XnaeTwv0ILxWjut2ECRwZYHe8bgTjpKq494wU+/+0jng7gJdPt9bRAPfvCDo73oD6WUdso6VEEBQohug0D6kGDfDGxQ7t9YW8QQ0GY5pHuWHR1godfQjF+rY42Occq5eL6C94Z3fs+M880AZexgAEKNFrWNflLg7Aw9BAMQAkuss2hFAAJBeRyaLFuI7D1CBACDNmMv7VeIrxNHCAkA8X00eLeZysjdsAuDzDEu9JGK5QHFMDQCKDKu9r3bxEqu0AWhRUJ4uKu0SRYUOACHi0rq62g9sJASgU5BlyY8sbgwAhIivmakJR6DPXXLYxgBARwShxRVC5tcK2OYDgBJx0qOxutZ6nTf8AEBC3IzO1WsaLwIHwPfUlG8lxzY4AOTI30pOaQ7zHwAoDWnHkDrCBwCddUiJUkpLeRzSD4A2RcgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMB9/D+vOyldBqHVHwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wNS0yM1QxMjo1MzoxMy0wNzowMMaTNlsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDUtMjNUMTI6NTM6MTMtMDc6MDC3zo7nAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==',
            administracionZonal: incidenteNowForce.administracioZonal,
            fechaEvento: AppUtil.formatearFechaHora(fechaEventoAux),
            fechaInspeccion: AppUtil.formatearFechaHora(incidenteNowForce.fechaInspeccion),
            parroquia: incidenteNowForce.parroquia,
            barrio: incidenteNowForce.barrio,
            direccion: incidenteNowForce.direccion,
            referencia: referencia.toString(),
            solicitadoPor: 'COEM',
            tipoEvento: incidenteNowForce.tipo,
            latitud: incidenteNowForce.latitud.toFixed(7),
            longitud: incidenteNowForce.longitud.toFixed(7),
            zona: incidenteNowForce.zona,
            coordenadaX: incidenteNowForce.coordenadaX,
            coordenadaY: incidenteNowForce.coordenadaY,
            integrantesFamilia,
            numeroFamiliasAfectadas: arregloFamilia.length,
            numeroFamiliasAlbergados: famiAlbergadas,
            numeroFamiliasDamnificados: famiDamnificadas,
            numeroFamiliasRenuentes: 0,
            numeroPersonasAfectadosMujeres: numafectadosM,
            numeroPersonasAfectadosHombres: numafectadosH,
            numeroPersonasAlbergadosMujeres: numalbergadosM,
            numeroPersonasAlbergadosHombres: numalbergadosH,
            numeroPersonasDamnificadosMujeres: numDamnificadosM,
            numeroPersonasDamnificadosHombres: numDamnificadosH,
            numeroPersonasHeridosEstables: 0,
            numeroPersonasHeridosCriticos: numHeridos,
            numeroPersonasFallecidos: numFallecidos,
            numeroPersonasRenuentes: 0,
            metalica: metalicaTC,
            hormigonArmado: hormigonTC,
            adobe: adobeTC,
            madera: maderaTC,
            mixta: mixtaTC,
            otros: otrosTC,
            mapa,
        };
    }
    mapearIncidenteAReporteNowForceGe(incidenteNowForce, numeroInforme, nombreEmergencia, solicitadoPor, referencia) {
        if (!numeroInforme) {
            numeroInforme = '';
        }
        if (!solicitadoPor) {
            solicitadoPor = '';
        }
        if (!referencia) {
            referencia = '';
        }
        const dataTable = [];
        const arregloFamilia = [];
        const arregloFamiliaData = [];
        const arregloFamiliaDataC = [];
        let numafectadosH = 0;
        let numafectadosM = 0;
        let numalbergadosH = 0;
        let numalbergadosM = 0;
        let numDamnificadosH = 0;
        let numDamnificadosM = 0;
        let numHeridos = 0;
        let numFallecidos = 0;
        const dataDD = [];
        incidenteNowForce.cidadanos.sort((a, b) => {
            if (a.familia < b.familia) {
                return -1;
            }
            if (a.familia > b.familia) {
                return 1;
            }
            return 0;
        });
        const insumosEntregadosFamilia = [];
        for (let a = 0; a < incidenteNowForce.arregloAsitenciaFamilia.length; a++) {
            const insumosEntregadosAux = {
                nombreBeneficiario: '',
                numeroFamilias: '',
                numeroIntegrantes: '',
                asistenciaBasicaInicial: '',
                fechaAsistenciaBasicaInicial: '',
                bienesMuebles: '',
                fechaAsBienesMuebles: '',
                gastosMortuorios: '',
                fechaGastosMortuorios: '',
                suministrosYMateriales: '',
                fechaSuministrosYMateriales: '',
                kitsdeNoPerecible: '',
                cuadrillasEmergencias: '',
                kitsdePerecible: '',
                kitsLimpieza: '',
                frazadas: '',
                kitsEscolar: '',
                toallas: '',
                vestimenta: '',
                kitsdeHiguiene: '',
                calzado: '',
                bolsos: '',
                almohadas: '',
                otros: '',
                observaciones: '',
            };
            if (incidenteNowForce.arregloAsitenciaFamilia[a].nombrebeneficiario) {
                insumosEntregadosFamilia.push(insumosEntregadosAux);
            }
            insumosEntregadosAux.nombreBeneficiario = incidenteNowForce.arregloAsitenciaFamilia[a].nombrebeneficiario;
            insumosEntregadosAux.numeroIntegrantes = incidenteNowForce.arregloAsitenciaFamilia[a].numerointegrantes;
            insumosEntregadosAux.numeroFamilias = incidenteNowForce.arregloAsitenciaFamilia[a].numerofamilias;
            insumosEntregadosAux.asistenciaBasicaInicial = incidenteNowForce.arregloAsitenciaFamilia[a].asistenciabasicainical;
            insumosEntregadosAux.fechaAsistenciaBasicaInicial = incidenteNowForce.arregloAsitenciaFamilia[a].fechaasistenciabasicainicial;
            insumosEntregadosAux.bienesMuebles = incidenteNowForce.arregloAsitenciaFamilia[a].bienesMuebles;
            insumosEntregadosAux.fechaAsBienesMuebles = incidenteNowForce.arregloAsitenciaFamilia[a].fechaasbienesMuebles;
            insumosEntregadosAux.gastosMortuorios = incidenteNowForce.arregloAsitenciaFamilia[a].gastosmortuorios;
            insumosEntregadosAux.fechaGastosMortuorios = incidenteNowForce.arregloAsitenciaFamilia[a].fechagastosmortuorios;
            insumosEntregadosAux.suministrosYMateriales = incidenteNowForce.arregloAsitenciaFamilia[a].suministrosymateriales;
            insumosEntregadosAux.fechaSuministrosYMateriales = incidenteNowForce.arregloAsitenciaFamilia[a].fechasuministrosymateriales;
            insumosEntregadosAux.cuadrillasEmergencias = incidenteNowForce.arregloAsitenciaFamilia[a].cuadrillasemergencias;
            insumosEntregadosAux.kitsdeNoPerecible = incidenteNowForce.arregloAsitenciaFamilia[a].kitsdenoperecible;
            insumosEntregadosAux.kitsdePerecible = incidenteNowForce.arregloAsitenciaFamilia[a].kitsperecible;
            insumosEntregadosAux.kitsLimpieza = incidenteNowForce.arregloAsitenciaFamilia[a].kitslimpieza;
            insumosEntregadosAux.kitsEscolar = incidenteNowForce.arregloAsitenciaFamilia[a].kitsescolar;
            insumosEntregadosAux.frazadas = incidenteNowForce.arregloAsitenciaFamilia[a].frazadas;
            insumosEntregadosAux.toallas = incidenteNowForce.arregloAsitenciaFamilia[a].toallas;
            insumosEntregadosAux.vestimenta = incidenteNowForce.arregloAsitenciaFamilia[a].vestimenta;
            insumosEntregadosAux.calzado = incidenteNowForce.arregloAsitenciaFamilia[a].calzado;
            insumosEntregadosAux.kitsdeHiguiene = incidenteNowForce.arregloAsitenciaFamilia[a].kitsdehigiene;
            insumosEntregadosAux.bolsos = incidenteNowForce.arregloAsitenciaFamilia[a].bolsos;
            insumosEntregadosAux.almohadas = incidenteNowForce.arregloAsitenciaFamilia[a].almohadas;
            insumosEntregadosAux.otros = incidenteNowForce.arregloAsitenciaFamilia[a].articulosadquiridos;
            insumosEntregadosAux.observaciones = incidenteNowForce.arregloAsitenciaFamilia[a].observaciones;
        }
        const integrantesFamilia = [];
        for (let ppp = 0; ppp < incidenteNowForce.cidadanos.length; ppp++) {
            const integranteFamilia = {
                nombres: '',
                sexo: '',
                edad: '',
                cedula: '',
                parentesco: '',
                familia: '',
                numeroTelefonoContacto: '',
                vestimenta: '',
                calzado: '',
            };
            integrantesFamilia.push(integranteFamilia);
            integranteFamilia.nombres = incidenteNowForce.cidadanos[ppp].nombre;
            integranteFamilia.sexo = incidenteNowForce.cidadanos[ppp].sexo;
            integranteFamilia.edad = incidenteNowForce.cidadanos[ppp].edad;
            integranteFamilia.cedula = incidenteNowForce.cidadanos[ppp].cedula;
            integranteFamilia.parentesco = incidenteNowForce.cidadanos[ppp].parentesco;
            integranteFamilia.numeroTelefonoContacto = incidenteNowForce.cidadanos[ppp].parentesco;
            integranteFamilia.familia = incidenteNowForce.cidadanos[ppp].familia;
            const asistenciaCiud = [];
            asistenciaCiud.push(incidenteNowForce.cidadanos[ppp].familia);
            if (incidenteNowForce.cidadanos[ppp].vestimenta === true) {
                asistenciaCiud.push('Si');
                integranteFamilia.vestimenta = 'Si';
            }
            else {
                asistenciaCiud.push('No');
                integranteFamilia.vestimenta = 'No';
            }
            if (incidenteNowForce.cidadanos[ppp].calzado === true) {
                asistenciaCiud.push('Si');
                integranteFamilia.calzado = 'Si';
            }
            else {
                asistenciaCiud.push('No');
                integranteFamilia.calzado = 'No';
            }
            if (incidenteNowForce.cidadanos[ppp].frazada === true)
                asistenciaCiud.push('Si');
            else
                asistenciaCiud.push('No');
            if (incidenteNowForce.cidadanos[ppp].alimentosPerecibles === true)
                asistenciaCiud.push('Si');
            else
                asistenciaCiud.push('No');
            if (incidenteNowForce.cidadanos[ppp].alimentosNoPerecibles === true)
                asistenciaCiud.push('Si');
            else
                asistenciaCiud.push('No');
            if (incidenteNowForce.cidadanos[ppp].kitHigiene === true)
                asistenciaCiud.push('Si');
            else
                asistenciaCiud.push('No');
            if (incidenteNowForce.cidadanos[ppp].bienesMuebles === true)
                asistenciaCiud.push('Si');
            else
                asistenciaCiud.push('No');

            if (incidenteNowForce.cidadanos[ppp].kitEscolar === true)
                asistenciaCiud.push ('Si');
            else
                asistenciaCiud.push ( 'No');

            if (incidenteNowForce.cidadanos[ppp].toallas === true)
                asistenciaCiud.push ('Si');
            else
                asistenciaCiud.push  ('No');

            if (incidenteNowForce.cidadanos[ppp].medicinas === true)
                asistenciaCiud.push  ('Si');
            else
                asistenciaCiud.push ( 'No');

            if (incidenteNowForce.cidadanos[ppp].gastosMortuorios === true)
                asistenciaCiud.push ('Si');
            else
                asistenciaCiud.push('No');

            if (incidenteNowForce.cidadanos[ppp].otros)
                asistenciaCiud.push( incidenteNowForce.cidadanos[ppp].otros);


            const dataCiudadanos = [];
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].nombre);
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].sexo);
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].edad);
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].parentesco);
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].vestimentaTalla);
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].calzadoTalla);
            dataCiudadanos.push(incidenteNowForce.cidadanos[ppp].cedula);
            dataTable.push(dataCiudadanos);
            if (arregloFamilia.indexOf(incidenteNowForce.cidadanos[ppp].familia) === -1) {
                arregloFamilia.push(incidenteNowForce.cidadanos[ppp].familia);
                const arregloTenEe = [];
                arregloTenEe.push(dataCiudadanos);
                arregloFamiliaData.push(arregloTenEe);
                const arregloTenEeC = [];
                arregloTenEeC.push(incidenteNowForce.cidadanos[ppp]);
                arregloFamiliaDataC.push(arregloTenEeC);
                dataDD.push(asistenciaCiud);
            }
            else {
                arregloFamiliaData[arregloFamilia.indexOf(incidenteNowForce.cidadanos[ppp].familia)].push(dataCiudadanos);
                arregloFamiliaDataC[arregloFamilia.indexOf(incidenteNowForce.cidadanos[ppp].familia)].push(incidenteNowForce.cidadanos[ppp]);
            }
            if (incidenteNowForce.cidadanos[ppp].sexo === 'Masculino' && incidenteNowForce.cidadanos[ppp].afectada === true)
                numafectadosH++;
            if (incidenteNowForce.cidadanos[ppp].sexo === 'Femenino' && incidenteNowForce.cidadanos[ppp].afectada === true)
                numafectadosM++;
            if (incidenteNowForce.cidadanos[ppp].sexo === 'Masculino' && incidenteNowForce.cidadanos[ppp].albergada === true)
                numalbergadosH++;
            if (incidenteNowForce.cidadanos[ppp].sexo === 'Femenino' && incidenteNowForce.cidadanos[ppp].albergada === true)
                numalbergadosM++;
            if (incidenteNowForce.cidadanos[ppp].sexo === 'Masculino' && incidenteNowForce.cidadanos[ppp].damnificada === true)
                numDamnificadosH++;
            if (incidenteNowForce.cidadanos[ppp].sexo === 'Femenino' && incidenteNowForce.cidadanos[ppp].damnificada === true)
                numDamnificadosM++;
            if (incidenteNowForce.cidadanos[ppp].herido === true)
                numHeridos++;
            if (incidenteNowForce.cidadanos[ppp].fallecido === true)
                numFallecidos++;
        }
        let famiAfectadas = 0;
        let famiAlbergadas = 0;
        let famiDamnificadas = 0;
        for (let tt = 0; tt < arregloFamilia.length; tt++) {
            for (let ttt = 0; ttt < arregloFamiliaDataC[tt].length; ttt++) {
                if (arregloFamiliaDataC[tt][ttt].afectada === true) {
                    famiAfectadas++;
                    break;
                }
            }
            for (let ttt = 0; ttt < arregloFamiliaDataC[tt].length; ttt++) {
                if (arregloFamiliaDataC[tt][ttt].albergada === true) {
                    famiAlbergadas++;
                    break;
                }
            }
            for (let ttt = 0; ttt < arregloFamiliaDataC[tt].length; ttt++) {
                if (arregloFamiliaDataC[tt][ttt].damnificada === true) {
                    famiDamnificadas++;
                    break;
                }
            }
        }
        let metalicaTC = '';
        let hormigonTC = '';
        let adobeTC = '';
        let maderaTC = '';
        let mixtaTC = '';
        let otrosTC = '';
        if (incidenteNowForce.daniosMateriales.length > 0) {
            if (incidenteNowForce.daniosMateriales[0].metalicaTC === true)
                metalicaTC = 'X';
            if (incidenteNowForce.daniosMateriales[0].hormigoArmadoTC === true)
                hormigonTC = 'X';
            if (incidenteNowForce.daniosMateriales[0].adobeTC === true)
                adobeTC = 'X';
            if (incidenteNowForce.daniosMateriales[0].maderaTC === true)
                maderaTC = 'X';
            if (incidenteNowForce.daniosMateriales[0].mixtaTC === true)
                mixtaTC = 'X';
            if (incidenteNowForce.daniosMateriales[0].otrosTC === true)
                otrosTC = 'X';
        }
        const mapa = this.getUrlImgenMapa({ base: 500, altura: 500 }, { latitud: -0.298817, longitud: -78.5667955999 });
        const informeEmergencia = nombreEmergencia;
        const fechaTempIO = new Date(incidenteNowForce.Fecha.setHours(incidenteNowForce.Fecha.getHours() + 5));
        const horauString = ('0' + fechaTempIO.getHours()).slice(-2) + ':' + ('0' + fechaTempIO.getMinutes()).slice(-2) + ':' + ('0' + fechaTempIO.getSeconds()).slice(-2);
        let auxNumeFamilias = 0;
        if (integrantesFamilia) {
            for (const aux of integrantesFamilia) {
                if (aux.nombres === '' || aux.nombres === null) {
                    auxNumeFamilias = 0;
                }
                else {
                    auxNumeFamilias = arregloFamilia.length;
                }
            }
        }
        let totalSubTotalFactura = 0.00;
        let totalIvaFactura = 0.00;
        let totalTotalFactura = 0.00;
        let totalRetRentaFactura = 0.00;
        let totalRetIvaFactura = 0.00;
        let totalPagarFactura = 0.00;
        const facturasDatos = [];
        if (incidenteNowForce.factura) {
            for (let a = 0; a < incidenteNowForce.factura.length; a++) {
                const facturas = {
                    fecha: '', numeroComprobante: '',
                    proveedor: '',
                    descripcion: '',
                    subtotal: 0.00,
                    iva: 0.00,
                    totalFactura: 0.00,
                    retencionIva: 0.00,
                    totalAPagar: 0.00,
                    retencionRenta: 0.00,
                };
                facturasDatos.push(facturas);
                facturas.fecha =  AppUtil.formatearFechaHora(incidenteNowForce.factura[a].fechaFactura);
                facturas.numeroComprobante = incidenteNowForce.factura[a].comprobante;
                facturas.proveedor = incidenteNowForce.factura[a].proveedor;
                facturas.descripcion = incidenteNowForce.factura[a].descripcion;
                let auxValorSubTotalFactura;
                let auxValorIvaFactura;
                let auxValorTotalFactura;
                let auxValorRetRentaFactura;
                let auxValorRetIvaFactura;
                let auxValorPagarFactura;
                if (incidenteNowForce.factura[a].subtotal) {
                    facturas.subtotal = (incidenteNowForce.factura[a].subtotal).toString().replace(',', '.');
                    auxValorSubTotalFactura = (incidenteNowForce.factura[a].subtotal).toString().replace(',', '.');
                }
                else {
                    facturas.subtotal = 0.00;
                    auxValorSubTotalFactura = 0.00;
                }
                if (incidenteNowForce.factura[a].iva) {
                    facturas.iva = (incidenteNowForce.factura[a].iva).toString().replace(',', '.');
                    auxValorIvaFactura = (incidenteNowForce.factura[a].iva).toString().replace(',', '.');
                }
                else {
                    facturas.iva = 0.00;
                    auxValorIvaFactura = 0.00;
                }
                if (incidenteNowForce.factura[a].totalFactura) {
                    facturas.totalFactura = (incidenteNowForce.factura[a].totalFactura).toString().replace(',', '.');
                    auxValorTotalFactura = (incidenteNowForce.factura[a].totalFactura).toString().replace(',', '.');
                }
                else {
                    facturas.totalFactura = 0.00;
                    auxValorTotalFactura = 0.00;
                }
                if (incidenteNowForce.factura[a].retRenta) {
                    facturas.retencionRenta = (incidenteNowForce.factura[a].retRenta).toString().replace(',', '.');
                    auxValorRetRentaFactura = (incidenteNowForce.factura[a].retRenta).toString().replace(',', '.');
                }
                else {
                    facturas.retencionRenta = 0.00;
                    auxValorRetRentaFactura = 0.00;
                }
                if (incidenteNowForce.factura[a].retIva) {
                    facturas.retencionIva = (incidenteNowForce.factura[a].retIva).toString().replace(',', '.');
                    auxValorRetIvaFactura = (incidenteNowForce.factura[a].retIva).toString().replace(',', '.');
                }
                else {
                    facturas.retencionIva = 0.00;
                    auxValorRetIvaFactura = 0.00;
                }
                if (incidenteNowForce.factura[a].totalPagar) {
                    facturas.totalAPagar = (incidenteNowForce.factura[a].totalPagar).toString().replace(',', '.');
                    auxValorPagarFactura = (incidenteNowForce.factura[a].totalPagar).toString().replace(',', '.');
                }
                else {
                    facturas.totalAPagar = 0.00;
                    auxValorPagarFactura = 0.00;
                }
                totalSubTotalFactura += parseFloat(auxValorSubTotalFactura);
                totalIvaFactura += parseFloat(auxValorIvaFactura);
                totalTotalFactura += parseFloat(auxValorTotalFactura);
                totalRetRentaFactura += parseFloat(auxValorRetRentaFactura);
                totalRetIvaFactura += parseFloat(auxValorRetIvaFactura);
                totalPagarFactura += parseFloat(auxValorPagarFactura);
            }
        }
        const personasEmergenciaDatos = [];
        let arregloFechasEvento = '';
        if (incidenteNowForce.personalIncidenteFE) {
            for (let a = 0; a < incidenteNowForce.personalIncidenteFE.length; a++) {
                const personas = {
                    nombres: '', duracionEvento: '',
                    fechasArribo: '',
                    horasFin: '',
                    horasInicio: ''
                };
                personasEmergenciaDatos.push(personas);
                personas.nombres = incidenteNowForce.personalIncidenteFE[a].nombre;
                let horaArribo1 = '';
                let auxFechaArribo1 = '';
                let auxFechaFin1 = '';
                let horaFin1 = '';
                let auxFechaArribo2 = '';
                let horaArribo2 = '';
                let auxFechaFin2 = '';
                let horaFin2 = '';
                let auxFechaArribo3 = '';
                let horaArribo3 = '';
                let auxFechaFin3 = '';
                let horaFin3 = '';
                if (incidenteNowForce.personalIncidenteFE[a].fechaArribo1 != null) {
                    auxFechaArribo1 = AppUtil.formatearFechaHora(new Date(incidenteNowForce.personalIncidenteFE[a].fechaArribo1)).toString().split(' ')[0];
                    horaArribo1 = AppUtil.formatearFechaHora(new Date(incidenteNowForce.personalIncidenteFE[a].fechaArribo1)).toString().split(' ')[1];
                }
                if (incidenteNowForce.personalIncidenteFE[a].fechaSalida1 != null) {
                    auxFechaFin1 = AppUtil.formatearFechaHora(new Date(incidenteNowForce.personalIncidenteFE[a].fechaSalida1)).toString().split(' ')[0];
                    horaFin1 = AppUtil.formatearFechaHora(new Date(incidenteNowForce.personalIncidenteFE[a].fechaSalida1)).toString().split(' ')[1];
                }
                if (incidenteNowForce.personalIncidenteFE[a].fechaArribo2 != null) {
                    auxFechaArribo2 = AppUtil.formatearFechaHora(new Date(incidenteNowForce.personalIncidenteFE[a].fechaArribo2)).toString().split(' ')[0];
                    horaArribo2 = AppUtil.formatearFechaHora(new Date(incidenteNowForce.personalIncidenteFE[a].fechaArribo2)).toString().split(' ')[1];
                }
                if (incidenteNowForce.personalIncidenteFE[a].fechaSalida2 != null) {
                    auxFechaFin2 = AppUtil.formatearFechaHora(new Date(incidenteNowForce.personalIncidenteFE[a].fechaSalida2)).toString().split(' ')[0];
                    horaFin2 = AppUtil.formatearFechaHora(new Date(incidenteNowForce.personalIncidenteFE[a].fechaSalida2)).toString().split(' ')[1];
                }
                if (incidenteNowForce.personalIncidenteFE[a].fechaArribo3 != null) {
                    auxFechaArribo3 = AppUtil.formatearFechaHora(new Date(incidenteNowForce.personalIncidenteFE[a].fechaArribo3)).toString().split(' ')[0];
                    horaArribo3 = AppUtil.formatearFechaHora(new Date(incidenteNowForce.personalIncidenteFE[a].fechaArribo3)).toString().split(' ')[1];
                }
                if (incidenteNowForce.personalIncidenteFE[a].fechaSalida3 != null) {
                    auxFechaFin3 = AppUtil.formatearFechaHora(new Date(incidenteNowForce.personalIncidenteFE[a].fechaSalida3)).toString().split(' ')[0];
                    horaFin3 = AppUtil.formatearFechaHora(new Date(incidenteNowForce.personalIncidenteFE[a].fechaSalida3)).toString().split(' ')[1];
                }
                arregloFechasEvento = auxFechaArribo1 + ' ' + auxFechaArribo2 + ' ' + auxFechaArribo3;
                let duracionMinutos;
                let duracionHoras;
                let duracionMinutos2;
                let duracionHoras2;
                let duracionMinutos3;
                let duracionHoras3;
                if (incidenteNowForce.personalIncidenteFE[a].fechaSalida1 != null && incidenteNowForce.personalIncidenteFE[a].fechaArribo1 != null) {
                    const restaDia1 = (new Date(incidenteNowForce.personalIncidenteFE[a].fechaSalida1).getTime() - new Date(incidenteNowForce.personalIncidenteFE[a].fechaArribo1).getTime());
                    duracionMinutos = (restaDia1 / (1000 * 60));
                    duracionHoras = Math.round(restaDia1 / (1000 * 60 * 60));
                    if (duracionMinutos > 60) {
                        duracionMinutos = ((restaDia1 / (1000 * 60)) % 60);
                    }
                }
                if (incidenteNowForce.personalIncidenteFE[a].fechaSalida2 != null && incidenteNowForce.personalIncidenteFE[a].fechaArribo2 != null) {
                    const restaDia2 = (new Date(incidenteNowForce.personalIncidenteFE[a].fechaSalida2).getTime() - new Date(incidenteNowForce.personalIncidenteFE[a].fechaArribo2).getTime());
                    duracionMinutos2 = (restaDia2 / (1000 * 60));
                    duracionHoras2 = Math.round(restaDia2 / (1000 * 60 * 60));
                    if (duracionMinutos2 > 60) {
                        duracionMinutos2 = ((restaDia2 / (1000 * 60)) % 60);
                    }
                }
                if (incidenteNowForce.personalIncidenteFE[a].fechaSalida3 != null && incidenteNowForce.personalIncidenteFE[a].fechaArribo3 != null) {
                    const restaDia3 = (new Date(incidenteNowForce.personalIncidenteFE[a].fechaSalida3).getTime() - new Date(incidenteNowForce.personalIncidenteFE[a].fechaArribo3).getTime());
                    duracionMinutos3 = (restaDia3 / (1000 * 60));
                    duracionHoras3 = Math.round(restaDia3 / (1000 * 60 * 60));
                    if (duracionMinutos3 > 60) {
                        duracionMinutos3 = ((restaDia3 / (1000 * 60)) % 60);
                    }
                }
                let duracionEvento1 = '';
                let duracionEvento2 = '';
                let duracionEvento3 = '';

                if(duracionHoras !== undefined){
                    duracionEvento1 = duracionHoras + ':' + duracionMinutos;
                }else {
                    duracionEvento1 = '';
                }
                if(duracionHoras2 !== undefined){
                    duracionEvento2 = duracionHoras2 + ':' + duracionMinutos2;
                }else {
                    duracionEvento2 = '';
                }
                if(duracionHoras3 !== undefined){
                    duracionEvento3 = duracionHoras3 + ':' + duracionMinutos3;
                }else {
                    duracionEvento3 = '';
                }


                let arregloHorasInicio;

                const arregloDuracion = duracionEvento1 + ' ' + duracionEvento2 + ' ' + duracionEvento3;
                arregloHorasInicio = horaArribo1 + ' ' + horaArribo2 + ' ' + horaArribo3;
                const arregloHorasSalida = horaFin1 + ' ' + horaFin2 + ' ' + horaFin3;
                personas.duracionEvento = arregloDuracion;
                personas.horasInicio = arregloHorasInicio;
                personas.horasFin = arregloHorasSalida;
                personas.fechasArribo = arregloFechasEvento;
            }
        }
        let nombreResponsableAux = '';
        let cargoResponsableAux = 'Asistente Administrativo';
        let responsabilidadResponsableAux = 'Elaboración Informe';
        let firmaResponsableAux = '';
        let nombreAprobacionAux = '';
        let cargoAprobacionAux = 'Supervisor de Equipos de Seguridad';
        let responsabilidadAprobacionAux = 'Aprobación de Informe';
        let firmaAprobacionAux = '';
        if (incidenteNowForce.nombreResponsableFE != null) {
            nombreResponsableAux = incidenteNowForce.nombreResponsableFE;
        }
        if (incidenteNowForce.cargoResponsableFE != null) {
            cargoResponsableAux = incidenteNowForce.cargoResponsableFE;
        }
        if (incidenteNowForce.responsabilidadResponsableFE != null) {
            responsabilidadResponsableAux = incidenteNowForce.responsabilidadResponsableFE;
        }
        if (incidenteNowForce.firmaResponsableFE != null) {
            firmaResponsableAux = incidenteNowForce.firmaResponsableFE;
        }
        if (incidenteNowForce.nombreAprobacionFE != null) {
            nombreAprobacionAux = incidenteNowForce.nombreAprobacionFE;
        }
        if (incidenteNowForce.cargoAprobacionFE != null) {
            cargoAprobacionAux = incidenteNowForce.cargoAprobacionFE;
        }
        if (incidenteNowForce.responsabilidadAprobacionFE != null) {
            responsabilidadAprobacionAux = incidenteNowForce.responsabilidadAprobacionFE;
        }
        if (incidenteNowForce.firmaAprobacionFE != null) {
            firmaAprobacionAux = incidenteNowForce.firmaAprobacionFE;
        }
        let imagen1 = '';
        let imagen2 = '';
        let imagen3 = '';
        let hayFotos = false;
        if (incidenteNowForce.imagenFE1 != null) {
            hayFotos = true;
            imagen1 = incidenteNowForce.imagenFE1;
        }
        if (incidenteNowForce.imagenFE2 != null) {
            hayFotos = true;
            imagen2 = incidenteNowForce.imagenFE2;
        }
        if (incidenteNowForce.imagenF33 != null) {
            hayFotos = true;
            imagen3 = incidenteNowForce.imagenF33;
        }
        const insumosEntregados = {
            familia: '',
            alimentosPerecibles: '',
            alimentosNoPerecibles: '',
            kitHigiene: '',
            kitLimpieza: '',
            frazadas: '',
            vestimenta: '',
            calzado: '',
            kitEscolar: '',
            otros: '',
            especificarOtros: '',
        };
        const personalAsistioEmergencia = {
            funcionario: '',
            emergenciaAtendida: '',
            tiempoAtencionDesde: '',
            tiempoAtencionHasta: '',
            totalHoras: '',
        };
        let accionesRealizadasAux = '';
        let recomendacionesAux = '';
        if (accionesRealizadasAux != null)
            accionesRealizadasAux = incidenteNowForce.accionesRealizadasFE;
        if (recomendacionesAux != null)
            recomendacionesAux = incidenteNowForce.recomendacionesFE;
        const fechaImpresionAux = new Date();
        let fechaEventoAux = new Date(incidenteNowForce.Fecha.setHours(incidenteNowForce.Fecha.getHours() + 5));

        return {
            numero: incidenteNowForce.id,
            numeroInforme,
            logo: 'data:image/gif;base64,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',
            colores: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA7wAAAAQCAYAAAA1dXM/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAinSURBVHhe7dfnV1TnFsfxGY0xsSSxxOQur+s6jQGpUhURTVcTjTUWRDQ3VkSNDUUF6QNDE6WJDRsqFhRRmqCgFCkCmtys/DP77vM8Z86ZQe5fcH8vPmvveZ4DL89ZX0OrwUzPDCbJyDtrYU1GkzSG97FS4xiTpoF/PxlrYsq0aOrd1H3g6dE4Tw8/tFCtmwdu7o/X3f2IjbcxK9XwLtk0tz/W3WLVH1mpWpkTpJvs+gSrcGMi75OkaxOtwlUF/67iqbgySaqabKMrk610WTHJS7g4WWFjVrrwicJLU8nOf6qrYOWfeSpjJZ/ZqHSKl1Di5txULzrrpnia7sx0FzsVTfWmgmk2Kphuo0I+UxSw/Gl2yuf7vBk2wcm7S+7nPGd4U84MuwcHy/5CynKT8SXfTZlFCdExNDG+hgxbq2nMthtk2Hadd55xPLeo4q4JRmWP5V2x+aoUo9pUJW28QoYNI/xyWbfukmBUGdZe1BjX8Fx9QbeqUjCulAw/n5dWVLzvp3LpxzLBuExnWFoqLSkhww864/fnNIbvzmqM3/L8plj6+ozuKzeLi6RFhZ6iC8iwkEXle4rM0813kmHeCBG5UniOxhgmGUIdZAhhwdnvMc7NImOQg2WRIShTF5hBhgCeAXzuz7t/Ohn8VL5pTJkZZPThO59UnfdpMth52vkZOz8zM5kS0rfSu78CqGfAQt19Vurstwuv+rzoZb/U0Wejjl6evd7U/toutL32UtmptdtOz3q8qaXbhylTauryoUZVQ6fuyas5Kl+qf+lLj1ndyzlU1+En1Hb4Cg/adfdf+NK9F36au8/9hTvsdluAUN3mr7n5LIAF0o3WQLrOu+Jaiz9VCYHCleYAuszzcksQXWoOpEtNc4WLjUFCZUMQnedZ0RhM5YqGuVT2NEgo5b3kSTAL0ZyrD6azrLg+hM48DqYi3ovqQ6nwcQgV1AVTwSOej0Ipry6UnLw7ec99GEa5teGU8zCcHLVhmuwHYZSliaDM++GUwdLuh0l3Iyj1bjidvqeIoBT+rUi+E0GnaiLoZM08OnFHSuI96U4kHb89X3PsdiQlqo7eYtWRdKh6vnDwZqRw4GYUHbgWSQ9Lg+jvfDv9lWen/7A/nV6aP3LsHv5UOPiO/ZFt02XxvUsm36neZdjpXbrubZqX8E6RatOd5t/sbYpNSrZ6GD5lo+GTuqETVuGtIomfT/Ki4eN8x4aO8Z1qOJHPVUNH+Y4NHrEKQ4d5HrK44Tv25qBVGPhdN3hAerPfohnYx3fsTYJuYC+fq/rjzUyZVmFgD5/vlvp38Z2qb6fFQ/8Onttd+J71/ubmV5Num0XTt5XvWHeciXq28t2W2fQ61jyClXo2mxk/EzNb6I7hfRPfsd6NvLOujbOpawM/t34WdcaF0sXVGZQeVUCOxXmUHZ1PWYtc8igzOpflUTpLi3bqFuZRapR0mneXlCin5mRUrrTASSciczVJC6TjkTkejs13UCLfK47OzxEOqw7Nc3g4GJHNcuj3edKBCIdmX7iDEvg9LSl7Nu0NcwjxbE9YtofdIdKuUGlnSJaHHcGZwvbgLPqN3+2Kf/P7XfErv9O3zfW0ld/5ijgWy/fuNvP73yWGbeJvgbsNARnCev4uuPzC34l1/pm01i/Dwxo+V6zmb4di1RzdSp80WjHH03L+jkjp9BP70TtNWMbfFcVSbzf2FFrCZ9/y92a1LZlqLYfouWkftZj2C01mXSOfuzSMot6UoFL2/cJjVd3sfVRn2ivx/oifGamW//aBi3mfcJ93l3vmBLo7Qg3/vzvm99226G6Z499TzW6qbpj2qOLpOv+tu6vmPVRl3i3xM1X8zBX+m9Fc4mdHumjZQxdUlfw/XM6PopyVedgllFqkklGcY8WjOGPdKRRZdIWsYIR88w7Ks/xvTpZr3k45yj5zCx1f5qC4q39T7KV3FHthmGLYpsq3wsYL0obKYVp/fojWV7yldRVDtLZikA3RmnJpddkgrSqXVpa9oZ9LWckgrSgdpOW8Ly+RlpUM0NJz/aoBWnK2X/iBfV/cJ3zHvinupa/P9AlfFfUKi9miwtea6IJeWsiiCl6zHlqQ302R+T00L69bE+HsYj1CmLObQnO7NCE5nRSc20lzc7opyNFFgdmdFODoJP/sVxq/rJc0J+uV4JP5krwzOsieKXlltAu2zHay8rSmd5AlrV0wpb6g2Wkv6F+pz5ky22nW6Reaf6Y8p5nJbfSPFOnL5Fb2XPjiVBvNYJ+fbBWmn3jGWmnqiTbWQlNPNtOUpBb6lHfFJ0nNrIkmH2umSYnSRN4VExKbhPGJjfTh0QZh3JGnNO5wI89G+oCNPdxAY45IxsNPyXDoiScEL4IXwYvgRfAieFMQvAheBC+CF8GL4B0FghfBi+BF8CJ4EbwIXgQvghfBi+BF8CJ4EbwIXhWCF8GL4EXwIngRvAheBC+CF8GL4EXwIngRvAheNXIRvAheBC+CF8GL4EXwIngRvAheBC+CF8HLELwIXgQvghfBi+BF8CJ4EbwIXgQvghfBi+BF8HKUIngRvAheBC+CF8GL4EXwIngRvAheBC+Cl+8RvAheBC+CF8GL4EXw8hmCV4XgRfAieBG8CF4EL4IXwYvgRfCqELwIXgQvghfBi+BF8CJ4EbwIXgQvghfBi+BF8KqRi+BF8CJ4EbwIXgQvghfBi+BF8CJ4EbwIXobgRfAieBG8CF4EL4IXwYvgRfAieBG8CF4EL4KXoxTBi+BF8CJ4EbwIXgQvghfBi+BF8CJ4Ebx8j+BF8CJ4EbwIXgQvgpfPELwqBC+CF8GL4EXwIngRvAheBC+CV4XgRfAieBG8CF4EL4IXwYvgRfAieBG8CF4EL4JXjVwEL4IXwYvgRfAieBG8CF4EL4IXwYvgRfAyBC+CF8GL4EXwIngRvAheBC+CF8GL4EXwIngRvBylCF4EL4L3/zV4n9B/AWrOCS4zW6d9AAAAAElFTkSuQmCC',
            administracionZonal: incidenteNowForce.administracioZonal,
            fechaEvento: (AppUtil.formatearFechaHora(fechaEventoAux)).toString().split(' ')[0],
            horauString,
            fechaInspeccion: AppUtil.formatearFechaHora(incidenteNowForce.fechaInspeccion),
            parroquia: incidenteNowForce.parroquia,
            barrio: incidenteNowForce.barrio,
            direccion: incidenteNowForce.direccion,
            referencia: referencia.toString(),
            solicitadoPor,
            tipoEvento: incidenteNowForce.tipo,
            latitud: incidenteNowForce.latitud.toFixed(7),
            longitud: incidenteNowForce.longitud.toFixed(7),
            zona: incidenteNowForce.zona,
            coordenadaX: incidenteNowForce.coordenadaX,
            coordenadaY: incidenteNowForce.coordenadaY,
            integrantesFamilia,
            numeroFamiliasAfectadas: auxNumeFamilias,
            numeroFamiliasAlbergados: famiAlbergadas,
            numeroFamiliasDamnificados: famiDamnificadas,
            numeroFamiliasRenuentes: 0,
            numeroPersonasAfectadosMujeres: numafectadosM,
            numeroPersonasAfectadosHombres: numafectadosH,
            numeroPersonasAlbergadosMujeres: numalbergadosM,
            numeroPersonasAlbergadosHombres: numalbergadosH,
            numeroPersonasDamnificadosMujeres: numDamnificadosM,
            numeroPersonasDamnificadosHombres: numDamnificadosH,
            numeroPersonasHeridosEstables: 0,
            numeroPersonasHeridosCriticos: numHeridos,
            numeroPersonasFallecidos: numFallecidos,
            numeroPersonasRenuentes: 0,
            metalica: metalicaTC,
            hormigonArmado: hormigonTC,
            adobe: adobeTC,
            madera: maderaTC,
            mixta: mixtaTC,
            otros: otrosTC,
            mapa,
            insumosEntregados,
            personalAsistioEmergencia,
            conclusiones: accionesRealizadasAux,
            recomendaciones: recomendacionesAux,
            informeEmergencia,
            facturasDatos,
            totalSubTotalFactura,
            totalIvaFactura,
            totalTotalFactura,
            totalRetRentaFactura,
            totalRetIvaFactura,
            totalPagarFactura,
            imagen1, imagen2, imagen3,
            nombreResponsableAux,
            cargoResponsableAux,
            responsabilidadResponsableAux,
            firmaResponsableAux,
            nombreAprobacionAux,
            cargoAprobacionAux,
            responsabilidadAprobacionAux,
            firmaAprobacionAux,
            fechaImpresion: AppUtil.formatearFechaHora(fechaImpresionAux),
            personasEmergenciaDatos,
            insumosEntregadosFamilia,
        };
    }
    mapearIncidenteAReporteSeguimiento(incidenteNowForce, elaborado, fuente, numCOE) {
        if (!elaborado) {
            elaborado = '';
        }
        if (!fuente) {
            fuente = '';
        }
        if (!numCOE) {
            numCOE = '';
        }
        return {
            numero: numCOE,
            ficha: incidenteNowForce.fichaEcu,
            logo: 'data:image/png;base64,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',
            colores: 'data:image/png;base64,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',
            administracionZonal: incidenteNowForce.administracioZonal,
            fechaReporte: AppUtil.formatearFechaHora(new Date()).toString().split(' ')[0],
            fechaEvento: AppUtil.formatearFechaHora(incidenteNowForce.fechaLlamadaFec).toString().split(' ')[0],
            hora: AppUtil.obtenerHora(incidenteNowForce.fechaLlamadaFec),
            descripcionEvento: incidenteNowForce.descripcion,
            parroquia: incidenteNowForce.parroquia,
            direccion: incidenteNowForce.direccion,
            tipoEvento: incidenteNowForce.tipo,
            fuentes: fuente.toString(),
            elaboradoPor: elaborado.toString(),
            zona: incidenteNowForce.zona,
        };
    }
    mapearIncidenteAReporteCierre(incidenteNowForce, elaborado, fuente, numCOE) {
        if (!elaborado) {
            elaborado = '';
        }
        if (!fuente) {
            fuente = '';
        }
        if (!numCOE) {
            numCOE = '';
        }
        return {
            numero: numCOE,
            ficha: incidenteNowForce.fichaEcu,
            logo: 'data:image/png;base64,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',
            colores: 'data:image/png;base64,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',
            administracionZonal: incidenteNowForce.administracioZonal,
            fechaReporte: AppUtil.formatearFechaHora(new Date()).toString().split(' ')[0],
            fechaEvento: AppUtil.formatearFechaHora(incidenteNowForce.fechaLlamadaFec).toString().split(' ')[0],
            horaEvento: AppUtil.obtenerHora(incidenteNowForce.fechaLlamadaFec),
            fechaCierre: AppUtil.formatearFechaHora(incidenteNowForce.fechaFinalizacionFec).toString().split(' ')[0],
            horaCierre: AppUtil.obtenerHora(incidenteNowForce.fechaFinalizacionFec),
            descripcionEvento: incidenteNowForce.descripcion,
            parroquia: incidenteNowForce.parroquia,
            direccion: incidenteNowForce.direccion,
            tipoEvento: incidenteNowForce.tipo,
            fuentes: fuente.toString(),
            elaboradoPor: elaborado.toString(),
            zona: incidenteNowForce.zona,
        };
    }
    mapearIncidenteAReportePreliminar(incidenteNowForce, elaborado, fuente, numCOE) {
        if (!elaborado) {
            elaborado = '';
        }
        if (!fuente) {
            fuente = '';
        }
        if (!numCOE) {
            numCOE = '';
        }
        return {
            numero: numCOE,
            ficha: incidenteNowForce.fichaEcu,
            logo: 'data:image/png;base64,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',
            colores: 'data:image/png;base64,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',
            administracionZonal: incidenteNowForce.administracioZonal,
            fechaReporte: AppUtil.formatearFechaHora(new Date()).toString().split(' ')[0],
            fechaEvento: AppUtil.formatearFechaHora(incidenteNowForce.fechaLlamadaFec).toString().split(' ')[0],
            hora: AppUtil.obtenerHora(incidenteNowForce.fechaLlamadaFec),
            descripcionEvento: incidenteNowForce.descripcion,
            parroquia: incidenteNowForce.parroquia,
            direccion: incidenteNowForce.direccion,
            tipoEvento: incidenteNowForce.tipo,
            fuentes: fuente.toString(),
            elaboradoPor: elaborado.toString(),
            zona: incidenteNowForce.zona,
        };
    }
    getUrlImgenMapa(dimension, coordenadas) {
        const url = `http://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${coordenadas.latitud},${coordenadas.longitud}/18?` +
            `mapSize=${dimension.base},${dimension.altura}&pp=${coordenadas.latitud},${coordenadas.longitud};66&mapLayer=Basemap,Buildings&key=${this.BING_MAPS_KEY}`;
        return url;
    }
}
