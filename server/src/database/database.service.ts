/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Db, Document, Filter, MongoClient } from 'mongodb';
import 'dotenv/config';
import DataType from '../DataType';
import { CameraIds } from '../validators/camera-id/camera.pipe';
import { FiltersAvailable } from '../validators/filters/filters.pipe';

const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017`;

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
    const array = await this.getRawDataArray("cameras", {
      cameraId: cameraId,
      timestamp: timestamp,
    });
    return array[0].intrusionDetection.buffer;
  }

  async getRawDataArray(
    collection: string,
    filter: Filter<Document>,
    errorString0: string = "Data Not found",
    limit: number = 1,
    errorStringExceed: string = "Too much data found",
  ) {
    const array = await this.DB.collection(collection).find(filter).toArray();

    if (array.length == 0)
      throw new NotFoundException(errorString0);
    if (array.length > limit)
      throw new NotAcceptableException(errorStringExceed);

    return array;
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
}
