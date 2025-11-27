export class CreateUsuarioDto {
    nombre: string;
    email: string;
    apellido: string;
    mascotas?: Array<{  // ← Cambiar a objetos simples
        nombre: string;
        clase: string;
        peso: number;
        edad: number;
    }>;
}