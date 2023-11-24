/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { DatabaseService } from './database/database.service';
import { TelegramService } from './telegram/telegram.service';
import { FrontendController } from './frontend/frontend.controller';

@Module({
  imports: [],
  controllers: [AppController, FrontendController],
  providers: [DatabaseService, TelegramService],
})
export class AppModule {}
