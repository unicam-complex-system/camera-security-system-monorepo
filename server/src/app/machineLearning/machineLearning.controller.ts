/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { FileInterceptor } from '@nestjs/platform-express';
import DataType from '../../DataType';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CameraValidator, CameraIds } from '../../validators/camera-id/camera.pipe';

@Controller("/:id")
@ApiTags("Machine Learning")
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  description: "Invalid filter or camera id",
})
export class MachineLearningController {
  // @Param("id") id: string;
  constructor(private readonly database: DatabaseService) {}

  @ApiOperation({
    description: "Updates the online status of the camera",
  })
  @ApiResponse({
    status: 201,
    description: "Returns the result of adding status",
  })
  @Post("/:status")
  saveStatus(
    @Param("id", CameraValidator) cameraId: CameraIds,
    @Param("status") status: string,
  ) {
    if (status.toLowerCase() != "online" && status.toLowerCase() != "offline")
      throw new HttpException(
        "Invalid status " + status,
        HttpStatus.BAD_REQUEST,
      );

    return this.database.addData({
      cameraId: cameraId,
      timestamp: new Date().toISOString(),
      online: status.toLowerCase() === "online",
    });
  }

  @Post()
  @ApiOperation({
    description:
      "Used to send image<br>Command example: <br>" +
      " curl -X 'POST' http://localhost:3000/1 -H 'Content-Type: multipart/form-data' -F file=@{filename}.jpg",
  })
  @UseInterceptors(FileInterceptor("file"))
  uploadImage(
    @Param("id") cameraId: CameraIds,
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
    const timestamp = new Date().toISOString();
    // const path = this.storage.secureSaveFile(timestamp, file.buffer);

    this.database.addData(new DataType(cameraId, timestamp, null, file));
    return timestamp;
  }
}
