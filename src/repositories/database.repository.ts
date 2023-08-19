import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { DatabaseEntity } from '../entities/database.entity';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseRepository {
  constructor(
    @InjectRepository(DatabaseEntity) private readonly repository: Repository<DatabaseEntity>,
  ) {
  }

  async insert(entity: DatabaseEntity): Promise<InsertResult> {
    const database = await this.selectByName(entity.database);

    if (database) {
      throw new BadRequestException({
        mensaje: `¡La base de datos ${entity.database} ya se encuentra registrada, por favor intente con otro!`,
      });
    } else {
      return this.repository.insert(entity);
    }
  }

  async selectAll(): Promise<DatabaseEntity[]> {
    return await this.repository.find();
  }

  async selectById(id: number): Promise<DatabaseEntity | undefined> {
    return await this.repository.findOne({id});
  }

  selectByName(database: string): Promise<DatabaseEntity | undefined> {
    return this.repository.findOne({ database });
  }

  selectJoinTipoDatabase() {
    return this.repository.find({
      select: ['id', 'descripcion', 'database'],
      relations: ['tipoDatabase'],
    });
  }

  async update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id)
  }
}
