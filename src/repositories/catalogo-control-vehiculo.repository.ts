import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, InsertResult, Repository, UpdateResult} from "typeorm";
import {Injectable} from "@nestjs/common";
import {CatalogoControlVehiculoEntity} from "../entities/catalogo-control-vehiculo.entity";

@Injectable()
export class CatalogoControlVehiculoRepository {
  constructor(
    @InjectRepository(CatalogoControlVehiculoEntity)
    private readonly repository: Repository<CatalogoControlVehiculoEntity>,
  ) {
  }

  insert(entity: CatalogoControlVehiculoEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<CatalogoControlVehiculoEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<CatalogoControlVehiculoEntity | undefined> {
    return this.repository.findOne({id});
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
