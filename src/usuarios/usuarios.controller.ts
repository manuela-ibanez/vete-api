import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      const usuario = await this.usuariosService.create(createUsuarioDto);
      return { mensaje: 'Usuario creado correctamente', usuario }; // Devuelve un mensaje y el usuario creado.
    } catch (error) {
      throw new HttpException('Error al crear el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const usuario = await this.usuariosService.findOne(+id);
      if (!usuario) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      return usuario;
    } catch (error) {
      throw new HttpException('Error al obtener el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    try {
      const usuario = await this.usuariosService.findOne(+id);
      if (!usuario) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      const updatedUsuario = await this.usuariosService.update(+id, updateUsuarioDto);
      return { mensaje: 'Usuario actualizado correctamente', usuario: updatedUsuario };
    } catch (error) {
      throw new HttpException('Error al actualizar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const usuario = await this.usuariosService.findOne(+id);
      if (!usuario) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      await this.usuariosService.remove(+id);
      return { mensaje: 'Usuario eliminado correctamente' };
    } catch (error) {
      throw new HttpException('Error al eliminar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
