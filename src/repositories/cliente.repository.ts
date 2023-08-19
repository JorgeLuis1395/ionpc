import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, InsertResult, Repository, UpdateResult} from "typeorm";
import {ClienteEntity} from "../entities/cliente.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ClienteRepository {
  constructor(
    @InjectRepository(ClienteEntity)
    private readonly repository: Repository<ClienteEntity>,
  ) {
  }

  insert(entity: ClienteEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<ClienteEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<ClienteEntity | undefined> {
    return this.repository.findOne({id});
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}