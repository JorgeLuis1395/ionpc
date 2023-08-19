import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { MapaEntity } from '../entities/mapa.entity';

@Injectable()
export class MapaService {
  insert(entity: MapaEntity): any {
    return getManager().insert(MapaEntity, entity);
  }

  selectAll() {
    return getManager().find(MapaEntity);
  }

  selectById(id: number) {
    return getManager().findOne(MapaEntity, {
      id: id,
    });
  }

  update(id: number, newEntity: MapaEntity): any {
    return getManager().update(MapaEntity, id, newEntity);
  }

  delete(id: number): any {
    return getManager().delete(MapaEntity, id);
  }
}
