import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ModalidadCamaronEntity } from '../entities/modalidad-camaron.entity';
import { ProductosTranscityEntity } from '../entities/productos-transcity.entity';

@Injectable()
export class ProductoTranscityRepository {
  constructor(
    @InjectRepository(ProductosTranscityEntity)
    private readonly repository: Repository<ProductosTranscityEntity>,
  ) {
  }

  insert(entity: ProductosTranscityEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<ProductosTranscityEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<ProductosTranscityEntity | undefined> {
    return this.repository.findOne({ id });
  }


  selectByLote(lote: string): Promise<any> {
   // return this.repository.query('select * from "productosTranscity" where lote = ' + "'" + lote + "'");
    return this.repository.find({
      where: {
        lote: lote,
    
      },
    });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
