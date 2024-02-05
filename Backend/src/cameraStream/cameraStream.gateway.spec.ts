import { Test, TestingModule } from '@nestjs/testing';
import { CameraStreamGateway } from './cameraStream.gateway';
import { JwtModule } from '@nestjs/jwt';


import { DatabaseService } from '../database/database.service';

describe('WebStreamGateway', () => {
  let gateway: CameraStreamGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CameraStreamGateway, DatabaseService],
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
