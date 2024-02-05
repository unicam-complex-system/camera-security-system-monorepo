// websocket.gateway.ts
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthGuard } from '../auth/auth.guard';
import {
  Catch,
  ExecutionContext,
  HttpException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
import { transcode } from './transcode';

@Catch(WsException, HttpException)
export class WsExceptionFilter implements WsExceptionFilter {
  catch(exception: WsException, host: ExecutionContext) {
    host.switchToWs().getClient().disconnect();
  }
}

type Message = { id: number; data: Buffer };

@WebSocketGateway({
  transports: ['websocket', 'polling'],
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    transports: ['websocket', 'polling'],
    credentials: true,
  },
  allowEIO3: true,
})
@UseGuards(AuthGuard)
@UseFilters(WsExceptionFilter)
export class CameraStreamGateway implements OnGatewayConnection {
  @WebSocketServer() io: Server;
  sessionId?: string = null;

  constructor(
    private readonly jwtService: JwtService,
    private readonly database: DatabaseService,
  ) {}

  async afterInit() {
    try {
      const nvr = await this.database.getNVRData();

      /* To be used with NVR */
      const cameras = nvr.channels.map((id: number) => ({
        id: id.toString(),
        rtspUri: `${nvr.ip}/ch${id}_0.264`,
      }));

      Promise.all(
        cameras.map((camera) => {
          transcode(camera, this.io);
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    try {
      new AuthGuard(this.jwtService).checkToken(client.handshake.headers);

      console.log(`Welcome new client .... ${client.id}`);
    } catch (e) {
      client.disconnect();
      return;
    }
    client.join('clients');
  }

  @SubscribeMessage('message')
  private broadcastMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    try {
      const message = JSON.parse(data) as Message;

      client.to('clients').emit(message.id.toString(), message.data);
    } catch (e) {
      return e.message;
    }
  }

  broadcastEvent(event: any) {
    console.log(event);
    this.io.to('clients').emit('participantLeft', JSON.stringify(event));
  }
}
