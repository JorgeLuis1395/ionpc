import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';

@Injectable()
export class Dhis2Service {
  private TOKEN = '99da29dd-b860-4207-8dca-da0bba5337b2';
  private URL_NOW_FORCE = process.env.URL_NOW_FORCE || 'http://186.4.200.154:3500/dhis2/api/';
  private auth = 'Basic ' + new Buffer('admin' + ':' + 'Latinmedia2021_').toString('base64');

  constructor(
    private readonly _httpService: HttpService,
  ) {
  }

  getHttpIncidentesAbiertos(fechaInicio, fechaFin): Observable<any> {

    return this._httpService
      .get(
        this.URL_NOW_FORCE +
        'events/eventRows.json?orgUnit=k6mme4qUYsT&ouMode=SELECTED&program=EZkN8vYZwjR&startDate=' + fechaInicio.toISOString().split('T')[0] + '&endDate=' + fechaFin.toISOString().split('T')[0],
        {
          headers: {
            'Authorization': this.auth,
          },
        },
      )
      .pipe(map(value => value.data));
  }


  postHttpEntidad(body): Observable<AxiosResponse<any[]>> {
    return this._httpService.post(
      this.URL_NOW_FORCE + 'trackedEntityInstances',
      body,
      {
        headers: {
          Authorization: this.TOKEN,
        },
      },
    );
  }

  postHttpParteBombero(body): Observable<AxiosResponse<any[]>> {
    return this._httpService.post(
      this.URL_NOW_FORCE + 'DynamicFields/Upsert/json/30/30',
      body,
      {
        headers: {
          Authorization: this.TOKEN,
        },
      },
    );
  }


}
