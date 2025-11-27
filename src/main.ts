import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //HABILITAR CORS PARA QUE ANGULAR PUEDA CONECTARSE
  app.enableCors({
    origin: 'http://localhost:4200', // AQUI ESTA CORRIENDO ANGULAR
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3000)
}
bootstrap();
