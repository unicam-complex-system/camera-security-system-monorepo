import { Controller, Get, Header, HttpException, HttpStatus, Param, StreamableFile } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ApiTags } from '@nestjs/swagger';


const cameraIds = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
type CameraIds = (typeof cameraIds)[number];

const filters = ["intrusionDetection", "online", "offline", "all"] as const;
type FiltersAvailable = (typeof filters)[number];


@ApiTags("Frontend")
@Controller()
export class FrontendController {

  constructor(
    private readonly database: DatabaseService<CameraIds, FiltersAvailable>,
  ) {}

  @Get("/:filter/aggregate")
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

  @Get(":filter")
  getValues(@Param("filter") filter: FiltersAvailable) {
    // DANGER Nest js assumes that the given type is correct
    // without being checked by nest js,
    // so the check is done at runtime
    if (!filters.includes(filter)) {
      throw new HttpException(
        `Invalid filter "${filter}", the available filters are ${filters}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.database.getData(filter);
  }

  @Header("Content-Type", "image/jpeg")
  @Get(":id/:timestamp")
  async getImage(
    @Param("id") id: string,
    @Param("timestamp") timestamp: string,
  ) {
    const cameraId = parseInt(id) as CameraIds;

    if (!cameraIds.includes(cameraId)) {
      throw new HttpException(
        "Invalid camera Id " + cameraId,
        HttpStatus.BAD_REQUEST,
      );
    }

    return new StreamableFile(
      await this.database.getImage(cameraId, timestamp),
    );
  }
}
