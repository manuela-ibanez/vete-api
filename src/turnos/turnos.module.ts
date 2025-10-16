import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnosService } from './turnos.service';
import { TurnosController } from './turnos.controller';
import { Turno } from './entities/turno.entity';
import { Mascota } from 'src/mascotas/entities/mascota.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Turno, Mascota]) // <-- Importá las entidades que vas a usar
  ],
  controllers: [TurnosController],
  providers: [TurnosService],
})
export class TurnosModule {}