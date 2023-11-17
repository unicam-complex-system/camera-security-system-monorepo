/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Injectable } from "@nestjs/common";
import { MongoClient } from "mongodb";
import * as console from 'console';
import "dotenv/config"

const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017`;

const collections: Array<string> = [
  "camera1",
  "camera2",
  "camera3",
  "camera4",
  "camera5",
  "camera6",
  "camera7",
  "camera8",
  "camera9",
];

const collectionView = collections.map((collection) => {
  return {
    $unionWith: {
      coll: collection,
      pipeline: [
        {
          $addFields: {
            sourceCollection: collection,
          },
        },
        // Add additional pipeline stages if needed for each collection
      ],
    },
  };
});

@Injectable()
export class DatabaseService {
  async createView() {
    const db = getDB();
    console.log(url)


    if (await db.listCollections({ name: "all_cameras_view" }).hasNext()) {
      console.log("View already exists");
      return;
    }
    const pipeline = collectionView;

    await db.createCollection("all_cameras_view", {
      viewOn: collections[0],
      pipeline,
    });
  }
}

// mongodb.
function getDB() {
  const client = new MongoClient(url);

  client.connect();
  return client.db("complexsd");
}
