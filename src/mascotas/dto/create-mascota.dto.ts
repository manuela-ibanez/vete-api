import { Usuario } from "src/usuarios/entities/usuario.entity";

export class CreateMascotaDto {
    nombre: string;
    clase: string;
    peso: number;
    edad: number;
    usuario?: Usuario;
}
