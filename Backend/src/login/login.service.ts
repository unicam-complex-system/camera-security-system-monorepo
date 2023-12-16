import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import UserDTO from '../user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as process from 'process';
import 'dotenv/config';

@Injectable()
export class LoginService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async checkUser(user: UserDTO) {
    // console.log(bcrypt.hashSync(user.password, process.env.BCRYPT_SALT));
    const encryptedUser = {
      name: user.name,
      password: bcrypt.hashSync(user.password, process.env.BCRYPT_SALT),
    };

    // this should not throw an error, then the return is executed
    await this.databaseService.getRawDataArray(
      'users',
      encryptedUser,
      'User Not found',
    );

    return {
      access_token: await this.jwtService.signAsync(user.name),
    };
  }
}
