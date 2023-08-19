import {HttpService, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {AxiosResponse} from 'axios';
import {map} from 'rxjs/operators';
import {IncidenteNowForceService} from './incidente-now-force.service';
import {CatalogoService} from '../catalogo.service';
import {MapaService} from '../mapa.service';

@Injectable()
export class NowForceService {
    // private TOKEN = '99da29dd-b860-4207-8dca-da0bba5337b2';
    // private URL_NOW_FORCE = process.env.URL_NOW_FORCE || 'https://quito.nowforce.com/api/en-us/';

    constructor(
        private readonly _httpService: HttpService,
        private readonly _mapaService: MapaService,
        private readonly _catalogoService: CatalogoService,
        private readonly incidenteNowForceService: IncidenteNowForceService,
    ) {
    }


    obtenerIncidentesMapeados(
        fechaHoraInicio?: Date,
        fechaHoraFin?: Date,
    ) {
        if (fechaHoraInicio && fechaHoraFin) {
            return this.incidenteNowForceService.seleccionarPorFechas(fechaHoraInicio, fechaHoraFin);
        } else {
            return this.incidenteNowForceService.seleccionarTodos();
        }
    }

}
