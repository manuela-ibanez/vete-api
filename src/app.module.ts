import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [UsuariosModule, MascotasModule, TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL ??
      'postgress://postgress:postgress@localhost:5432',
      host: 'localhost',
      port: 5432,
      username: 'vete-admin',
      password: 'securepassword1234!',
      database: 'vetedb',
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.DATABASE_SSL === 'true' ? true : false,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}