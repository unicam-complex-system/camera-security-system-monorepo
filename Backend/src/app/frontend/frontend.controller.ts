import {
  Controller,
  Get,
  Header,
  Param,
  Post,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  filters,
  FiltersAvailable,
  FiltersValidator,
} from '../../validators/filters/filters.pipe';
import { PositiveNumberValidator } from '../../validators/camera-id/camera.pipe';
import { AuthGuard } from '../../auth/auth.guard';

const filterParams = {
  name: 'filter',
  type: 'string',
  examples: {
    online: {
      value: 'online',
    },
    offline: {
      value: 'offline',
    },
    intrusionDetection: {
      value: 'intrusionDetection',
    },
    all: {
      value: 'all',
    },
  },
};

@ApiTags('AuthenticatedFrontend')
@ApiBearerAuth('CSS-Auth')
@ApiOkResponse()
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
@ApiBadRequestResponse({
  description: 'Camera id or filter is invalid',
})
@UseGuards(AuthGuard)
@Controller()
export class FrontendController {
  constructor(private readonly databaseService: DatabaseService) {}

  @ApiParam(filterParams)
  @Get(`:filter(${filters.join('|')})/aggregate`)
  getAggregateValues(
    @Param('filter', FiltersValidator) filter: FiltersAvailable,
  ) {
    return this.databaseService.aggregateCamera(filter);
  }

  @ApiParam(filterParams)
  @Get(`:filter(${filters.join('|')})`)
  getValues(@Param('filter', FiltersValidator) filter: FiltersAvailable) {
    return this.databaseService.getData(filter);
  }

  @ApiParam(filterParams)
  @ApiParam({
    name: 'limit',
    type: 'number',
    example: 10,
  })
  @ApiParam({
    name: 'step',
    type: 'number',
    example: 0,
    description:
      'if 0 returns the first values, if 1 returns the second values, etc... . When no data is found it simply return an empty string',
  })
  @Get(`:filter(${filters.join('|')})/:limit(\\d+)/:step(\\d+)`)
  getValuesLimit(
    @Param('filter', FiltersValidator) filter: FiltersAvailable,
    @Param('limit', PositiveNumberValidator) limit: number,
    @Param('step', PositiveNumberValidator) step: number,
  ) {
    return this.databaseService.getData(filter, limit, step);
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Camera id',
    example: 1,
  })
  @ApiParam({
    name: 'timestamp',
    type: 'string',
    example: '2023-11-23T18:38:35.571Z',
  })
  @Header('Content-Type', 'image/jpeg')
  @Get('/:id(\\d+)/:timestamp')
  async getImage(
    @Param('id', PositiveNumberValidator) cameraId: number,
    @Param('timestamp') timestamp: string,
  ) {
    const array = await this.databaseService.getRawDataArray('cameras', {
      cameraId: cameraId,
      timestamp: timestamp,
    });

    return new StreamableFile(array[0].intrusionDetection.buffer);
  }

  @Post('/:id(\\d+)/:name')
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
  })
  @ApiParam({
    name: 'name',
    type: 'string',
    example: 'Kitchen',
  })
  async setChannelName(
    @Param('id', PositiveNumberValidator) id: number,
    @Param('name') name: string,
  ) {
    try {
      await this.databaseService.setChannelName(id, name);
      return 'OK';
    } catch (e) {
      console.error(e);
      return 'ERROR' + e;
    }
  }
}
