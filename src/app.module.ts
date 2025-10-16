import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnosController } from './turnos/turnos.controller';
import { TurnosService } from './turnos/turnos.service';
import { TurnosModule } from './turnos/turnos.module';

@Module({
  imports: [UsuariosModule, MascotasModule, TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'vete-admin',
      password: 'securepassword1234!',
      database: 'vetedb',
      autoLoadEntities: true,
      synchronize: true,
    }), TurnosModule,],
  controllers: [AppController, TurnosController],
  providers: [AppService, TurnosService],
})
export class AppModule {}
