import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CorreoEntity } from "../entities/correo.entity";

@Injectable()
export class CorreoRepository {
  constructor(@InjectRepository(CorreoEntity) private readonly repository: Repository<CorreoEntity>) {
  }

  insert(crearCorreoDto) {
    return this.repository.insert({
      valor: crearCorreoDto.valor
    });
  }

  select() {
    return this.repository.find();
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}

