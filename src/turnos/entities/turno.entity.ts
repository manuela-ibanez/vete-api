import { Mascota } from 'src/mascotas/entities/mascota.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Turno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column()
  hora: string;

  @ManyToOne(() => Mascota, (mascota) => mascota.turnos, {
    onDelete: 'CASCADE',
  })
  mascota: Mascota;
}
