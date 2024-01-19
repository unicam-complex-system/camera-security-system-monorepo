import { Injectable } from '@nestjs/common';
const MainOpenVidu = require('openvidu-node-client').OpenVidu;

@Injectable()
export class OpenVidu {
  private instance: any;

  constructor() {
    this.instance = new MainOpenVidu(
      process.env.OPENVIDU_URL,
      process.env.OPENVIDU_SECRET,
    );
  }

  getInstance() {
    return this.instance;
  }
}
