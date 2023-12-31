/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MachineLearningController } from './app/machineLearning/machineLearning.controller';
import { FrontendController } from './app/frontend/frontend.controller';
import { DatabaseService } from './database/database.service';
import { TelegramService } from './telegram/telegram.service';
import { LoginController } from './app/login.controller';
import { CameraStreamGateway } from './cameraStream/cameraStream.gateway';
import { LoginService } from './login/login.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      // FIXME Error: Payload as string is not allowed with the following sign options: expiresIn
      // signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [MachineLearningController, FrontendController, LoginController],
  providers: [
    DatabaseService,
    TelegramService,
    CameraStreamGateway,
    LoginService,
  ],
  exports: [DatabaseService, TelegramService],
})
export class AppModule {}
