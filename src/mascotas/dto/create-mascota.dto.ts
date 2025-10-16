import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Turno } from "src/turnos/entities/turno.entity";

export class CreateMascotaDto {
    nombre: string;
    clase: string;
    peso: number;
    edad: number;
    usuario?: Usuario;
    turno?: Turno [];
}
