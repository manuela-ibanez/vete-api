import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';

@Injectable()
export class UsuariosService {
  constructor(
      @InjectRepository(Usuario)
      private usuarioRepository: Repository<Usuario>,
    ) {} //Inyecta el repositorio de usuarios.
  async create(createUsuarioDto: CreateUsuarioDto) { //Recibe el DTO para crear un usuario.
    try {
        const usuario = this.usuarioRepository.create(createUsuarioDto); //Crea la entidad usuario.
        return await this.usuarioRepository.save(usuario); //Guarda el usuario en la base de datos.
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw new HttpException('No se pudo crear el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    return await this.usuarioRepository.find({ relations: ['mascotas'] }); //Trae todos los usuarios con sus mascotas.
  }

  findOne(id: number) {
    return this.usuarioRepository.findOneBy({id}); //Busca un usuario por su ID.
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.usuarioRepository.update(id, updateUsuarioDto); //Actualiza el usuario con el ID y los datos del DTO.
    const updatedUsuario = await this.usuarioRepository.findOneBy({ id }); //Se obtienen los datos actualizados.
      if (!updatedUsuario) {
        throw new Error(`Usuario with id ${id} not found after update.`);
      }
      return updatedUsuario;
  }

  remove(id: number) {
    return this.usuarioRepository.delete(id); //Elimina el usuario por su ID.
  }
}