import { Injectable } from '@nestjs/common';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mascota } from './entities/mascota.entity';

@Injectable()
export class MascotasService {
  constructor(
    @InjectRepository(Mascota)
    private mascotasRepository: Repository<Mascota>,
  ) {}
  
  create(createMascotaDto: CreateMascotaDto) {
    const mascota = this.mascotasRepository.create(createMascotaDto);
    return this.mascotasRepository.save(mascota);
  }

  findAll() :Promise<Mascota[]> {
    return this.mascotasRepository.find({ relations: ['usuario'] });
  }

  findOne(id: number): Promise<Mascota | null> {
    return this.mascotasRepository.findOneBy({id});
  }
  
  async update(id: number, updateMascotaDto: Partial<Mascota>): Promise<Mascota> {
    await this.mascotasRepository.update(id, updateMascotaDto);
    const updatedMascota = await this.mascotasRepository.findOneBy({ id }); // Fetch the updated entity
    if (!updatedMascota) {
      throw new Error(`Mascota with id ${id} not found after update.`);
    }
    return updatedMascota;
  }

  async remove(id: number) {
    await this.mascotasRepository.delete(id);
  }
}
