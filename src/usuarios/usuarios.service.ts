import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
      @InjectRepository(Usuario)
      private usuarioRepository: Repository<Usuario>,
    ) {}
  create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = this.usuarioRepository.create(createUsuarioDto);
    return this.usuarioRepository.save(usuario);
  }

  findAll() {
    return this.usuarioRepository.find();
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
