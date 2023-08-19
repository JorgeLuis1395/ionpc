import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards} from '@nestjs/common';
import {ModalidadPescadoRepository} from "../../repositories/modalidad-pescado.repository";


@Controller('modalidadpescado')
export class ModalidadPescadoController {
    constructor(private modalidadPescadoRepository: ModalidadPescadoRepository) {
    }

    @Post()
    create(@Body() modalidadPescadoDto) {

        return this.modalidadPescadoRepository.insert(modalidadPescadoDto);
    }

    @Get()
    async findAll(@Res() response) {
        return response.send(await this.modalidadPescadoRepository.selectAll());
    }

    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this.modalidadPescadoRepository.selectById(id));
    }

    @Put(':id')
    async update(@Param('id') id, @Body() nuevo) {
        return await this.modalidadPescadoRepository.update(id, nuevo);
    }

    @Delete(':id')
    async remove(@Param('id') id) {
        return await this.modalidadPescadoRepository.delete(id);
    }
}
