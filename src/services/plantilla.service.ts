import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {SolicitudPreviaDto} from '../dtos/solicitud-previa.dto';
import {TarjaRecepcionVehiculoRepository} from '../repositories/tarja-recepcion-vehiculo.repository';
import {AppConstant} from '../app.constant';
import {EmailService} from './email.service';
import {CorreoRepository} from "../repositories/correo.repository";

const Promise = require('bluebird');
const pdf = Promise.promisifyAll(require('html-pdf'));
const image2base64 = require('image-to-base64');

@Injectable()
export class PlantillaService {

  urlImagenPDf: string;

  constructor(
    @Inject(forwardRef(() => TarjaRecepcionVehiculoRepository))
    private tarjaRecepcionVehiculoRepository: TarjaRecepcionVehiculoRepository,
    private emailService: EmailService,
    private correoRepository: CorreoRepository
  ) {
    this.urlImagenPDf = ``;
  }

  async enviarNotificacionRetiroPdf(id, archivos: any[], mensaje) {
  /*  try {
      const data = await this.tarjaRecepcionVehiculoRepository.selectByIdAllInformation(id);
      const html = await this.tarjaRecepcionPDFHtml(data);
      await pdf.create(html, {format: 'Letter'}).toFile('./img/tarja.pdf', async (err, res) => {
        archivos.push({filename: 'tarja.pdf', path: './img/tarja.pdf'});
        const correos = await this.correoRepository.select();
        await this.emailService.enviarCorreo(correos.map(it => it.valor), 'Notificación de Tarja', mensaje, archivos);
      });
    } catch (e) {
      console.log(e);
    }*/
  }

  private async tarjaRecepcionPDFHtml(tarja: TarjaRecepcionVehiculoDto) {
    let htmlControlesFisicos = '';
    let htmlControlesVehiculo = '';
    let htmlFotos = '';
    let imagenControlFisico: any = '';
    if (tarja.controlesFisicos) {
      let contador = 1;
      for (let i = 0; i < tarja.controlesFisicos.length; i++) {
        const textoControl = (tarja.controlesFisicos[i].etiqueta && tarja.controlesFisicos[i].etiqueta !== undefined) ? 'Defectuoso: ' + tarja.controlesFisicos[i].etiqueta : 'Correcto';
        switch (contador) {
          case 1:
            imagenControlFisico = await this.transformarImagen(tarja.controlesFisicos[i].catalogoControlFisico.urlImagen);
            htmlControlesFisicos += `<tr> <th><img src="data:image/png;base64,` + imagenControlFisico + `" width="100" height="70" style="padding-right: 5px;"><p>` + textoControl + `</p></th>`;
            contador++;
            break;
          case 2:
            imagenControlFisico = await this.transformarImagen(tarja.controlesFisicos[i].catalogoControlFisico.urlImagen);
            htmlControlesFisicos += `<th><img src="data:image/png;base64,` + imagenControlFisico + `" width="100" height="70" style="padding-right: 5px;"><p>` + textoControl + `</p></th>`;
            contador++;
            break;
          case 3:
            imagenControlFisico = await this.transformarImagen(tarja.controlesFisicos[i].catalogoControlFisico.urlImagen);
            htmlControlesFisicos += `<th><img src="data:image/png;base64,` + imagenControlFisico + `" width="100" height="70" style="padding-right: 5px;"><p>` + textoControl + `</p></th>`;
            contador++;
            break;
          case 4:
            imagenControlFisico = await this.transformarImagen(tarja.controlesFisicos[i].catalogoControlFisico.urlImagen);
            htmlControlesFisicos += `<th><img src="data:image/png;base64,` + imagenControlFisico + `" width="100" height="70" style="padding-right: 5px;"><p>` + textoControl + `</p></th></tr>`;
            contador++;
            break;
        }
        if (contador == 4) {
          htmlControlesFisicos += `</tr>`;
          contador = 1;
        }
      }
    }
    if (tarja.controlesVehiculo) {
      let contador = 1;
      await tarja.controlesVehiculo.forEach(value => {
        switch (contador) {
          case 1:
            htmlControlesVehiculo += `<tr><td>` + value.catalogoControlVehiculo.nombre + `</td><td>`
              + (value.estadoControl === AppConstant.ESTADO_CONTROL_TARJA_CORRECTO ? 'CORECTO' : 'DEFECTUOSO') + `</td>`;
            contador++;
            break;
          case 2:
            htmlControlesVehiculo += `<td>` + value.catalogoControlVehiculo.nombre + `</td><td>`
              + (value.estadoControl === AppConstant.ESTADO_CONTROL_TARJA_CORRECTO ? 'CORECTO' : 'DEFECTUOSO') + `</td></tr>`;
            contador = 1;
            break;
        }
      });
      if (contador !== 2) {
        htmlControlesVehiculo += `</tr>`;
      }
    }
    if (tarja.fotosBase64) {
      await tarja.fotosBase64.forEach(value => {
        htmlFotos += `<div style="padding: 5px; float: left;"><img src="data:image/png;base64,` + value + ` "width="100" height="70" style="padding-right: 10px;"></div>`;
      });
    }

    var imagen = await this.transformarImagen('assets/tabacarcenazul.png');
    var imagenToyota = await this.transformarImagen('assets/img/toyota-logo.jpg');
    return await `
      <div class="container" style="padding: 20px;"> 
        <div style="width: 100%; text-align: center;">
           <h2 style="color: #1a174d;"><img src="data:image/png;base64,` + imagen + `"
            width="140" height="65" style="padding-right: 10px;"><b>LMI.</b></h2>
        </div>
        <div class="row" style="padding-top: 10px;">
           <div class="col">
              <div class="table-responsive">
                <table class="table align-items-center table-flush"  border=1 cellspacing=0 cellpadding=2 width="100%">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col" rowspan="4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="col" rowspan="3"><img src="data:image/png;base64,` + imagenToyota + `" width="100" height="70" style="padding-right: 10px;"></th>
                      <th scope="col" colspan="3"><h2>TOYOTA DEL ECUADOR S.A</h2></th>
                    </tr>
                    <tr>
                      <td colspan="3" style="text-align: center">TARJA DE RECEPCIÓN DE VEHÍCULOS</td>
                    </tr>
                    <tr>
                      <td style="color: red; text-align: center;" colspan="3">N° ` + tarja.numeroTarja + `</td>
                    </tr>
                    <tr style="text-align: center;">
                      <td colspan="2">MARCA DEL VEHÍCULO</td>
                      <td>TIPO DEL VEHÍCULO</td>
                      <td>COLOR</td>
                    </tr>
                    <tr style="text-align: center;">
                      <td colspan="2">TOYOTA</td>
                      <td>.............</td>
                      <td>` + (tarja.detalleItemProducto ? tarja.detalleItemProducto.color : '') + `</td>
                    </tr>
                    <tr style="text-align: center;">
                      <td colspan="2"># CHASIS</td>
                      <td># MOTOR</td>
                      <td>KILOMETRAJE</td>
                    </tr>
                    <tr style="text-align: center;">
                      <td colspan="2">` + (tarja.detalleItemProducto ? tarja.detalleItemProducto.chasis : '') + `</td>
                      <td>` + (tarja.detalleItemProducto ? tarja.detalleItemProducto.motor : '') + `</td>
                      <td>` + tarja.kilometraje + `</td>
                    </tr>` + htmlControlesVehiculo + `
                    <tr style="background-color: #919ca6">
                        <td colspan="4" height="20px"></td>
                    </tr>
                    <tr>
                      <td colspan="4">OBSERVACIONES: ` + tarja.observaciones + `</td>
                    </tr>
                    <tr>
                        <td colspan="4" height="20px"></td>
                    </tr>
                    <tr>
                        <td colspan="4" height="20px"></td>
                    </tr>` + htmlControlesFisicos + `
                    <tr>
                        <td colspan="4" style="text-align: center;">G (Golpe) - R (Raya) - T (Trizado) - F (Faltante) - Rs (Raspado) - D (Desconche)</td>
                    </tr>
                    <tr>
                        <td colspan="4" height="20px"></td>
                    </tr>
                    <tr><td colspan="4">` + htmlFotos + `</td></tr>
                    <tr>
                      <td colspan="2">Fecha de Recepción: ` + tarja.fechaRecepcion + `</td>
                      <td colspan="2">Fecha de Entrega: ` + tarja.fechaEntrega + `</td>
                    </tr>
                    <tr>
                      <td colspan="2">Firma Bodega: </td>
                      <td colspan="2">Firma Bodega: </td>
                    </tr>
                    <tr>
                      <td colspan="2">Firma Cliente: </td>
                      <td colspan="2">Firma Cliente: </td>
                    </tr>
                    <tr>
                      <td colspan="4"><p>Nota: La presente tarja será elaborada en presencia del cliente,
                      para que éste certifique mediante su firma el estado de la entrega del vehículo aquí detallado.</p></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>`;
  }

  async transformarImagen(ruta) {
    return await image2base64(ruta);
  }

}

export interface TarjaRecepcionVehiculoDto {
  id: number;
  fechaHoraRegistro: string;
  fechaHoraActualizacion: string;
  fechaTarja: string;
  numeroTarja: string;
  kilometraje: number;
  combustible: number;
  observaciones: string;
  fechaRecepcion: string;
  fechaEntrega: string;
  idDetalleItemProducto: number;
  idRack?: number;
  idNotificacionRetiro?: number;
  notificacionRetiro?: NotificacionRetiroDto;
  fotos?: FotoDto[];
  detalleItemProducto?: DetalleItemProductoDto;
  controlesVehiculo?: ControlVehiculoDto[];
  controlesFisicos?: ControlFisicoDto[];
  rack?: RackDto;
  fotosBase64?: string[];
}

export interface NotificacionRetiroDto {
  id: number | string;
  codigoReferencia: string;
  tipoRetiro: string;
  fechaNotificacion: string;
  personaFirma: string;
  observaciones: string;
  numeroParcial: number;
  idPersonaAutorizada: number;
  idUsuario: number;
  personaAutorizada?: PersonaAutorizadaDto;
  estado: number;
}

export interface PersonaAutorizadaDto {
  id: number | string;
  nombre: string;
  cedula: string;
  idCliente: number;
  estado: number;
  cliente?: ClienteDto;
}

export interface ClienteDto {
  id: number | string;
  ruc: string;
  nombre: string;
  direccion: string;
  telefono: string;
  consignatario: string;
  email: string;
  domiciliado: string;
  estado: number;
}

export interface FotoDto {
  id: number;
  fechaHoraRegistro: Date;
  fechaHoraActualizacion: Date;
  url: string;
}

export interface DetalleItemProductoDto {
  id: number;
  fechaHoraRegistro: string;
  fechaHoraActualizacion: string;
  chasis: string;
  motor: string;
  color: string;
  placa?: string;
  itemSalida: number;
  precioUnitarioSalida?: number;
  fletePorUnidadSalida?: number;
  seguroPorItemSalida?: number;
  valorFOBSalida?: number;
  valorCIFSalida?: number;
  pesoSalida?: number;
  estado: number;
  idSolicitudPreviaDetalle: number;
  solicitudPreviaDetalle?: SolicitudPreviaDetalleDto;
}

export class SolicitudPreviaDetalleDto {
  id: number;
  fechaHoraRegistro: string;
  fechaHoraActualizacion: string;
  item: number;
  descripcion: string;
  partidaArancelaria: string;
  cantidad: number;
  precioUnitario: number;
  fletePorUnidad: number;
  seguroPorItem: number;
  valorFOB?: number;
  valorCIF?: number;
  estado: number;
  detallesItemProducto?: DetalleItemProductoDto[];
  idProducto: number;
  idMatriculaAfianzada?: number;
  producto?: ProductoDto;
  solicitudPrevia?: SolicitudPreviaDto;
}

export interface ProductoDto {
  id: number;
  marca: string;
  tipo: string;
  descripcion: string;
  partidaArancelaria: string;
  estado: number;
}


export interface ControlVehiculoDto {
  id: number;
  fechaHoraRegistro?: string;
  fechaHoraActualizacion?: string;
  estadoControl: number;
  observaciones: string;
  idTarjaRecepcionVehiculo: number;
  idCatalogoControlVehiculo: number;
  catalogoControlVehiculo?: CatalogoControlVehiculoDto,
}


export interface CatalogoControlVehiculoDto {
  id: number;
  fechaHoraRegistro?: string;
  fechaHoraActualizacion?: string;
  nombre: string;
}

export interface ControlFisicoDto {
  id: number;
  fechaHoraRegistro?: string;
  fechaHoraActualizacion?: string;
  estadoControl: number;
  etiqueta: string;
  idTarjaRecepcionVehiculo: number;
  idCatalogoControlFisico: number;
  catalogoControlFisico?: CatalogoControlFisicoDto,
}

export interface CatalogoControlFisicoDto {
  id: number;
  fechaHoraRegistro: string;
  fechaHoraActualizacion: string;
  nombre: string;
  urlImagen: string;
}

export interface RackDto {
  id?: number | string;
  fechaHoraRegistro?: string;
  fechaHoraActualizacion?: string;
  codigo: string;
  letra: string;
  fila: number;
  columna: number;
  latitud: number;
  longitud: number;
  estado: number;
  idBodega?: number;
  idTarjaRecepcionActual?: number;
}
