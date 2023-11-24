import {
  Body,
  Controller,
  Get,
  Header,
  HttpStatus,
  Param,
  Post,
  Request,
  StreamableFile,
  UseGuards,
} from "@nestjs/common";
import { DatabaseService } from "../../database/database.service";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  FiltersAvailable,
  FiltersValidator,
} from "../../validators/filters/filters.pipe";
import {
  CameraIds,
  CameraValidator,
} from "../../validators/camera-id/camera.pipe";
import { AuthGuard } from "../../auth/auth.guard";
import UserDTO from '../../user.dto';
import { JwtService } from '@nestjs/jwt';


@Controller("/")
@ApiTags("Frontend")
export class FrontendController {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}


  @ApiBody({
    type: String,
    description: "User",
    examples: {
      a: {
        summary: "Simple Body",
        value: { username: "user", password: "pass" },
      },
    },
  })
  @Header("Content-Type", "application/json")
  @Post("login")
  async login(@Body() user: UserDTO) {
    await this.databaseService.getUser(user);

    return {
      access_token: await this.jwtService.signAsync(user.name),
    };
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid filter",
  })
  @Get(":filter/aggregate")
  getAggregateValues(
    @Param("filter", FiltersValidator) filter: FiltersAvailable,
  ) {
    return this.databaseService.aggregateCamera(filter);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid filter",
  })
  @Get(":filter")
  getValues(@Param("filter", FiltersValidator) filter: FiltersAvailable) {
    return this.databaseService.getData(filter);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid camera id",
  })
  @Header("Content-Type", "image/jpeg")
  @Get(":id/:timestamp")
  async getImage(
    @Param("id", CameraValidator) cameraId: CameraIds,
    @Param("timestamp") timestamp: string,
    @Request() req: any,
  ) {
    console.log(req.user);
    return new StreamableFile(
      await this.databaseService.getImage(cameraId, timestamp),
    );
  }
}
