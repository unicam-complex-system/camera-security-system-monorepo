/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Test, TestingModule } from '@nestjs/testing';
import { FrontendController } from './frontend.controller';
import { DatabaseService } from '../../database/database.service';
import { JwtModule } from '@nestjs/jwt';

describe("FrontendController", () => {
  let controller: FrontendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
        }),
      ],
      controllers: [FrontendController],
      providers: [DatabaseService],
    }).compile();

    controller = module.get<FrontendController>(FrontendController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
