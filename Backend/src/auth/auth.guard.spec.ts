import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const payload = 'complexUserNamePayload';
  let service: JwtService;
  let auth: AuthGuard;
  let headers: Record<string, string>;

  beforeAll(async () => {
    service = new JwtService({
      secret: process.env.JWT_SECRET,
    });

    auth = new AuthGuard(service);
    headers = tokenToHeaders(await service.signAsync(payload));
  });

  it('Should be defined', () => {
    expect(auth).toBeDefined();
    expect(headers).toBeDefined();
  });

  it('Get Payload from token', () => {
    const user = auth.checkToken(headers);
    expect(user).toBe(payload);
  });

  it('Should fail JwtVerify of another token', () => {
    expect(() =>
      auth.checkToken(
        tokenToHeaders(
          'eyJhbGciOiJIUzI1NiJ9.QmFzaWM.MTnCJYESf5QRL9N8gqn5Di5PEZX8eZB5sN8W4TJTDKF',
        ),
      ),
    ).toThrow();
  });

  function tokenToHeaders(token: string) {
    return { authorization: `Bearer ${token}` };
  }
});
