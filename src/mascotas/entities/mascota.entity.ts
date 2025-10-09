import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
