/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
const fs = require('fs');

export let httpInstance;
async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(
      process.env.PRIVATE_KEY
        ? process.env.PRIVATE_KEY
        : `${__dirname}/ssl_certificate/server.key`,
    ),
    cert: fs.readFileSync(
      process.env.SSL_CERTIFICATE
        ? process.env.SSL_CERTIFICATE
        : `${__dirname}/ssl_certificate/server.crt`,
    ),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
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
  await app.listen(process.env.LISTEN_PORT ? process.env.LISTEN_PORT : '8080');
  app.getHttpServer();
  console.log(
    `\nApp started, look at https://localhost:${
      process.env.LISTEN_PORT ? process.env.LISTEN_PORT : '8080'
    }/swagger-api for the documentation`,
  );
}

bootstrap();
