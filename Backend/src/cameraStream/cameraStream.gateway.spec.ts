import { Test, TestingModule } from '@nestjs/testing';
import { CameraStreamGateway } from './cameraStream.gateway';

describe('WebrtcGateway', () => {
  let gateway: CameraStreamGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CameraStreamGateway],
    }).compile();

    gateway = module.get<CameraStreamGateway>(CameraStreamGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
