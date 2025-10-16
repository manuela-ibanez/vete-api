import { Mascota } from "src/mascotas/entities/mascota.entity";

export class CreateTurnoDto {
    id: number;
    fecha: Date;
    hora: string;
    mascota: Mascota;
}
