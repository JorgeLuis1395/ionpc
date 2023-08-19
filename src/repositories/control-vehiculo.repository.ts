import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, InsertResult, Repository, UpdateResult} from "typeorm";
import {Injectable} from "@nestjs/common";
import {ControlVehiculoEntity} from "../entities/control-vehiculo.entity";

@Injectable()
export class ControlVehiculoRepository {
  constructor(
    @InjectRepository(ControlVehiculoEntity)
    private readonly repository: Repository<ControlVehiculoEntity>,
  ) {
  }

  insert(entity: ControlVehiculoEntity | ControlVehiculoEntity[]): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<ControlVehiculoEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<ControlVehiculoEntity | undefined> {
    return this.repository.findOne({id});
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
