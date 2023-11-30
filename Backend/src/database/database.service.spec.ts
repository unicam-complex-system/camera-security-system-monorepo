/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';

describe("DatabaseService", () => {
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it("should be defined", () => {
    expect(databaseService).toBeDefined();
  });

  it("should get aggregated data", async () => {
    const aggregateData = await databaseService.aggregateCamera();

    expect(aggregateData).not.toBeNull();
  });

  it("should get single data", async () => {
    const aggregateData = await databaseService.getData("all");

    expect(aggregateData).not.toBeNull();
  });
  it("should get image data", async () => {
    const aggregateData = await databaseService.getData("all");

    aggregateData
      .filter((value) => value.intrusionDetection)
      .map((value) =>
        expect(() =>
          databaseService.getImage(value.cameraId, value.timestamp),
        ).not.toThrow(),
      );

    const spy =  jest.fn()
    await databaseService.getImage(1, "this will make it throw").catch(spy);
    expect(spy).toHaveBeenCalled();
  });
});
