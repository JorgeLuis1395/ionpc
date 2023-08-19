import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, InsertResult, Repository, UpdateResult} from 'typeorm';
import {ProductoEntity} from '../entities/producto.entity';
import {Injectable} from '@nestjs/common';

@Injectable()
export class ProductoRepository {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly repository: Repository<ProductoEntity>,
  ) {
  }

  insert(entity: ProductoEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<ProductoEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<ProductoEntity | undefined> {
    return this.repository.findOne({id});
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
