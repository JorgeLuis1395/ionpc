import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UbicacionUsuarioSchema } from '../schema/ubicación_usuario.schema';
import { UsuarioUbicacionController } from '../controllers/mongo/usuario-ubicacion.controller';
import { UsuarioUbicacionRepository } from '../repositories/mongo/usuario-ubicacion.repository';

@Module({
  imports: [MongooseModule.forFeature([ { name: 'UbicacionUsuario', schema: UbicacionUsuarioSchema }])],
  controllers: [UsuarioUbicacionController],
  providers: [UsuarioUbicacionRepository],
})
export class UsuarioUbicacionModule {
}
