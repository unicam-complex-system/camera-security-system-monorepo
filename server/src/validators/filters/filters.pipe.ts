import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from "@nestjs/common";

@Injectable()
export class FiltersValidator implements PipeTransform {
  transform(value: string) {
    if (!filters.includes(value as FiltersAvailable)) {
      throw new HttpException(
        `Invalid filter "${value}", the available filters are ${filters}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }
}

export const filters = [
  "intrusionDetection",
  "online",
  "offline",
  "all",
] as const;
export type FiltersAvailable = (typeof filters)[number];
