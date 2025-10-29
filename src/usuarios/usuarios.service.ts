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
    ) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
        const usuario = this.usuarioRepository.create(createUsuarioDto);
        return await this.usuarioRepository.save(usuario);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw new HttpException('No se pudo crear el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    return await this.usuarioRepository.find({ relations: ['mascotas'] });
  }

  findOne(id: number) {
    return this.usuarioRepository.findOneBy({id});
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.usuarioRepository.update(id, updateUsuarioDto);
    const updatedUsuario = await this.usuarioRepository.findOneBy({ id }); // Fetch the updated entity
      if (!updatedUsuario) {
        throw new Error(`Usuario with id ${id} not found after update.`);
      }
      return updatedUsuario;
  }

  remove(id: number) {
    return this.usuarioRepository.delete(id);
  }
}