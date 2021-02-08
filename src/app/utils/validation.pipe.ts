import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException, HttpStatus } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype, type, data }: ArgumentMetadata) {
    const DTO = plainToClass(metatype, value, { strategy: 'excludeAll' });
    const errors = await validate(DTO);

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

    return DTO;
  }
}
