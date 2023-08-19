import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnalisiscalidadInterface } from '../../interface/analisiscalidad.interface';
import { AnalisisCalidadDto } from '../../dtos/Mongo/analisis-calidad.dto';
import { ImapInterface } from '../../interface/imap.interface';
import { EmailDto } from '../../dtos/Mongo/email.dto';

@Injectable()
export class EmailMongoRepository {
  constructor(@InjectModel('Emails')
  private imapModel: Model<ImapInterface>) {
  }

  async create(EmailDTO: any): Promise<any> {
    const createdCat = new this.imapModel(EmailDTO);
    return await createdCat.save();
  }

  async findAll(): Promise<any> {
    return await this.imapModel.find().exec();
  }

  async findById(id): Promise<ImapInterface> {

    const customer = await this.imapModel.findById(id).exec();
    return customer
  }

  async find(req: string): Promise<any> {
    return await this.imapModel.find({ lote: { $eq: req } }).exec();
  }

  async update(id, EmailDTO: EmailDto): Promise<any> {

    return await this.imapModel.findByIdAndUpdate(id, EmailDTO, { new: true });
  }

  async delete(id): Promise<any> {
    return await this.imapModel.findByIdAndRemove(id);
  }
}
