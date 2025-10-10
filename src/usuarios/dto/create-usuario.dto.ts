import { Mascota } from "src/mascotas/entities/mascota.entity";

export class CreateUsuarioDto {
    nombre: string;
    email: string
    apellido: string;
    mascotas?: Mascota[];
}
