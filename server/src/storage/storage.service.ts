import { Injectable } from "@nestjs/common";
import * as fs from "node:fs";

const imagePath = "img";

@Injectable()
export class StorageService {
  secureSaveFile(buffer: NodeJS.ArrayBufferView): string {
    let index = 0;
    if (fs.existsSync(imagePath)) {
      const files = fs.readdirSync(imagePath).map((n) => parseInt(n));

      index = files.length;
      while (files.includes(index)) {
        index++;
      }
    } else {
      fs.mkdirSync(imagePath);
    }
    const path = `${imagePath}/${index}`;
    fs.writeFileSync(path, buffer);
    return path;
  }
}
