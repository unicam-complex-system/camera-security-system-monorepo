import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';

import UserDTO from '../user.dto';
import { LoginService } from './login.service';
import { DatabaseService } from '../database/database.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
        }),
      ],
      providers: [LoginService, DatabaseService],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return access_token', async () => {
    const user: UserDTO = {
      name: process.env.CSD_USER,
      password: process.env.CSD_PASSWORD,
    };

    expect(process.env.BCRYPT_SALT).toBeDefined();

    const token = await service.checkUser(user);

    expect(token.access_token).toBeDefined();
  });
});
