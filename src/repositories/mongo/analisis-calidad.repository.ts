import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnalisiscalidadInterface } from '../../interface/analisiscalidad.interface';
import { AnalisisCalidadDto } from '../../dtos/Mongo/analisis-calidad.dto';

@Injectable()
export class AnalisisCalidadRepository {
  constructor(@InjectModel('AnalisisCalidad')
  private analisisCalidadModel: Model<AnalisiscalidadInterface>) {
  }

  async create(CrearIncidenteDTO: AnalisisCalidadDto): Promise<any> {
    const createdCat = new this.analisisCalidadModel(CrearIncidenteDTO);
    return createdCat.save();
  }

  async findAll(): Promise<any> {
    return await this.analisisCalidadModel.find().exec();
  }

  async findById(id): Promise<AnalisiscalidadInterface> {

    const customer = await this.analisisCalidadModel.findById(id).exec();
    return customer
  }

  async find(req: string): Promise<any> {
    return await this.analisisCalidadModel.find({ lote: { $eq: req } }).exec();
  }

  async seleccionarPorEventoPadre(evento: any): Promise<any> {

    return await this.analisisCalidadModel
      .find({ evento_padre: { $eq: evento } }).exec();
  }

  async update(id, CrearIncidenteDTO: AnalisisCalidadDto): Promise<any> {

    return await this.analisisCalidadModel.findByIdAndUpdate(id, CrearIncidenteDTO, { new: true });
  }

  async delete(id): Promise<any> {
    return await this.analisisCalidadModel.findByIdAndRemove(id);
  }
}
