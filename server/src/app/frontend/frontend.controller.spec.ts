/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Test, TestingModule } from '@nestjs/testing';
import { FrontendController } from './frontend.controller';
import { DatabaseService } from '../../database/database.service';
import { TelegramService } from '../../telegram/telegram.service';

describe("FrontendController", () => {
  let controller: FrontendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrontendController],
      providers: [DatabaseService, TelegramService],
    }).compile();

    controller = module.get<FrontendController>(FrontendController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
