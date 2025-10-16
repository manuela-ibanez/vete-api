import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Post()
  async create(@Body() createMascotaDto: CreateMascotaDto) {
    try {
      return await this.mascotasService.create(createMascotaDto);
    } catch (error) {
      this.handleError(error, 'Error al crear la mascota');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.mascotasService.findAll();
    } catch (error) {
      this.handleError(error, 'Error al obtener la lista de mascotas');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const mascota = await this.mascotasService.findOne(+id);
      if (mascota == null) {
        throw new HttpException('Mascota no encontrada', HttpStatus.NOT_FOUND);
      }
      return mascota;
    } catch (error) {
      this.handleError(error, 'Error al obtener la mascota');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMascotaDto: UpdateMascotaDto) {
    try {
      const mascota = await this.mascotasService.findOne(+id);
      if (mascota == null) {
        throw new HttpException('Mascota no encontrada', HttpStatus.NOT_FOUND);
      }
      return await this.mascotasService.update(+id, updateMascotaDto);
    } catch (error) {
      this.handleError(error, 'Error al actualizar la mascota');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const mascota = await this.mascotasService.findOne(+id);
      if (mascota == null) {
        throw new HttpException('Mascota no encontrada', HttpStatus.NOT_FOUND);
      }
      await this.mascotasService.remove(+id);
      return { mensaje: 'Mascota eliminada correctamente' };
    } catch (error) {
      this.handleError(error, 'Error al eliminar la mascota');
    }
  }

  private handleError(error: unknown, defaultMessage: string): never {
    if (error instanceof HttpException) {
      throw error;
    }

    if (error instanceof Error && error.message.toLowerCase().includes('not found')) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }

    throw new HttpException(defaultMessage, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
