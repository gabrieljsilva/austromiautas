import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TransformPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const object = plainToClass(metatype, value, { strategy: 'excludeAll' });
    return object;
  }
}
