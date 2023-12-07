import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IncomingHttpHeaders } from 'http';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  // The canActivate method is called before the route handler, it saves the user object to the request["user"] object

  // We don't check if the user exists in db because the token is generated from us and only if the user exists
  // Maybe we can check if the user exists in db and if not throw an error, in the case the user have been deleted
  // But for now we don't delete users and users do not have defined authorization levels

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    try {
      const headers = this.getGenericHeaders(context);

      //TODO check if the user is saved
      request['user'] = this.checkToken(headers);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    }
    return true;
  }

  // token saved as `Bearer ${token}`
  checkToken(headers: Record<string, string> | IncomingHttpHeaders) {
    const token = headers.authorization;

    if (token == undefined || !token.startsWith('Bearer ')) {
      throw new ForbiddenException('No token provided');
    }

    return this.jwtService.verify(token.slice(7, token.length));
  }

  private getGenericHeaders(context: ExecutionContext): Record<string, string> {
    const request = context.switchToHttp().getRequest();
    switch (context.getType()) {
      case 'rpc':
        throw new HttpException('rpc protocol', HttpStatus.NOT_IMPLEMENTED);
      case 'ws':
        return request.handshake.headers;
      case 'http':
        return request.headers;
    }
  }
}
