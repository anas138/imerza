import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Imerza Auth')
    .setDescription('Imerza Authentication/Authorization Provider')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(resolve('.', 'public'));
  app.setBaseViewsDir(resolve('.', 'views'));
  app.setViewEngine('hbs');
  await app.listen(3000);
 const microServiceOptions={
  transport : Transport.TCP,
  options:{
    host:"127.0.0.1",
    port:8877
  }
 }
  const microservice = await NestFactory.createMicroservice(
    AppModule,
    microServiceOptions
  );
  microservice.listen()
}

bootstrap();
