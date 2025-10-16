import { Injectable } from '@nestjs/common';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mascota } from 'src/mascotas/entities/mascota.entity';
import { Repository } from 'typeorm';
import { Turno } from './entities/turno.entity';

@Injectable()
export class TurnosService {
  constructor(
    @InjectRepository(Turno)
    private turnosRepository: Repository<Turno>,

    @InjectRepository(Mascota)
    private mascotasRepository: Repository<Mascota>,
    ) {} // Inyecta el repositorio de Mascota.


  create(createTurnoDto: CreateTurnoDto) {
    const turno = this.turnosRepository.create(createTurnoDto);
    return this.turnosRepository.save(turno);
  }

  findAll() {
    return this.turnosRepository.find({ relations: ['mascota'] });
  }


  findOne(id: number) {
    return this.turnosRepository.findOneBy({id});
  }

  async update(id: number, updateTurnoDto: Partial<Turno>): Promise<Turno> {
    await this.turnosRepository.update(id, updateTurnoDto);
    const updatedTurno = await this.turnosRepository.findOneBy({ id }); // Fetch the updated entity
    if (!updatedTurno) {
      throw new Error(`Turno with id ${id} not found after update.`);
    }
    return updatedTurno;
  }

  async remove(id: number) {
    await this.turnosRepository.delete(id);
  }
}
