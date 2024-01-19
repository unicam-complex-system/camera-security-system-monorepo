import { Injectable } from '@nestjs/common';
import { OpenVidu } from 'openvidu-node-client';

@Injectable()
export class CSSOpenVidu {
  readonly instance: OpenVidu;

  constructor() {
    this.instance = new OpenVidu(
      process.env.OPENVIDU_URL,
      process.env.OPENVIDU_SECRET,
    );
  }
}
