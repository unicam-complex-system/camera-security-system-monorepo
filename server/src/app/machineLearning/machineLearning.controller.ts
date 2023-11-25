/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post, UploadedFile, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { FileInterceptor } from '@nestjs/platform-express';
import DataType from '../../DataType';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CameraValidator, CameraIds } from '../../validators/camera-id/camera.pipe';
import { AuthGuard } from '../../auth/auth.guard';

@ApiTags("Machine Learning")
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  description: "Invalid filter or camera id",
})
@Controller("/:id")
export class MachineLearningController {

  constructor(private readonly database: DatabaseService) {}

  @ApiOperation({
    description: "Updates the online status of the camera",
  })
  @ApiCreatedResponse()
  @ApiBearerAuth("CSS-Auth")
  @UseGuards(AuthGuard)
  @Post(":status")
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

  @ApiOperation({
    description:
      "Used to send image<br>Command example: <br>" +
      " curl -X 'POST' http://localhost:3000/1 -H 'Content-Type: multipart/form-data' -F file=@{filename}.jpg",
  })
  @ApiBearerAuth("CSS-Auth")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  @Post("/upload") // TODO maybe use Put instead of Post
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
