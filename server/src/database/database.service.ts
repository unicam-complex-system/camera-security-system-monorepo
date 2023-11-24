/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Db, Document, MongoClient } from 'mongodb';
import 'dotenv/config';
import DataType from '../DataType';

const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017`;
// type DataType = {
//   timestamp: string;
//   online?: boolean;
//   intrusionDetection?: string;
//   buffer?: Binary;
//
// };

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

  async addData(data: DataType<AvailableCameras>) {
    const col = this.DB.collection(`cameras`);
    return await col.insertOne(data);
  }

  async getData(filter?: Filters): Promise<Document[]> {
    return this.DB.collection("cameras")
      .aggregate([
        {
          $addFields: {
            intrusionDetection: {
              $cond: {
                if: {
                  $ifNull: ["$intrusionDetection", false],
                },
                then: true,
                else: false,
              },
            },
          },
        },
      ])
      .match(this.getFilter(filter))

      .toArray();
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

  async getImage(cameraId: number, timestamp: string): Promise<any> {
    const array = await this.DB.collection("cameras")
      .find({
        cameraId: cameraId,
        timestamp: timestamp,
      })
      .toArray();

    if (array.length == 0)
      throw new HttpException("Too much data found", HttpStatus.NOT_ACCEPTABLE);

    return array[0].intrusionDetection.buffer;
  }



  private getFilter(filter?: Filters) {
    switch (filter) {
      case "intrusionDetection":
        return {
          intrusionDetection: { $eq: true },
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
