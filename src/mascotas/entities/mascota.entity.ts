import { Turno } from 'src/turnos/entities/turno.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToOne(() => Usuario, (usuario) => usuario.mascotas, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;

  @OneToMany(() => Turno, (turno) => turno.mascota)
  turnos: Turno[];
}
