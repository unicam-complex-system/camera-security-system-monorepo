/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle("Complex System Design")
    .setVersion("1.0")
    .setDescription("The backend API description")
    .addServer("", "localhost")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter your JWT token",
        in: "header",
      },
      "CSS-Auth",
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-api', app, document);

  await app.listen(3000);

  console.log("\nApp started, look at http://localhost:3000/swagger-api for the documentation")
}
bootstrap();
