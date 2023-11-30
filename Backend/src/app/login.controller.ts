/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Body, Controller, Header, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import UserDTO from '../user.dto';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';

@ApiTags("Frontend")
@Controller("/")
export class LoginController {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  @ApiBody({
    type: String,
    description: "User",
    examples: {
      a: {
        summary: "Existing user",
        value: { name: process.env.CSD_USER, password: process.env.CSD_PASSWORD },
      },
      b: {
        summary: "Non existing user",
        value: { name: "non", password: "Basic" },
      },
    },
  })
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @Header("Content-Type", "application/json")
  @Post("login")
  async login(@Body() user: UserDTO) {
    await this.databaseService.getRawDataArray("users", user, "User Not found");

    return {
      access_token: await this.jwtService.signAsync(user.name),
    };
  }
}
