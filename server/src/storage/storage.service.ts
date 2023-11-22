import { Injectable } from "@nestjs/common";
import * as fs from 'fs';


@Injectable()
export class StorageService {
  imagePath: string = "img";

  secureSaveFile(filename: string, buffer: NodeJS.ArrayBufferView| string): string {
    if (!fs.existsSync(this.imagePath)) {
      fs.mkdirSync(this.imagePath);
    }
    const path = `${this.imagePath}/${filename}`;
    fs.writeFileSync(path, buffer);
    return path;
  }
}
