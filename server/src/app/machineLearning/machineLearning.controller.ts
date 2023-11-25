/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import {
  BadRequestException,
  Controller,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { FileInterceptor } from '@nestjs/platform-express';
import DataType from '../../DataType';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CameraIds, CameraValidator } from '../../validators/camera-id/camera.pipe';
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
  @ApiParam({
    name: "id",
    type: "number",
    example: 1
  })
  @ApiParam({
    name: "status",
    type: "string",
    examples: {
      online: {
        value: "online",
      },
      offline: {
        value: "offline",
      },
    },
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
      throw new BadRequestException(`Invalid status ${status}`);

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
  @Post("/upload")
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

    this.database.addData(new DataType(cameraId, timestamp, null, file));
    return timestamp;
  }
}
