/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post, UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { FileInterceptor } from '@nestjs/platform-express';
import DataType from '../DataType';
import { ApiTags } from '@nestjs/swagger';

const cameraIds = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
type CameraIds = (typeof cameraIds)[number];

const filters = ["intrusionDetection", "online", "offline", "all"] as const;
type FiltersAvailable = (typeof filters)[number];

@ApiTags("Machine Learning")
@Controller()
export class AppController {
  constructor(
    private readonly database: DatabaseService<CameraIds, FiltersAvailable>,
  ) {}

  @Post("/:id/online/:status")
  saveStatus(@Param("id") stringId: string, @Param("status") status: boolean) {
    const cameraId = parseInt(stringId) as CameraIds;

    if (!cameraIds.includes(cameraId)) {
      throw new HttpException("Invalid camera Id " + cameraId, HttpStatus.BAD_REQUEST);
    }

    return this.database.addData({
      cameraId: cameraId,
      timestamp: new Date().toISOString(),
      online: status,
    });
  }

  // command Example curl -X 'POST' \
  //   'http://localhost:3000/1/intrusionDetection' \
  //   -H 'accept: */*' \
  //   -H "Content-Type: multipart/form-data" -F file=@{filename}.jpg
  @Post(":id/intrusionDetection")
  @UseInterceptors(FileInterceptor("file"))
  uploadImage(
    @Param("id") id: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: "image/jpeg" })
        .addMaxSizeValidator({
          maxSize: 100000, // 100Kb
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    const cameraId = parseInt(id) as CameraIds;

    if (!cameraIds.includes(cameraId)) {
      throw new HttpException("Invalid camera Id " + cameraId, HttpStatus.BAD_REQUEST);
    }
    const timestamp = new Date().toISOString();
    // const path = this.storage.secureSaveFile(timestamp, file.buffer);

    this.database.addData(
      new DataType(cameraId, timestamp, null, file)
    );
  }


}
