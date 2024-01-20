import { Body, Controller, Get, Header, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { CameraStreamGateway } from 'src/cameraStream/cameraStream.gateway';

type ParticipantLeft = {
  event: 'participantLeft';
  timestamp: number;
  sessionId: string;
  startTime: number;
  duration: number;
  reason: string;
  connectionId: string;
  location: string;
  ip: string;
  platform: string;
  clientData: string;
  serverData: string;
};

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
  @Post('media-server')
  async getMediaServerEvents(@Body() event: any) {
    console.log(event);
    this.cameraStreamGateway.broadcastEvent(event);
    return { message: 'OK' };
  }
}
