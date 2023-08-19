import {Controller, Get, Param, Res, UseGuards} from '@nestjs/common';
import {ReporteService} from "../services/reporte.service";



@Controller('reporte')
export class ReporteController {

    constructor(private reporteService: ReporteService) {
    }

    @Get('incidentes-now-forces-informe/:id/:referencia/:fechaInspecciondato/:anexo2Dato/:anexo3Dato/:nombreTecnico/:cargoTecnico/:responsabilidadTecnico/:nombreRevisor/:cargoRevisor/:responsabilidadRevisor')
    getGenerarReporteIncidentesNowForcesInforme(@Param('id') id, @Param('referencia') referencia, @Param('fechaInspecciondato') fechaInspecciondato,
                                                @Param('anexo2Dato') anexo2Dato, @Param('anexo3Dato') anexo3Dato, @Param('nombreTecnico') nombreTecnico,
                                                @Param('cargoTecnico') cargoTecnico, @Param('responsabilidadTecnico') responsabilidadTecnico, @Param('nombreRevisor') nombreRevisor,
                                                @Param('cargoRevisor') cargoRevisor, @Param('responsabilidadRevisor') responsabilidadRevisor, @Res() res) {
        this.reporteService.generarReporteIncidentesNowForcesInforme(
            id, referencia, fechaInspecciondato, anexo2Dato, anexo3Dato, nombreTecnico, cargoTecnico, responsabilidadTecnico, nombreRevisor, cargoRevisor, responsabilidadRevisor,
            (err, data) => {
                if (err) {
                    res.send(err.toString());
                } else {
                    res.writeHead(200, {
                            'Content-Length': Buffer.byteLength(data),
                            'Content-Type': 'application/pdf',
                            'Content-Disposition': 'attachment;filename=Reporte Incidente.pdf',
                        },
                    ).end(data);
                }
            },
        );
    }

    @Get('incidentes-now-forces-informe-fe/:id/:referencia')
    getGenerarReporteIncidentesNowForcesInformeFe(@Param('id') id, @Param('referencia') referencia, @Res() res) {
        this.reporteService.generarReporteIncidentesNowForcesInformeFe(
            id, referencia,
            (err, data) => {
                if (err) {
                    res.send(err.toString());
                } else {
                    res.writeHead(200, {
                            'Content-Length': Buffer.byteLength(data),
                            'Content-Type': 'application/pdf',
                            'Content-Disposition': 'attachment;filename=Reporte Incidente FE.pdf',
                        },
                    ).end(data);
                }
            },
        );
    }

    @Get('incidentes-now-forces-informe-ge/:id/:numeroInforme/:nombreEmergencia/:solicitadoPor/:referencia')
    getGenerarReporteIncidentesNowForcesInformeGe(@Param('id') id, @Param('numeroInforme') numeroInforme, @Param('nombreEmergencia') nombreEmergencia, @Param('solicitadoPor') solicitadoPor, @Param('referencia') referencia, @Res() res) {
        this.reporteService.generarReporteIncidentesNowForcesInformeGe(
            id, numeroInforme, nombreEmergencia, solicitadoPor, referencia,
            (err, data) => {
                if (err) {
                    res.send(err.toString());
                } else {
                    res.writeHead(200, {
                            'Content-Length': Buffer.byteLength(data),
                            'Content-Type': 'application/pdf',
                            'Content-Disposition': 'attachment;filename=Reporte Incidente GE.pdf',
                        },
                    ).end(data);
                }
            },
        );
    }

    @Get('incidentes-preliminar/:id/:elaborado/:fuente/:numCOE')
    getGenerarReporteIncidentesPreliminar(@Param('id') id, @Param('elaborado') elaborado, @Param('fuente') fuente, @Param('numCOE') numCOE, @Res() res) {
        this.reporteService.generarReporteIncidentesPreliminar(
            id, elaborado, fuente, numCOE,
            (err, data) => {
                if (err) {
                    res.send(err.toString());
                } else {
                    res.writeHead(200, {
                            'Content-Length': Buffer.byteLength(data),
                            'Content-Type': 'application/pdf',
                            'Content-Disposition': 'attachment;filename=Reporte Incidente Preliminar.pdf',
                        },
                    ).end(data);
                }
            },
        );
    }

    @Get('incidentes-seguimiento/:id/:elaborado/:fuente/:numCOE')
    getGenerarReporteIncidentesSeguimiento(@Param('id') id, @Param('elaborado') elaborado, @Param('fuente') fuente, @Param('numCOE') numCOE, @Res() res) {
        this.reporteService.generarReporteIncidentesSeguimiento(
            id, elaborado, fuente, numCOE,
            (err, data) => {
                if (err) {
                    res.send(err.toString());
                } else {
                    res.writeHead(200, {
                            'Content-Length': Buffer.byteLength(data),
                            'Content-Type': 'application/pdf',
                            'Content-Disposition': 'attachment;filename=Reporte Incidente Seguimiento.pdf',
                        },
                    ).end(data);
                }
            },
        );
    }

    @Get('incidentes-cierre/:id/:elaborado/:fuente/:numCOE')
    getGenerarReporteIncidentesCierre(@Param('id') id, @Param('elaborado') elaborado, @Param('fuente') fuente, @Param('numCOE') numCOE, @Res() res) {
        this.reporteService.generarReporteIncidentesCierre(
            id, elaborado, fuente, numCOE,
            (err, data) => {
                if (err) {
                    res.send(err.toString());
                } else {
                    res.writeHead(200, {
                            'Content-Length': Buffer.byteLength(data),
                            'Content-Type': 'application/pdf',
                            'Content-Disposition': 'attachment;filename=Reporte Incidente Cierre.pdf',
                        },
                    ).end(data);
                }
            },
        );
    }

}
