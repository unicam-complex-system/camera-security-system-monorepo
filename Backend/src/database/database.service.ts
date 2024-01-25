/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import {
  Db,
  Document,
  Filter,
  MatchKeysAndValues,
  MongoClient,
  WithId,
} from 'mongodb';
import 'dotenv/config';
import DataType from '../DataType';
import { FiltersAvailable } from '../validators/filters/filters.pipe';
import * as process from 'process';
import * as bcrypt from 'bcrypt';
import { cameraIds } from '../camera.config';

const url = `${process.env.MONGO_PROTOCOL ?? 'mongodb'}://${
  process.env.MONGO_INITDB_ROOT_USERNAME
}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}`;

@Injectable()
export class DatabaseService {
  private DB: Db;

  // If no user exists it automatically creates one with the default credentials in env file
  async initDBUser() {
    const size = await this.DB.collection('users').countDocuments();
    if (size == 0) {
      await this.DB.collection(`users`).insertOne({
        name: process.env.CSD_USER,
        password: bcrypt.hashSync(
          process.env.CSD_PASSWORD,
          process.env.BCRYPT_SALT,
        ),
      });
    }
    // If the user exists but the password is not hashed it will hash it
    // This should not be needed but for safety we keep it
    await this.DB.collection('users').findOneAndUpdate(
      {
        name: process.env.CSD_USER,
        password: process.env.CSD_PASSWORD,
      },
      {
        $set: {
          password: bcrypt.hashSync(
            process.env.CSD_PASSWORD,
            process.env.BCRYPT_SALT,
          ),
        },
      },
    );
  }

  // If no camera exists it automatically creates one with the default config in camera.config.ts file
  async initCameras() {
    const size = await this.DB.collection('camera_names').countDocuments();
    if (size == 0) {
      await this.DB.collection(`camera_names`).insertMany(
        cameraIds.map((id) => ({ id: id, name: 'No name' })),
      );
    }
  }

  constructor() {
    const client = new MongoClient(url);

    this.DB = client.db('csd');
    this.initDBUser();
    this.initCameras();
  }

  async addData(data: DataType<number>) {
    const col = this.DB.collection(`cameras`);
    return await col.insertOne(data);
  }

  getData(
    filter: FiltersAvailable,
    limit: number = undefined,
    step: number = undefined,
  ): Promise<Document[]> {
    const res = this.DB.collection('cameras')
      .aggregate([
        {
          $addFields: {
            intrusionDetection: {
              $cond: {
                if: {
                  $ifNull: ['$intrusionDetection', false],
                },
                then: true,
                else: false,
              },
            },
          },
        },
      ])
      .match(this.getFilter(filter));
    if (limit != undefined && step != undefined)
      return res
        .skip(limit * step)
        .limit(limit)
        .toArray();
    else return res.toArray();
  }

  getCameras(): Promise<Document[]> {
    return this.DB.collection('camera_names').find().toArray();
  }

  aggregateCamera(filter?: FiltersAvailable): Promise<Document[]> {
    return this.DB.collection('cameras')
      .aggregate()
      .match(this.getFilter(filter))
      .group({
        _id: '$cameraId',
        count: {
          $sum: 1,
        },
      })
      .toArray();
  }

  async getImage(cameraId: number, timestamp: string): Promise<Buffer> {
    const array = await this.getRawDataArray('cameras', {
      cameraId: cameraId,
      timestamp: timestamp,
    });
    return array[0].intrusionDetection.buffer;
  }

  async getRawDataArray(
    collection: string,
    filter: Filter<Document> = {},
    errorString0: string = 'Data Not found',
    limit: number = 1,
    errorStringExceed: string = 'Too much data found',
  ): Promise<WithId<Document>[]> {
    const array = await this.DB.collection(collection).find(filter).toArray();

    if (array.length == 0) throw new NotFoundException(errorString0);
    if (array.length > limit)
      throw new NotAcceptableException(errorStringExceed);

    return array;
  }

  async checkAndUpdateUser(
    user: Filter<Document>,
    newData: MatchKeysAndValues<Document>,
  ) {
    await this.getRawDataArray('users', user, 'User Not found');

    return this.DB.collection('users').updateOne(user, {
      $set: newData,
    });
  }

  private getFilter(filter?: FiltersAvailable) {
    switch (filter) {
      case 'intrusionDetection':
        return {
          intrusionDetection: { $eq: true },
        };
      case 'online':
        return {
          online: { $eq: true },
        };
      case 'offline':
        return {
          online: { $eq: false },
        };
      case 'all':
      default:
        return {};
    }
  }

  async setChannelName(id: number, name: string) {
    const col = this.DB.collection(`camera_names`);
    return await col.updateOne(
      { id: id },
      {
        $set: {
          id: id,
          name: name,
        },
      },
      {
        upsert: true,
      },
    );
  }

  async getChannelName(id?: number) {
    const filter = id == undefined ? {} : { id: id };

    const arrayRes = await this.DB.collection('camera_names')
      .find(filter)
      .toArray();

    if (arrayRes.length == 0)
      throw new NotFoundException('Camera name not found');

    const array = arrayRes.map((value) => ({
      id: value.id,
      name: value.name,
    }));

    return id == undefined ? array : array[0].name;
  }

  // TODO TESTME
  // Returns NVR info such as IP address and available channels
  async getNVRData(): Promise<Document> {
    const array = await this.getOtherwiseInsert(
      'General',
      {
        name: 'NVR',
      },
      {
        name: 'NVR',
        ip: process.env.NVR_IP_ADDRESS,
        channels: cameraIds,
      },
    );

    return {
      ip: process.env.NVR_IP_ADDRESS,
      channels: array[0].channels,
    };

    // try {
    //   const array = await this.getRawDataArray('General', {
    //     name: 'NVR',
    //   });
    //   return array[0];
    // } catch (e) {
    //   if (e instanceof NotFoundException) {
    //     const data = {
    //       name: 'NVR',
    //       ip: process.env.NVR_IP_ADDRESS,
    //       channels: [0, 1, 2, 3, 4, 5, 6, 7],
    //     };
    //
    //     await this.DB.collection(`General`).insertOne(data);
    //     return data;
    //   } else {
    //     console.error(e);
    //   }
    // }
  }

  async getOtherwiseInsert(
    name: string,
    filter: Filter<Document>,
    data: Document,
  ): Promise<WithId<Document>[]> {
    const size = await this.DB.collection(name).countDocuments(filter);

    if (size == 0) {
      await this.DB.collection(name).insertOne(data);
    }

    return await this.getRawDataArray(name, filter);
  }
}
