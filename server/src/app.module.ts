/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { DatabaseService } from './database/database.service';
import { TelegramService } from './telegram/telegram.service';
import { StorageService } from './storage/storage.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [DatabaseService, TelegramService, StorageService],
})
export class AppModule {}
