/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

const cameraIds = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
type CameraIds = (typeof cameraIds)[number];

const filters = ["intrusionDetection", "online", "offline", "all"] as const;
type FiltersAvailable = (typeof filters)[number];

@Controller()
export class AppController {
  constructor(
    private readonly database: DatabaseService<CameraIds, FiltersAvailable>,
  ) {}

  @Get("/aggregate/:filter")
  getAggregateValues(@Param("filter") filter: FiltersAvailable) {
    // DANGER Nest js assumes that the given type is correct
    // without being checked by nest js,
    // so the check is done at runtime
    if (!filters.includes(filter)) {
      throw new HttpException(
        `Invalid filter "${filter}", the available filters are ${filters}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.database.aggregateCamera(filter);
  }

  @Post("/:id/online/:status")
  saveStatus(@Param("id") camera: string, @Param("status") status: boolean) {
    const cameraId = parseInt(camera) as CameraIds;

    if (!cameraIds.includes(cameraId)) {
      return "Invalid camera Id " + cameraId;
    }

    return this.database.addData({
      cameraId: cameraId,
      timestamp: new Date().toISOString(),
      online: status,
    });
  }
}
