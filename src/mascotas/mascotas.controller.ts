import { Controller, Get, Post, Body, Param, Delete, HttpStatus, HttpException, Put} from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Post()
    async create(@Body() createMascotaDto: CreateMascotaDto) { //Async hace que el metodo sea asincronico.
      try {
        const mascota = await this.mascotasService.create(createMascotaDto); //Llama al serivice para crear la mascota.
        return { mensaje: 'Mascota creada correctamente', mascota }; // Devuelve un mensaje y la mascota creada.
      } catch (error) {
        throw new HttpException('Error al crear la mascota', HttpStatus.BAD_REQUEST); //Devuelve un error.
      }
    }

  @Get()
  findAll() {
    return this.mascotasService.findAll(); //Llama al service para obtener todas las mascotas.
  }

  @Get(':id')
  async findOne(@Param('id') id: string) { //Extrae el parametro ID de la URL.
      const mascota = await this.mascotasService.findOne(+id); //Llama al service para obtener una mascota por su ID.
      if (!mascota) {
        throw new HttpException('Mascota no encontrada', HttpStatus.NOT_FOUND);
      }
      return mascota;
  }

@Put(':id')
  async update(@Param('id') id: string, @Body() updateMascotaDto: UpdateMascotaDto) {
    try {
      // Extraer el ID del usuario si se envía como un objeto.
      if (updateMascotaDto.usuario && typeof updateMascotaDto.usuario === 'object' && (updateMascotaDto.usuario as any).id) {
        // Asignar el id extraído sin provocar error de tipos TypeScript.
        updateMascotaDto.usuario = (updateMascotaDto.usuario as any).id; //Usar 'as any' para evitar error de tipos TypeScript.
      }

      const mascota = await this.mascotasService.findOne(+id); //+id convierte el string a numero.
      if (!mascota) {
        throw new HttpException('Mascota no encontrada', HttpStatus.NOT_FOUND);
      }
      await this.mascotasService.update(+id, updateMascotaDto); //Consulta al service para devolver los datos actualizados.
      const updatedMascota = await this.mascotasService.findOne(+id); // Consultar los datos actualizados
      return { mensaje: 'Mascota actualizada correctamente', usuario: updatedMascota };
    } catch (error) {
      console.error('Error al actualizar la mascota:', error); // Registro del error.
      throw new HttpException('Error al actualizar la mascota', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
      const mascota = await this.mascotasService.findOne(+id); //Verifica si la mascota existe antes de eliminarla.
      if (!mascota) {
        throw new HttpException('Mascota no encontrada', HttpStatus.NOT_FOUND);
      }
      await this.mascotasService.remove(+id); //Llama al service para eliminar la mascota.
      return { mensaje: 'Mascota eliminada correctamente' };
  }
}