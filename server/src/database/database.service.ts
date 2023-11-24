/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Db, Document, MongoClient } from 'mongodb';
import 'dotenv/config';
import DataType from '../DataType';
import { CameraIds } from '../validators/camera-id/camera.pipe';
import { FiltersAvailable } from '../validators/filters/filters.pipe';
import UserDTO from '../user.dto';

const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017`;
// type DataType = {
//   timestamp: string;
//   online?: boolean;
//   intrusionDetection?: string;
//   buffer?: Binary;
//
// };

@Injectable()
export class DatabaseService {
  private DB: Db;

  constructor() {
    const client = new MongoClient(url);

    client.connect();
    this.DB = client.db("complexsd");
  }

  async addData(data: DataType<CameraIds>) {
    const col = this.DB.collection(`cameras`);
    return await col.insertOne(data);
  }

  getData(filter?: FiltersAvailable): Promise<Document[]> {
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

  aggregateCamera(filter?: FiltersAvailable): Promise<Document[]> {
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

  async getImage(cameraId: number, timestamp: string): Promise<Buffer> {
    const array = await this.DB.collection("cameras")
      .find({
        cameraId: cameraId,
        timestamp: timestamp,
      })
      .toArray();

    if (array.length == 0)
      throw new HttpException("Data Not found", HttpStatus.NOT_FOUND);
    if (array.length > 1)
      throw new HttpException("Too much data found", HttpStatus.NOT_ACCEPTABLE);

    return array[0].intrusionDetection.buffer;
  }

  private getFilter(filter?: FiltersAvailable) {
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
      case "all":
      default:
        return {};
    }
  }

  async getUser(user: UserDTO) {
    const array = await this.DB.collection("users")
      .find(user)
      .toArray();

    if (array.length == 0)
      throw new HttpException("Data Not found", HttpStatus.NOT_FOUND);
    if (array.length > 1)
      throw new HttpException("Too much data found", HttpStatus.NOT_ACCEPTABLE);

    return array[0];
  }
}
