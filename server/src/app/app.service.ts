/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
