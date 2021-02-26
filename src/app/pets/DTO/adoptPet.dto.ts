import { Expose } from 'class-transformer';
import { Length, Validate, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IsCPF } from '../../utils/validators/IsCPF';

export class AdoptPetDTO {
  @ApiProperty()
  @Expose()
  @Length(2)
  adopterName: string;

  @ApiProperty()
  @Expose()
  @Validate(IsCPF, { message: 'adoperCPF must be a valid cpf' })
  adopterCPF: string;

  @ApiProperty()
  @Expose()
  @IsDateString()
  adopterBirth: string;
}
