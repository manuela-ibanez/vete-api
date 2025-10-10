import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mascota {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string
    @Column()
    clase: string;
    @Column()
    peso: number;
    @Column()
    edad: number;
    @ManyToOne(() => Usuario, (usuario) => usuario.mascotas, {onDelete: 'CASCADE'})
    usuario: Usuario;
}
