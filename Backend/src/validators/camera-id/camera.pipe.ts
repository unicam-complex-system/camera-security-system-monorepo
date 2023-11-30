import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CameraValidator implements PipeTransform {
  transform(value: string): CameraIds {
    const cameraId = parseInt(value) as CameraIds;

    if (!cameraIds.includes(cameraId)) {
      throw new HttpException(
        "Invalid camera Id " + cameraId,
        HttpStatus.BAD_REQUEST,
      );
    }

    return cameraId;
  }
}

export const cameraIds = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export type CameraIds = (typeof cameraIds)[number];

