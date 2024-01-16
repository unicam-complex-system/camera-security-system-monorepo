/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */
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
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import CoolObserver from './coolObserver';

export const subscribers: CoolObserver<string> = new CoolObserver();

type Message = { id: number; data: Buffer };

@Catch(WsException, HttpException)
export class WsExceptionFilter implements WsExceptionFilter {
  catch(exception: WsException, host: ExecutionContext) {
    host.switchToWs().getClient().disconnect();
  }
}

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

      subscribers.add(message.id, message.data.toString());
    } catch (e) {
      return e.message;
    }
  }
}
