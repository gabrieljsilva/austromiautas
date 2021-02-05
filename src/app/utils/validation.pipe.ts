import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException, HttpStatus } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe<T = any> implements PipeTransform<T> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const object = plainToClass(metatype, value, { strategy: 'excludeAll' });
    const errors = await validate(object);

    if (errors.length > 0) {
      const errorsDto = errors.map((error) => {
        return {
          property: error.property,
          constraints: error.constraints,
        };
      });

      throw new BadRequestException({
        message: 'Bad Request',
        status: HttpStatus.BAD_REQUEST,
        errors: errorsDto,
      });
    }

    return object;
  }
}
