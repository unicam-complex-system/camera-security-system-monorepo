/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Test, TestingModule } from '@nestjs/testing';
import { MachineLearningController } from './machineLearning.controller';
import { DatabaseService } from '../../database/database.service';
import { JwtModule } from '@nestjs/jwt';

describe('MachineLearningController', () => {
  let controller: MachineLearningController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
        }),
      ],
      controllers: [MachineLearningController],
      providers: [DatabaseService],
    }).compile();

    controller = app.get<MachineLearningController>(MachineLearningController);
  });

  it('should exists', () => {
    expect(controller).toBeDefined();
  });
});
