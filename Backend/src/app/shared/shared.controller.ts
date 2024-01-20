import { Controller, Get, Param } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { PositiveNumberValidator } from '../../validators/camera-id/camera.pipe';
import { ApiParam, ApiTags } from '@nestjs/swagger';

// This defines a shared controller between Frontend and Machine Learning
@ApiTags('Shared')
@Controller('shared')
export class SharedController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('/nvr')
  async getNVR() {
    return await this.databaseService.getNVRData();
  }

  // @Get('/channel')
  // async getChannel() {
  //   return await this.databaseService.getChannelName();
  // }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: false,
    examples: {
      undefined: {
        description: 'sends an undefined value',
        value: undefined,
      },
      camera: {
        value: '1',
      },
    },
  })
  @Get('/channel/:id(\\d+|,)?')
  async getChannelId(@Param('id', PositiveNumberValidator) id?: number) {
    return await this.databaseService.getChannelName(id);
  }
}
