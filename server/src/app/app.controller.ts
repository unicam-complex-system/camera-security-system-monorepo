/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from '../database/database.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly database: DatabaseService,
  ) {}

  @Get()
  getHello(): string {
    this.database.createView();
    return this.appService.getHello();
  }
}
