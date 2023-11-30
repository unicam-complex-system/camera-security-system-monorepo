import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  // The canActivate method is called before the route handler, it saves the user object to the request["user"] object

  // We don't check if the user exists in db because the token is generated from us and only if the user exists
  // Maybe we can check if the user exists in db and if not throw an error, in the case the user have been deleted
  // But for now we don't delete users and users do not have defined authorization levels

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    try {
      request["user"] = this.jwtService.verify(token);
      token;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];

    if (type != "Bearer") {
      throw new ForbiddenException("No token provided");
    }

    return token;
  }
}
