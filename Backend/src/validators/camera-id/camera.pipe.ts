import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PositiveNumberValidator implements PipeTransform {
  transform(value?: string): number | undefined {
    console.log(value);
    if (value === undefined || value == ',') return undefined;

    const cameraId = parseInt(value);

    if (cameraId < 0) {
      throw new BadRequestException('Camera id must be positive');
    }

    return cameraId;
  }
}
