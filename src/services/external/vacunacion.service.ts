import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';

const publicIp = require('public-ip');

@Injectable()
export class VacunacionService {
  private TOKEN = '99da29dd-b860-4207-8dca-da0bba5337b2';
  private URL_NOW_FORCE = process.env.URL_NOW_FORCE || 'https://lugarvacunacion.cne.gob.ec/CneApiWs/api/ConsultaVotacionDomicilioElectoral2021';

  //private auth = 'Basic ' + new Buffer('admin' + ':' + 'Latinmedia2021_').toString('base64');

  constructor(
    private readonly _httpService: HttpService,
  ) {
  }


  async postLugarVacunacion(body): Promise<Observable<AxiosResponse<any[]>>> {
    let aux = '';
    let peticionVotacion = {};
    await (async () => {
      aux = await publicIp.v6();
      console.log(await publicIp.v4());


      console.log(await publicIp.v6());

    })();
    console.log(aux, body);
    peticionVotacion = {
      cedula: body.cedula.toString(),
      nombre: body.fecha.toString(),
      ip: aux.toString(),
      recaptcharesponse: '03AGdBq24NFohKM2P2i8ALsirUhLnowwJZM1YkjKqZiAwq6UhwHyWoNZlfFpyqe_zgCYOfbWhPTLKgdKzRcjpRdnt4vu39_3x1e1bEmbVxKuuI9Otf7TOvvexC15cBTZSOWjugzEZqihnax7sej3Onrku-UTMJ2TfRobjm578vngTePxrulNM77repf_hlWrOxnKaIpasm9ByspNrlJAye5MvBu9-iY6GQUI9HxwuaBiBzrRY5kDZ6KYWoCkBi_a2b8lLAUVJ_lqSngKfaeSb3-8hrT7Ng4IXQUD8wtQnOuJKsIloQBGWFDCqE4p-Ii_W16T-UyR9e6NDXjOew91g0VQpurvHQ986YYR9fctvooWpGC_BISZ23SnnHWPYYad_roCcPBI30nJRxX-8ZCrzeveor6zZAyQimRUD25hkqXAkyNOAVZrc37JyORAu513ZiAIADlAgrV6X_No0CdFYig1AT67CLFiQzTN0rk6_I01Irf0Wnyvin2KwRhz0rOASuf23tlGA1nfIDPKjM2gGmxSGG0kkQObG8UA',
    };
    console.log('peticion', peticionVotacion);
    return null
    /*return this._httpService.post(
          this.URL_NOW_FORCE,
          peticionVotacion,{
            headers: {
              Authorization: this.TOKEN,
            },
          },
        );*/
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
