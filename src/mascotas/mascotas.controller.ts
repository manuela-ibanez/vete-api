import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Post()
    async create(@Body() createMascotaDto: CreateMascotaDto) {
      try {
        const mascota = await this.mascotasService.create(createMascotaDto);
        return { mensaje: 'Mascota creada correctamente', mascota }; // Devuelve un mensaje y el usuario creado.
      } catch (error) {
        throw new HttpException('Error al crear la mascota', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

  @Get()
  findAll() {
    return this.mascotasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const mascota = await this.mascotasService.findOne(+id);
      if (!mascota) {
        throw new HttpException('Mascota no encontrada', HttpStatus.NOT_FOUND);
      }
      return mascota;
    } catch (error) {
      throw new HttpException('Error al obtener la mascota', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMascotaDto: UpdateMascotaDto) {
    try {
      const mascota = await this.mascotasService.findOne(+id);
      if (!mascota) {
        throw new HttpException('Mascota no encontrada', HttpStatus.NOT_FOUND);
      }
      const updatedMascota = await this.mascotasService.update(+id, updateMascotaDto);
      return { mensaje: 'Mascota actualizada correctamente', mascota: updatedMascota };
    } catch (error) {
      throw new HttpException('Error al actualizar la mascota', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const mascota = await this.mascotasService.findOne(+id);
      if (!mascota) {
        throw new HttpException('Mascota no encontrada', HttpStatus.NOT_FOUND);
      }
      await this.mascotasService.remove(+id);
      return { mensaje: 'Mascota eliminada correctamente' };
    } catch (error) {
      throw new HttpException('Error al eliminar la mascota', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}