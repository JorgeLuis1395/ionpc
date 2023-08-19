import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, InsertResult, Repository, UpdateResult} from "typeorm";
import {Injectable} from "@nestjs/common";
import { ExportadorEntity } from '../entities/exportador.entity';

@Injectable()
export class ExportadorRepository {
  constructor(
    @InjectRepository(ExportadorEntity)
    private readonly repository: Repository<ExportadorEntity>,
  ) {
  }

  insert(entity: ExportadorEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<ExportadorEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<ExportadorEntity | undefined> {
    return this.repository.findOne({id});
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
