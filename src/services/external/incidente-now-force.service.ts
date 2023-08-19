import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IncidenteNowForce, IncidenteNowForceDocument } from '../../entities/incidente-now-force.entity';

@Injectable()
export class IncidenteNowForceService {

  constructor(@InjectModel('DatosIncidente') private incidenteNowForceDocumentModel: Model<any>) {
  }

  insertar(incidenteNowForce: IncidenteNowForce): Promise<IncidenteNowForce> {
    console.log('Inserto')
    const incidenteNowForceCreado = new this.incidenteNowForceDocumentModel(incidenteNowForce);
    return incidenteNowForceCreado.save();
  }

  actualizarPorIdNowForce(idNowForce: string, incidenteNowForce: IncidenteNowForce): Promise<any> {
    console.log('Actualizo 1', idNowForce)
    // @ts-ignore
    return this.incidenteNowForceDocumentModel.findOneAndUpdate({ id: idNowForce }, incidenteNowForce).exec();
  }

  seleccionarTodos(): Promise<IncidenteNowForce[]> {
    return this.incidenteNowForceDocumentModel.find().exec();
  }

  seleccionarPorIdNowForce(id: string): Promise<IncidenteNowForce> {
    return this.incidenteNowForceDocumentModel.findOne({ id }).exec();
  }

  seleccionarPorFechas(fechaHoraInicio: Date, fechaHoraFin: Date): Promise<IncidenteNowForce[]> {
    return this.incidenteNowForceDocumentModel
        .find({ $and: [{ Fecha: { $lte: fechaHoraFin } }, { Fecha: { $gte: fechaHoraInicio } }] })
        .exec();
  }
}
