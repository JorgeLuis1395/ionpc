import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { CatalogoEntity } from '../entities/catalogo.entity';

@Injectable()
export class CatalogoService {
  insert(entity: CatalogoEntity): any {
    return getManager().insert(CatalogoEntity, entity);
  }

  selectAll() {
    return getManager().find(CatalogoEntity);
  }

  selectById(id: number) {
    return getManager().findOne(CatalogoEntity, {
      id: id,
    });
  }

  update(id: number, newEntity: CatalogoEntity): any {
    return getManager().update(CatalogoEntity, id, newEntity);
  }

  delete(id: number): any {
    return getManager().delete(CatalogoEntity, id);
  }
}
