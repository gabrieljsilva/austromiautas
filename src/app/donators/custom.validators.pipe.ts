import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException, HttpStatus } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { CreateDonatorDTO } from './DTO/createDonatorDTO';

@Injectable()
export class ValidateDonatorPipe implements PipeTransform {
  async transform(value: CreateDonatorDTO, argumentMetadata: ArgumentMetadata) {
    try {
      /** Deterministic group is used to determine which group of validation will be performed
       *  based on type of donator
       */
      const deterministcDTO = plainToClass(CreateDonatorDTO, value, {
        strategy: 'excludeAll',
        groups: ['deterministic'],
      });
      await validateOrReject(deterministcDTO, { groups: ['deterministic'] });

      const DTO = plainToClass(CreateDonatorDTO, value, { strategy: 'excludeAll', groups: [deterministcDTO.type] });
      await validateOrReject(DTO, { groups: [deterministcDTO.type] });

      return DTO;
    } catch (errors) {
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
    }
  }
}
