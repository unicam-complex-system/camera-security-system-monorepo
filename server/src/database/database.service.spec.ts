/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';

const cameraIds = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

const filters = ["intrusionDetection", "online", "offline", "", "all"] as const;
describe('DatabaseService', () => {
  let databaseService: DatabaseService<(typeof cameraIds)[number], (typeof filters)[number]>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    databaseService = module.get<DatabaseService<(typeof cameraIds)[number], (typeof filters)[number]>>(DatabaseService);
  });

  it('should be defined', () => {
    expect(databaseService).toBeDefined();
  });

  it('should get aggregated data', async () => {
    const aggregateData = await databaseService.aggregateCamera()

    expect(aggregateData).not.toBeNull()
  });
});
