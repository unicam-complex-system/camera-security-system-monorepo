// websocket.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  WsException,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthGuard } from '../auth/auth.guard';
import {
  Catch,
  ExecutionContext,
  HttpException,
  UseFilters,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import * as console from 'console';
import { SocketsContainer } from '@nestjs/websockets/sockets-container';
import { DatabaseService } from '../database/database.service';
import { TelegramService } from '../telegram/telegram.service';
import { JwtService } from '@nestjs/jwt';

@Catch(WsException, HttpException)
export class WsExceptionFilter implements WsExceptionFilter {
  catch(exception: WsException, host: ExecutionContext) {
    host.switchToWs().getClient().disconnect();
  }
}

type Message = { id: number; data: Buffer };

@WebSocketGateway({
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
  namespace: '/',
})
@UseGuards(AuthGuard)
@UseFilters(WsExceptionFilter)
export class CameraStreamGateway implements OnGatewayConnection {
  constructor(private readonly jwtService: JwtService) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    try {
      new AuthGuard(this.jwtService).checkToken(client.handshake.headers);
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
      console.log(message.id, message.data);

      client.to('clients').emit(message.id.toString(), message.data);
    } catch (e) {
      return e.message;
    }
  }
}
