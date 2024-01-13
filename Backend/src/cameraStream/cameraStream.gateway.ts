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
import { initiateCameraStream } from './UDPStream';

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
  constructor(private readonly jwtService: JwtService) {}

  afterInit() {
    // initiateCameraStream(this.io);
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    try {
      new AuthGuard(this.jwtService).checkToken(client.handshake.headers);
    } catch (e) {
      client.disconnect();
      return;
    }
    client.join('clients');
    console.log(this.io.adapter);
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
}
