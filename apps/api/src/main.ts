import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {

   const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Imerza API Gateway')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'openIdConnect',
        openIdConnectUrl:
          'http://localhost:3000/.well-known/openid-configuration',
      },
      'auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();

  await app.listen(process.env.PORT);
}

bootstrap();
