/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { initiateCameraStream } from './cameraStream/cameraStream';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useWebSocketAdapter(new WsAdapter(app));
  app.useWebSocketAdapter(new IoAdapter(app));

  const config = new DocumentBuilder()
    .setTitle('Complex System Design')
    .setVersion('1.0')
    .setDescription('The backend API description')
    .addServer('', 'localhost')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter your JWT token',
        in: 'header',
      },
      'CSS-Auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-api', app, document);

  app.enableCors({ origin: true });
  await app.listen(8080);

  console.log(
    '\nApp started, look at http://localhost:8080/swagger-api for the documentation',
  );

  initiateCameraStream();
}

bootstrap();

