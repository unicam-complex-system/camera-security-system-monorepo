/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { DatabaseService } from '../database/database.service';

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [DatabaseService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {});
  });
});
