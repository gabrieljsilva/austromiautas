import { Expose } from 'class-transformer';
import { Matches, IsEmail, Length, IsDateString, Validate, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IsCPF } from '../../utils/validators/IsCPF';
import { IsCNPJ } from '../../utils/validators/IsCNPJ';

export class CreateDonatorDTO {
  @ApiProperty()
  @Expose()
  @Length(2, 128, { groups: ['cpf', 'cnpj'] })
  name: string;

  @ApiProperty()
  @Expose()
  @IsEmail({}, { groups: ['cpf', 'cnpj'] })
  email: string;

  @ApiProperty()
  @Expose()
  @Length(8, 16, { groups: ['cpf', 'cnpj'] })
  password: string;

  @ApiProperty()
  @Expose()
  @Matches(/^cpf$|^cnpj$/, { groups: ['deterministic'], message: "type should be 'cpf' or 'cnpj'" })
  type: string;

  @ApiProperty()
  @Expose()
  @Validate(IsCPF, { groups: ['cpf'] })
  @Validate(IsCNPJ, { groups: ['cnpj'] })
  document: string;

  @ApiProperty()
  @Expose({ groups: ['cpf'] })
  @IsDateString({ strict: false }, { groups: ['cpf'] })
  birth: Date;

  @ApiProperty()
  @Expose({ groups: ['cpf', 'cnpj'] })
  @IsUrl({ require_tld: false }, { groups: ['cpf', 'cnpj'] })
  frontEndActivationUrl: string;
}
