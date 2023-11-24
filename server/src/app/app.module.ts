/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Module } from '@nestjs/common';
import { FrontendController } from './frontend/frontend.controller';
import { MachineLearningController } from './machineLearning/machineLearning.controller';
import { DatabaseService } from '../database/database.service';
import { TelegramService } from '../telegram/telegram.service';

@Module({
  imports: [],
  controllers: [MachineLearningController, FrontendController],
  providers: [DatabaseService, TelegramService],
})
export class AppModule {}
