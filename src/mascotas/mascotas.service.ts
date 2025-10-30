import { Injectable } from '@nestjs/common';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mascota } from './entities/mascota.entity';

@Injectable()
export class MascotasService {
  constructor( //Inyecta el repositorio de mascotas.
    @InjectRepository(Mascota)
    private mascotasRepository: Repository<Mascota>,
  ) {}
  
  create(createMascotaDto: CreateMascotaDto) { //Recibe el DTO para crear una mascota.
    const mascota = this.mascotasRepository.create(createMascotaDto);  
    return this.mascotasRepository.save(mascota); //Guarda la mascota en la base de datos.
  }

  findAll() :Promise<Mascota[]> { //Cuando lo devuelve devuelve un array de mascotas.
    return this.mascotasRepository.find({ relations: ['usuario'] }); //Le dice que tambien traiga la relacion con usuario.
  }

  findOne(id: number): Promise<Mascota | null> {
    return this.mascotasRepository.findOneBy({id});
  }
  
  async update(id: number, updateMascotaDto: Partial<Mascota>): Promise<Mascota> {
    await this.mascotasRepository.update(id, updateMascotaDto); //Actualiza la mascota con el ID y los datos del DTO.
    const updatedMascota = await this.mascotasRepository.findOneBy({ id }); //Se obtienen los datos actualizados.
    if (!updatedMascota) {
      throw new Error(`Mascota with id ${id} not found after update.`);
    }
    return updatedMascota;
  }

  async remove(id: number) { //Elimina la mascota por su ID.
    await this.mascotasRepository.delete(id);
  }
}