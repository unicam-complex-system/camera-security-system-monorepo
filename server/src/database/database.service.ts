/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Injectable } from '@nestjs/common';
import { Db, Document, MongoClient } from 'mongodb';
import 'dotenv/config';

const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017`;
type DataType = {
  timestamp: string;
  online?: boolean;
  intrusionDetection?: string;
};

@Injectable()
export class DatabaseService<
  AvailableCameras extends number,
  Filters extends string,
> {
  private DB: Db;

  constructor() {
    const client = new MongoClient(url);

    client.connect();
    this.DB = client.db("complexsd");
  }

  async addData(data: { cameraId: AvailableCameras } & DataType) {
    const col = this.DB.collection(`cameras`);
    return await col.insertOne(data);
  }

  aggregateCamera(filter?: Filters): Promise<Document[]> {
    return this.DB.collection("cameras")
      .aggregate()
      .match(this.getFilter(filter))
      .group({
        _id: "$cameraId",
        count: {
          $sum: 1,
        },
      })
      .toArray();
  }

  private getFilter(filter?: Filters) {
    switch (filter) {
      case "intrusionDetection":
        return {
          intrusionDetection: { $exists: true },
        };
      case "online":
        return {
          online: { $eq: true },
        };
      case "offline":
        return {
          online: { $eq: false },
        };
      case "":
      case "all":
      default:
        return {};
    }
  }
}
