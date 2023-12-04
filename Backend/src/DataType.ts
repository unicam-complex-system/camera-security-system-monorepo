/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Binary } from "mongodb";

export default class DataType<ID> {
  cameraId: ID;
  timestamp: string;
  online?: boolean;
  intrusionDetection?: Binary;

  constructor(
    cameraId: ID,
    date: Date,
    online?: boolean,
    file?: Express.Multer.File,
  ) {
    this.cameraId = cameraId;
    this.timestamp = date.toISOString();
    this.online = online;
    this.intrusionDetection = new Binary(file.buffer);
  }
}
