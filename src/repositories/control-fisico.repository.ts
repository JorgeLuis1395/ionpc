import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, InsertResult, Repository, UpdateResult} from "typeorm";
import {Injectable} from "@nestjs/common";
import {ControlFisicoEntity} from "../entities/control-fisico.entity";

@Injectable()
export class ControlFisicoRepository {
  constructor(
    @InjectRepository(ControlFisicoEntity)
    private readonly repository: Repository<ControlFisicoEntity>,
  ) {
  }

  insert(entity: ControlFisicoEntity | ControlFisicoEntity[]): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<ControlFisicoEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<ControlFisicoEntity | undefined> {
    return this.repository.findOne({id});
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
