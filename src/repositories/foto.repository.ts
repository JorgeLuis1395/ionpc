import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FotoEntity} from "../entities/foto.entity";
import {InsertResult, Repository, UpdateResult} from "typeorm";

@Injectable()
export class FotoRepository {
  constructor(@InjectRepository(FotoEntity) private readonly repository: Repository<FotoEntity>) {
  }

  insert(fotoEntity: FotoEntity | FotoEntity[]): Promise<InsertResult> {
    return this.repository.insert(fotoEntity);
  }

  selectByIdTarjaRecepcionVehiculo(idTarjaRecepcionVehiculo: number): Promise<FotoEntity[]> {
    return this.repository.find({where: {tarjaRecepcionVehiculoId: idTarjaRecepcionVehiculo}})
  }

  update(id, atributos: Partial<FotoEntity>): Promise<UpdateResult> {
    return this.repository.update(id, atributos);
  }
}
