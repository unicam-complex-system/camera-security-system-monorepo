import { Module } from '@nestjs/common';
import { CameraStreamGateway } from './cameraStreamGateway';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      // FIXME Error: Payload as string is not allowed with the following sign options: expiresIn
      // signOptions: { expiresIn: "60s" },
    }),
  ],
  providers: [CameraStreamGateway],
})
export class CameraStreamModule {}
