import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {TarjaRecepcionVehiculoRepository} from '../repositories/tarja-recepcion-vehiculo.repository';
import {CrearTarjaRecepcionVehiculoDto} from '../dtos/crear-tarja-recepcion-vehiculo.dto';
import {RolGuard} from '../common/guards/rol.guard';
import {extname} from 'path';
import {diskStorage} from 'multer';
import {FilesInterceptor} from '@nestjs/platform-express';

//@UseGuards(RolGuard)
@Controller('tarja-recepcion-vehiculo')
export class TarjaRecepcionVehiculoController {
  readonly PATH_FOTOS = `./img/tarjas`;

  constructor(private tarjaRecepcionVehiculoRepository: TarjaRecepcionVehiculoRepository) {
    const fs = require('fs');
    if (!fs.existsSync(this.PATH_FOTOS)) {
      if (!fs.existsSync('./img')) {
        fs.mkdirSync('./img');
      }
      fs.mkdirSync(this.PATH_FOTOS);
    }
  }

  @Post()
  create(@Body() crearTarjaRecepcionVehiculoDto: CrearTarjaRecepcionVehiculoDto) {
    return this.tarjaRecepcionVehiculoRepository.insert(crearTarjaRecepcionVehiculoDto);
  }

  @Post('mobile')
  createMobile(@Body() crearTarjaRecepcionVehiculoMobileDto: { crearTarjaRecepcionVehiculoDto, fotos: string[] }) {
    return this.tarjaRecepcionVehiculoRepository.insertMobile(crearTarjaRecepcionVehiculoMobileDto);
  }

  @Post('subir-fotos')
  @UseInterceptors(FilesInterceptor('fotos[]', 20, {
    storage: diskStorage({
      destination(req, file, cb) {
        cb(null, './img/tarjas');
      },
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
    limits: {fileSize: 10485760},
  }))
  async subirFotos(@UploadedFiles() files) {
    if (files) {
      return files.map(it => `${it.destination}/${it.filename}`.replace(this.PATH_FOTOS + '/', ''));
    } else {
      throw new HttpException('¡Formato de foto no soportado!', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('notificar/:id')
  postNotificarTarja(@Param('id') id: number) {
    return this.tarjaRecepcionVehiculoRepository.notificarTarja(id);
  }

  @Get()
  async findAll(@Res() response) {
    return response.send(await this.tarjaRecepcionVehiculoRepository.selectAll());
  }

  @Get('datos-edicion/:id')
  getSelectDatosEdicionById(@Param('id') id) {
    return this.tarjaRecepcionVehiculoRepository.selectDatosEdicionById(+id);
  }

  @Get('saldo-item/:id')
  async getSelectSaldoItem(@Param('id') id) {
    return {saldoItem: await this.tarjaRecepcionVehiculoRepository.selectSaldoItem(id)};
  }

  @Get(':id')
  async findOne(@Param('id') id, @Res() response) {
    return response.send(await this.tarjaRecepcionVehiculoRepository.selectById(id));
  }

  @Get('join-all/:id')
  async findOneByIdJoinControlVehiculo(@Param('id') id, @Res() response) {
    return response.send(await this.tarjaRecepcionVehiculoRepository.selectByIdJoinControlVehiculo(id));
  }

  @Get('por-detalle-item-producto-id/:idDetalleItemProducto')
  async findOneTarjaByIdDetalleItemProducto(@Param('idDetalleItemProducto') idDetalleItemProducto, @Res() response) {
    return response.send(await this.tarjaRecepcionVehiculoRepository.selectOneByIdDetalleItemProducto(idDetalleItemProducto));
  }

  @Get('allInformacion/:id')
  async findAllInformation(@Param('id') id, @Res() response) {
    return response.send(await this.tarjaRecepcionVehiculoRepository.selectByIdAllInformation(id));
  }

  @Get('historial/:id')
  getSelectHistorial(@Param('id') id) {
    return this.tarjaRecepcionVehiculoRepository.selectHistorial(id);
  }

  @Get('join-rack-control-vehiculo-control-fisico-foto/:id')
  getSelectJoinRackControlVehiculoControlFisico(@Param('id') id) {
    return this.tarjaRecepcionVehiculoRepository.selectJoinRackControlVehiculoControlFisicoFoto(+id);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() tarjaRecepcionVehiculoDto) {
    return await this.tarjaRecepcionVehiculoRepository.updateAll(id, tarjaRecepcionVehiculoDto);
  }

  @Put('mobile/:id')
  async updateMobile(@Param('id') id, @Body() tarjaRecepcionVehiculoDto) {
    return await this.tarjaRecepcionVehiculoRepository.updateAllMobile(id, tarjaRecepcionVehiculoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.tarjaRecepcionVehiculoRepository.delete(id);
  }
}
