import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UbicacionUsuarioInterface } from '../../interface/ubicacion-usuario.interface';
import { UbicacionUsuarioDTO } from '../../dtos/ubicacion-usuario.dto';
import moment = require('moment');

@Injectable()
export class UsuarioUbicacionRepository {
  private nodemailer;
  private transporter;
  private mailOptions;
  private FROM = 'jcarrillo@lmi-int.com';
  private Nexmo;
  private nexmo;
  private hbs;

  constructor(@InjectModel('UbicacionUsuario')
  private ubicacionModel: Model<UbicacionUsuarioInterface>,
  ) {
    this.hbs = require('nodemailer-handlebars');
    this.nodemailer = require('nodemailer');

    this.transporter = this.nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 465,
      secure: true, // use TLS
      auth: {
        user: "jcarrillo@lmi-int.com",
        pass: "Sistemas2013811"
      }
    });

    this.mailOptions = {};

    this.Nexmo = require('nexmo');
    this.nexmo = new this.Nexmo({
      apiKey: '5777e540',
      apiSecret: 'NWZCWOZgrb9vNbee',
    });
  }


  async create(UbicacionUsuario: UbicacionUsuarioDTO): Promise<any> {
    const createdCat = new this.ubicacionModel(UbicacionUsuario);
    return createdCat.save();
  }

  async findAll(): Promise<any> {
    return await this.ubicacionModel.find().exec();
  }

  async findById(id): Promise<UbicacionUsuarioInterface> {

    const customer = await this.ubicacionModel.findById(id).exec();
    return customer;
  }

  async find(req: string): Promise<any> {
    return await this.ubicacionModel.find({ estado_incidente: { $eq: req } }).exec();
  }

  async seleccionarPorEventoPadre(evento: any): Promise<any> {

    return await this.ubicacionModel
      .find({ evento_padre: { $eq: evento } }).exec();
  }

  /* async update(id, UbicacionUsuario: UbicacionUsuarioDTO): Promise<any> {

     return await this.ubicacionModel.findByIdAndUpdate(id, UbicacionUsuario, { new: true });
   }*/

  async delete(id): Promise<any> {
    return await this.ubicacionModel.findByIdAndRemove(id);
  }

  async seleccionarPorFechasUsuarioPositivo(fechaHoraInicio, fechaHoraFin, idUsuario) {
    let auxArreglo = [];
    let auxResultado = [];
    let auxResultado1 = [];
    auxArreglo = await this.ubicacionModel
      .find({
        $and: [{
          $and: [{ fecha_lectura: { $lte: fechaHoraInicio } }, { fecha_lectura: { $gte: fechaHoraFin } }],
        },
        { id_usuario: { $eq: idUsuario.toString() } }],
      });
    for (let a of auxArreglo) {
      if (a.trabajador_afiliado === 'si') {
        const formato = 'YYYY-MM-DD HH:mm:ss';
        let fechaHoraFin1;
        const auxFechaFinValor = new Date(a.fecha_lectura);
        const auxFecha = new Date(auxFechaFinValor.setHours(auxFechaFinValor.getHours() + 8));
        const fechaHoraInicio1 = moment(a.fecha_lectura, formato).toDate();
        fechaHoraFin1 = moment(auxFecha, formato).toDate();
        auxResultado = await this.seleccionarLocalFecha(fechaHoraInicio1, fechaHoraFin1, a.local);
        auxResultado1 = [...auxResultado1, ...auxResultado];
      }
      else {
        const formato = 'YYYY-MM-DD HH:mm:ss';
        let fechaHoraFin1;
        const auxFechaFinValor = new Date(a.fecha_lectura);
        const auxFecha = new Date(auxFechaFinValor.setHours(auxFechaFinValor.getHours() + 2));
        const fechaHoraInicio1 = moment(a.fecha_lectura, formato).toDate();
        fechaHoraFin1 = moment(auxFecha, formato).toDate();
        auxResultado = await this.seleccionarLocalFecha(fechaHoraInicio1, fechaHoraFin1, a.local);
        auxResultado1 = [...auxResultado1, ...auxResultado];
      }
    }
    let hash = {};
    auxResultado1 = auxResultado1.filter(o => hash[o.id_usuario] ? false : hash[o.id_usuario] = true);
    auxResultado1.forEach(element => {

      this.EnvioCorreos(element.correo_usuario, element.nombre_usuario);
    });
    return this.ubicacionModel
      .find({
        $and: [{
          $and: [{ fecha_lectura: { $lte: fechaHoraInicio } }, { fecha_lectura: { $gte: fechaHoraFin } }],
        },
        { id_usuario: { $eq: idUsuario.toString() } }],
      })
      .exec();
  }
  async seleccionarLocalFecha(fechaHoraInicio, fechaHoraFin, local) {
    return this.ubicacionModel
      .find({
        $and: [{
          $and: [{ fecha_lectura: { $lte: fechaHoraFin } }, { fecha_lectura: { $gte: fechaHoraInicio } }],
        },
        { local: { $eq: local.toString() } }],
      })
      .exec();
  }
  async EnvioCorreos(correo, nombre) {
    try {
      const testAccount = await this.nodemailer.createTestAccount();
      const transporter = await this.nodemailer.createTransport({
        host: "smtpout.secureserver.net",
        port: 465,
        secure: true,
        auth: {
          user: "jcarrillo@lmi-int.com",
          pass: "Sistemas2013811"
        }
      });
      await transporter.use('compile', this.hbs({
        viewEngine: {
          extname: '.hbs',
          partialsDir: 'src/views',
          layoutsDir: 'src/views/layouts',
          defaultLayout: 'indexActivarCuenta',
        },
        viewPath: 'src/views',
        extName: '.hbs',
      }));
      const mailOptions = {
        from: this.FROM,
        to: correo,
        subject: 'Posible contacto con persona Positivo para Covid',
        template: 'indexActivarCuenta',
        context: {
          correo: nombre,
          url: 'http://186.4.200.154:3016/reporte/pcr/60994fc563452b19601ecad4',
        },
      };
      const info = await transporter.sendMail(mailOptions);
      return info;
    }
    catch (error) {
    }
  }


}
