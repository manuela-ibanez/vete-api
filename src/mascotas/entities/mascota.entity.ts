import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mascota {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    clase: string;

    @Column()
    peso: number;

    @Column()
    edad: number;

    @Column()  // ← AGREGAR ESTO
    usuarioId: number;  // ← AGREGAR ESTO

    @ManyToOne(() => Usuario, (usuario) => usuario.mascotas, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'usuarioId' })  // ← AGREGAR ESTO
    usuario: Usuario;
}