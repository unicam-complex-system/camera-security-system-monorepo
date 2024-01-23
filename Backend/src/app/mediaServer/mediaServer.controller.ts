import { Body, Controller, Header, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CameraStreamGateway } from 'src/cameraStream/cameraStream.gateway';

@ApiTags('Media Server')
@ApiBearerAuth('CSS-Auth')
@ApiOkResponse()
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
@ApiBadRequestResponse({
  description: 'Media server denied',
})
// @UseGuards(AuthGuard)
@Controller()
export class MediaServerController {
  constructor(private readonly cameraStreamGateway: CameraStreamGateway) {}

  /* Media server hook endpoint */
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @Header('Content-Type', 'application/json')
  @Post('/media-server')
  async getMediaServerEvents(@Body() event: any) {
    console.log(event);
    this.cameraStreamGateway.broadcastEvent(event);
    return { message: 'OK' };
  }
}
