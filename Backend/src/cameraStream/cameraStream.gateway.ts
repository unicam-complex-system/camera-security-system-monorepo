// websocket.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  WsException,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthGuard } from '../auth/auth.guard';
import {
  Catch,
  ExecutionContext,
  HttpException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { cameraData } from './cameraData';
const OpenVidu = require('openvidu-node-client').OpenVidu;

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
  openvidu = new OpenVidu(
    process.env.OPENVIDU_URL,
    process.env.OPENVIDU_SECRET,
  );
  sessionId = null;

  constructor(private readonly jwtService: JwtService) {}

  async afterInit() {
    try {
      const session = await this.openvidu.createSession({});
      this.sessionId = session.sessionId;
      cameraData.map((camera) => {
        const connectionProperties = {
          type: 'IPCAM',
          rtspUri: camera.rtspUrl,
          adaptativeBitrate: true,
          onlyPlayWithSubscribers: false,
          networkCache: 1000,
          data: camera.id,
        };
        session
          .createConnection(connectionProperties)
          .then((connection: any) => {
            console.log(connection);
          })
          .catch((error) => console.error(error));
      });
    } catch (error) {
      console.error("Failed after initalizing...");
    }
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    try {
      new AuthGuard(this.jwtService).checkToken(client.handshake.headers);
      console.log(`Welcome our new client .... ${client.id}`);
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
      const session = this.openvidu.activeSessions.find(
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
