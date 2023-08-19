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
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {RolGuard} from '../common/guards/rol.guard';
import {extname} from 'path';
import {diskStorage} from 'multer';
import {CrearUsuarioDto} from '../dtos/crear-usuario.dto';
import {JwtService} from '../services/jwt.service';
import {FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import {UsuarioRepository} from '../repositories/usuario.repository';
import {Helper} from '../helper';

//@UseGuards(RolGuard)
@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuarioRepository: UsuarioRepository) {
    }

    @Post()
    create(@Body() crearUsuarioDto: any) {
        return this.usuarioRepository.insert(crearUsuarioDto);
    }

    @Get()
    async findAll(@Res() response) {
        return response.send(await this.usuarioRepository.selectAll());
    }

    @Get(':nick')
    async findOneNick(@Param('nick') nick, @Res() response) {
        return response.send(await this.usuarioRepository.selectByNick(nick));
    }

    @Get('logueado/user')
    async findLogueado(@Res() response) {
        return response.send(await this.usuarioRepository.selectByLogueado());
    }

    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        const usuarioEntity = await this.usuarioRepository.selectById(id);
        delete usuarioEntity.password;
        return response.send(usuarioEntity);
    }

    @Put(':id')
    async update(@Param('id') id, @Body() nuevo) {
        return await this.usuarioRepository.update(id, nuevo);
    }

    @Delete(':id')
    async remove(@Param('id') id) {
        return await this.usuarioRepository.delete(id);
    }

    /**
     * Permite cargar imágenes de hasta 10MB dentro del directorio de uploads de cada usuario.
     * @param file
     * @returns {Promise<void>}
     * @author Darwin Guzmán
     * @version 0.0
     */
    @Post('upload-image')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination(req, file, cb) {
                // @ts-ignore
                const token = req.headers.authorization.replace('Bearer ', '');
                const tokenValue = new JwtService().verificarTokenSync(token);

                const fs = require('fs');
                const dir = `./public/users/`;
                console.log(dir);
                if (!fs.existsSync('./public')) {
                    fs.mkdirSync('./public');
                    fs.mkdirSync('./public/users/');
                    fs.mkdirSync(dir);
                } else if (!fs.existsSync('./public/users/')) {
                    fs.mkdirSync('./public/users/');
                    fs.mkdirSync(dir);
                } else if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                } else {
                    // console.log('¡Directorio creado anteriormente!')
                }
                cb(null, dir);
            },
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
        limits: {fileSize: 10485760},
        fileFilter: function fileFilter(req, file, cb) {
            const filetypes = /jpeg|jpg/;
            const mimetype = filetypes.test(file.mimetype);
            const extname2 = filetypes.test(extname(file.originalname).toLowerCase());

            if (mimetype && extname2) {
                return cb(null, true);
            } else {
                // cb(new Error('¡Formato de imagen no soportado!'), false);
                cb(null, false);
            }
        },
    }))
    async uploadImage(@UploadedFile() file) {
        console.log(file);
        if (file) {

            return {
                response: '¡Imagen guardada con éxito!',
                imagePath: `${file.destination}/${file.filename}`.replace('./public/users/', ''),
            };

        } else {
            throw new HttpException('¡Formato de imagen no soportado!', HttpStatus.BAD_REQUEST);
        }
    }

    /* Guardar Video */
    @Post('upload')
    @UseInterceptors(FilesInterceptor('files', 2, {
        storage: diskStorage({
            destination: Helper.destinationPathVacunas,
            filename: Helper.customFileNameVacunas,
        }),
    }))
    async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
        console.log(files)
        // return await this.appService.saveFile(files);
    }

}
