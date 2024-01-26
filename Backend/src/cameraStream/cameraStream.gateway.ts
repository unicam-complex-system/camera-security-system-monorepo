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
import { CSSOpenVidu } from './open-vidu.service';
import { ConnectionProperties, ConnectionType } from 'openvidu-node-client';
import { DatabaseService } from '../database/database.service';
import * as console from 'console';

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
    private readonly openvidu: CSSOpenVidu,
    private readonly database: DatabaseService,
  ) {}

  async afterInit() {
    try {
      const session = await this.openvidu.instance.createSession();
      this.sessionId = session.sessionId;
      const nvr = await this.database.getNVRData();

      nvr.channels.forEach((id: number) => {
        const connectionProperties: ConnectionProperties = {
          type: ConnectionType.IPCAM,
          rtspUri: `${nvr.ip}/ch${id}_0.264`,
          adaptativeBitrate: true,
          onlyPlayWithSubscribers: true,
          networkCache: 1000,
          data: id.toString(),
        };
        console.log(connectionProperties);

        session
          .createConnection(connectionProperties)
          .then((connection: unknown) => console.log(connection))
          .catch((error) => console.error(error));
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    try {
      new AuthGuard(this.jwtService).checkToken(client.handshake.headers);

      console.log(`Welcome new client .... ${client.id}`);
      client.emit(
        'session_delivery',
        JSON.stringify({ sessionId: this.sessionId }),
      );
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

  @SubscribeMessage('token_request')
  private async createToken(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    try {
      const message = JSON.parse(data) as { sessionId: string };
      const session = this.openvidu.instance.activeSessions.find(
        (s) => s.sessionId === message.sessionId,
      );

      if (!session) {
        client.emit(
          'error',
          JSON.stringify({ message: 'Error getting the session' }),
        );
      } else {
        const connection = await session.createConnection();
        client.emit(
          'token_delivery',
          JSON.stringify({ token: connection.token }),
        );
      }
    } catch (e) {
      return e.message;
    }
  }

  broadcastEvent(event: any) {
    console.log(event);
    this.io.to('clients').emit('participantLeft', JSON.stringify(event));
  }
}
