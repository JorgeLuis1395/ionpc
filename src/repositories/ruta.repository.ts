import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RutaEntity} from "../entities/ruta.entity";

@Injectable()
export class RutaRepository {
  constructor(
    @InjectRepository(RutaEntity)
    private readonly repository: Repository<RutaEntity>,
  ) {
  }

  selectOneByPathAndMetodo(path: string, metodo: string): Promise<RutaEntity | undefined> {
    return this.repository.findOne({
      where: {
        path,
        metodo
      }
    });
  }
}
