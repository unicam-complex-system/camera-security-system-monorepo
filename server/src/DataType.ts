/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Binary } from 'mongodb';

export default class DataType<ID> {
  cameraId: ID;
  timestamp: string;
  online?: boolean;
  intrusionDetection?: Binary;

  constructor(
    cameraId: ID,
    timestamp: string,
    online?: boolean,
    file?: Express.Multer.File,
  ) {
    this.cameraId = cameraId;
    this.timestamp = timestamp;
    this.online = online;
    this.intrusionDetection = new Binary(file.buffer);
  }
}
