import { Controller, Get, UseGuards } from '@nestjs/common';
import { PermisoRepository } from '../repositories/permiso.repository';
import { RolGuard } from '../common/guards/rol.guard';

//@UseGuards(RolGuard)
@Controller('permiso')
export class PermisoController {
  constructor(private permisoRepository: PermisoRepository) {
  }

  @Get()
  getAll() {
    return this.permisoRepository.selectAll();
  }
}
