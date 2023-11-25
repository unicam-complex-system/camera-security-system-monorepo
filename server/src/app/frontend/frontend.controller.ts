import {
  Controller,
  Get,
  Header,
  Param,
  StreamableFile,
  UseGuards,
} from "@nestjs/common";
import { DatabaseService } from "../../database/database.service";
import {
  ApiBadRequestResponse,
  ApiBearerAuth, ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  FiltersAvailable,
  FiltersValidator,
} from "../../validators/filters/filters.pipe";
import {
  CameraIds,
  CameraValidator,
} from "../../validators/camera-id/camera.pipe";
import { AuthGuard } from "../../auth/auth.guard";

const filterParams = {
  name: "filter",
  type: "string",
  examples: {
    online: {
      value: "online",
    },
    offline: {
      value: "offline",
    },
    intrusionDetection: {
      value: "intrusionDetection",
    },
    all: {
      value: "all",
    },
  },
};

@ApiTags("AuthenticatedFrontend")
@ApiBearerAuth("CSS-Auth")
@ApiOkResponse()
@ApiUnauthorizedResponse({
  description: "Unauthorized",
})
@ApiBadRequestResponse({
  description: "Camera id or filter is invalid",
})
@UseGuards(AuthGuard)
@Controller("/")
export class FrontendController {
  constructor(private readonly databaseService: DatabaseService) {}

  @ApiParam(filterParams)
  @Get(":filter/aggregate")
  getAggregateValues(
    @Param("filter", FiltersValidator) filter: FiltersAvailable,
  ) {
    return this.databaseService.aggregateCamera(filter);
  }

  @ApiParam(filterParams)
  @Get(":filter")
  getValues(@Param("filter", FiltersValidator) filter: FiltersAvailable) {
    return this.databaseService.getData(filter);
  }

  @ApiParam({
    name: "id",
    type: "number",
    description: "Camera id",
    example: 1,
  })
  @ApiParam({
    name: "timestamp",
    type: "string",
    example: "2023-11-23T18:38:35.571Z",
  })
  @Header("Content-Type", "image/jpeg")
  @Get(":id/:timestamp")
  async getImage(
    @Param("id", CameraValidator) cameraId: CameraIds,
    @Param("timestamp") timestamp: string,
  ) {
    const array = await this.databaseService.getRawDataArray("cameras", {
      cameraId: cameraId,
      timestamp: timestamp,
    });

    return new StreamableFile(array[0].intrusionDetection.buffer);
  }
}
