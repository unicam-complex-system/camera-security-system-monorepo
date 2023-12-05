import { JwtService } from '@nestjs/jwt';

describe('AuthGuard', () => {
  const payload = 'complexUserNamePayload';
  let service: JwtService;
  let jwtToken: string;

  beforeAll(async () => {
    service = new JwtService({
      secret: process.env.JWT_SECRET,
    });
    jwtToken = await service.signAsync(payload);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
    expect(jwtToken).toBeDefined();
  });

  it('Get Payload from token', () => {
    const user = service.verify(jwtToken);
    expect(user).toBe(payload);
  });

  it('Should fail JwtVerify of another token', () => {
    expect(() =>
      service.verify(
        'eyJhbGciOiJIUzI1NiJ9.QmFzaWM.MTnCJYESf5QRL9N8gqn5Di5PEZX8eZB5sN8W4TJTDKF',
      ),
    ).toThrow();
  });
});
