import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, InsertResult, Repository, UpdateResult} from "typeorm";
import {Injectable} from "@nestjs/common";
import {CatalogoControlFisicoEntity} from "../entities/catalogo-control-fisico.entity";

@Injectable()
export class CatalogoControlFisicoRepository {
  constructor(
    @InjectRepository(CatalogoControlFisicoEntity)
    private readonly repository: Repository<CatalogoControlFisicoEntity>,
  ) {
  }

  insert(entity: CatalogoControlFisicoEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<CatalogoControlFisicoEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<CatalogoControlFisicoEntity | undefined> {
    return this.repository.findOne({id});
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
