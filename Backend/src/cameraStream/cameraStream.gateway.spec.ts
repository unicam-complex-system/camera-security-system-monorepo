import { Test, TestingModule } from '@nestjs/testing';
import { CameraStreamGateway } from './cameraStream.gateway';
import { JwtModule } from '@nestjs/jwt';

describe('WebStreamGateway', () => {
  let gateway: CameraStreamGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CameraStreamGateway],
      imports: [
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
        }),
      ],
    }).compile();

    gateway = module.get<CameraStreamGateway>(CameraStreamGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
