import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ActualizarPasswordDto } from '../dtos/update/actualizar-password.dto';
import { RolGuard } from '../common/guards/rol.guard';
import { UsuarioRepository } from '../repositories/usuario.repository';

@Controller('login')
export class LoginUsuarioController {

  constructor(
    private readonly loginRepository: UsuarioRepository,
  ) {
  }


  @Post('change_password')
  changePassword(@Body() cambiarPassword: ActualizarPasswordDto) {
    return this.loginRepository.changeOldPassword(cambiarPassword);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() nuevo) {
    return await this.loginRepository.update(id, nuevo);
  }

}
