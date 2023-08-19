import { NotificacionRetiroEntity } from '../entities/notificacion-retiro.entity';
import { DetalleItemProductoEntity } from '../entities/detalle-item-producto.entity';

export interface CrearNotificacionRetiroDto {
  notificacionRetiro: NotificacionRetiroEntity;
  detallesItem: DetalleItemProductoEntity[];
}
