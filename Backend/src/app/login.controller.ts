/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Body, Controller, Header, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import UserDTO from '../user.dto';
import * as process from 'process';
import { LoginService } from '../login/login.service';

@ApiTags('Frontend')
@Controller('/')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiBody({
    type: String,
    description: 'User',
    examples: {
      a: {
        summary: 'Existing user',
        value: {   
          name: process.env.CSD_USER,
          password: process.env.CSD_PASSWORD,
        },
      },
      b: { 
        summary: 'Non existing user', 
        value: { name: 'non', password: 'Basic' },
      },
    },
  })
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @Header('Content-Type', 'application/json')
  @Post('login')
  async login(@Body() user: UserDTO) {
    return await this.loginService.checkUser(user);
  }
}
