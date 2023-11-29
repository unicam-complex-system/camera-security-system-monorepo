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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { CameraIds, CameraValidator } from '../../validators/camera-id/camera.pipe';
import { AuthGuard } from '../../auth/auth.guard';
import { TelegramService } from '../../telegram/telegram.service';

class ImageUploadDto {
  @ApiProperty({
    type: "string",
    format: "binary",
    description: "Image file to upload",
  })
  file: any;
}

@ApiTags("Machine Learning")
@ApiBadRequestResponse({
  description: "Invalid filter or camera id",
})
@Controller("/:id")
export class MachineLearningController {
  constructor(
    private readonly database: DatabaseService,
    private readonly telegramApi: TelegramService,
  ) {}

  @ApiOperation({
    description: "Updates the online status of the camera",
  })
  @ApiParam({
    name: "id",
    type: "number",
    example: 1,
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
  @Post(`:status(online|offline)`)
  saveStatus(
    @Param("id", CameraValidator) cameraId: CameraIds,
    @Param("status") status: string,
  ) {
    // Following condition could be removed as the path can only be online or offline
    if (status.toLowerCase() != "online" && status.toLowerCase() != "offline")
      throw new BadRequestException(`Invalid status ${status}`);

    return this.database.addData({
      cameraId: cameraId,
      timestamp: new Date().toISOString(),
      online: status.toLowerCase() === "online",
    });
  }

  @ApiOperation({
    description: "Used to send image",
  })
  @ApiBearerAuth("CSS-Auth")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: `The image file to upload`,
    type: ImageUploadDto,
  })
  @ApiParam({
    name: "id",
    type: "number",
    example: 1,
  })
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  @Post()
  async uploadImage(
    @Param("id", CameraValidator) cameraId: CameraIds,
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
    const date = new Date();

    await this.database.addData(
      new DataType(cameraId, date, null, file),
    );
    await this.telegramApi.sendIntrusionDetectionNotification(
      cameraId,
      date,
      file.buffer,
    );
    return date.toISOString();
  }
}
