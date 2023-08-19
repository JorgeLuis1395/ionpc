import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IncidenteDataInterface } from '../../interface/incidente-data.interface';
import { CreateIncidenteDTO } from '../../dtos/Mongo/crear-inicidente.dto';

@Injectable()
export class IncidenteDataRepository {
  constructor(@InjectModel('IncidenteData')
              private incidenteModel: Model<IncidenteDataInterface>) {
  }

  async create(CrearIncidenteDTO: CreateIncidenteDTO): Promise<any> {
    const createdCat = new this.incidenteModel(CrearIncidenteDTO);
    return createdCat.save();
  }

  async findAll(): Promise<any> {
    return await this.incidenteModel.find().exec();
  }

  async findById(id): Promise<IncidenteDataInterface> {

    const customer = await this.incidenteModel.findById(id).exec();
    return customer;
  }

  async find(req: string): Promise<any> {
    return await this.incidenteModel.find({ estado_incidente: { $eq: req } }).exec();
  }

  async seleccionarPorEventoPadre(evento: any): Promise<any> {

    return await this.incidenteModel
      .find({ evento_padre: { $eq: evento } }).exec();
  }

  async update(id, CrearIncidenteDTO: CreateIncidenteDTO): Promise<any> {

    return await this.incidenteModel.findByIdAndUpdate(id, CrearIncidenteDTO, { new: true });
  }

  async delete(id): Promise<any> {
    return await this.incidenteModel.findByIdAndRemove(id);
  }

  seleccionarPorFechasCreacion(fechaHoraInicio: Date, fechaHoraFin: Date): Promise<any> {
    return this.incidenteModel
      .find({ $and: [{ fecha_creacion: { $lte: fechaHoraFin } }, { fecha_creacion: { $gte: fechaHoraInicio } }] })
      .exec();
  }

  seleccionarPorUsuarioTipoEntrada(usuario: any): Promise<any> {
    let aux = parseInt(usuario.toString());
    return this.incidenteModel
      .find({ 'usuariosEntrada.id': aux }).exec();
  }

  seleccionarPorUsuarioTipoSalida(usuario: any): Promise<any> {
    let aux = parseInt(usuario.toString());
    return this.incidenteModel
      .find({ 'usuariosSalida.id': aux }).exec();
  }


  seleccionarPorUsuarioTipoEntradaEstado(usuario: any): Promise<any> {
    let aux = parseInt(usuario.toString());
    return this.incidenteModel
      .find({ $and: [{ 'usuariosEntrada.id': aux }, { 'usuariosEntrada.estado': 'false' }] }).exec();
  }

  DatosPruebaPcrPorIdUsuarios(fechaHoraInicio: Date, fechaHoraFin: Date, usuario: any): Promise<any> {
    let aux = parseInt(usuario.toString());
    return this.incidenteModel
      .find({
        $and: [{
          $and: [{ fecha_creacion: { $lte: fechaHoraFin } }, { fecha_creacion: { $gte: fechaHoraInicio } }],
        },
          { id_usuario_pcr: { $eq: aux } }],
      })
      .exec();
  }

  ResultadoPruebaVepidemiologicaPorIdUsuarios(fechaHoraInicio: Date, fechaHoraFin: Date, usuario: any): Promise<any> {
    let aux = parseInt(usuario.toString());
    return this.incidenteModel
      .find({
        $and: [{
          $and: [{ fecha_creacion: { $lte: fechaHoraFin } }, { fecha_creacion: { $gte: fechaHoraInicio } }],
        },
          { id_usuario_vepidemiologica: { $eq: aux } }],
      })
      .exec();
  }


  seleccionarPorUsuarioEstadoAbiertoEntrada(usuario: any): Promise<any> {
    let aux = parseInt(usuario.toString());
    return this.incidenteModel
      .find({ $or: [{ $and: [{ 'usuariosSalida.id': aux }, { 'estado_incidente': 'Abierto' }] }, { $and: [{ 'usuariosEntrada.id': aux }, { 'estado_incidente': 'Abierto' }] }] },
      ).exec();
  }


  seleccionarPorUsuarioTipoSalidaEstado(usuario: any): Promise<any> {

    let aux = parseInt(usuario.toString());
    return this.incidenteModel
      .find({ $and: [{ 'usuariosSalida.id': aux }, { 'usuariosSalida.estado': 'false' }] }).exec();
  }

  seleccionarPorFechasCreacionTipo(fechaHoraInicio: Date, fechaHoraFin: Date, tipo: string): Promise<any> {
    return this.incidenteModel
      .find({
        $and: [{
          $and: [{ fecha_creacion: { $lte: fechaHoraFin } }, { fecha_creacion: { $gte: fechaHoraInicio } }],
        },
          { estado_incidente: { $eq: tipo } }],
      })
      .exec();
  }


  seleccionarPorFechasActualizacion(fechaHoraInicio: Date, fechaHoraFin: Date): Promise<any> {
    return this.incidenteModel
      .find({ $and: [{ fecha_actualizacion: { $lte: fechaHoraFin } }, { fecha_actualizacion: { $gte: fechaHoraInicio } }] })
      .exec();
  }


  async generarConsulta(consulta: any): Promise<any> {
    console.log(consulta);
    //return createdCat.save();
  }


}
