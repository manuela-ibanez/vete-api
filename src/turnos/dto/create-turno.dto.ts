import { Mascota } from 'src/mascotas/entities/mascota.entity';

export class CreateTurnoDto {
  fecha: Date;
  hora: string;
  mascota: Mascota;
}
