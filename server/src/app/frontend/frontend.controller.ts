import { Controller, Get, Header, HttpStatus, Param, StreamableFile } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FiltersValidator } from '../../validators/filters/filters.pipe';
import { CameraValidator } from '../../validators/camera-id/camera.pipe';


const cameraIds = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
type CameraIds = (typeof cameraIds)[number];

const filters = ["intrusionDetection", "online", "offline", "all"] as const;
type FiltersAvailable = (typeof filters)[number];


@Controller()
@ApiTags("Frontend")
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  description: "Invalid filter or camera id",
})
export class FrontendController {

  constructor(
    private readonly database: DatabaseService,
  ) {}

  @Get("/:filter/aggregate")
  getAggregateValues(@Param("filter", FiltersValidator) filter: FiltersAvailable) {
    return this.database.aggregateCamera(filter);
  }

  @Get(":filter")
  getValues(@Param("filter", FiltersValidator) filter: FiltersAvailable) {
    return this.database.getData(filter);
  }

  @Header("Content-Type", "image/jpeg")
  @Get(":id/:timestamp")
  async getImage(
    @Param("id", CameraValidator) cameraId: CameraIds,
    @Param("timestamp") timestamp: string,
  ) {
    return new StreamableFile(
      await this.database.getImage(cameraId, timestamp),
    );
  }
}
