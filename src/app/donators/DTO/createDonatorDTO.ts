import { Expose, Transform } from 'class-transformer';
import { Matches, IsEmail, Length, IsDateString, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IsCPF } from '../../utils/validators/IsCPF';
import { IsCNPJ } from '../../utils/validators/IsCNPJ';
import { IsValidBirth } from '../../utils/validators/IsValidBirth';

export class CreateDonatorDTO {
  @ApiProperty({ required: true, description: 'name of physical or juridical person that will be registered' })
  @Expose()
  @Length(2, 128, { groups: ['cpf', 'cnpj'] })
  name: string;

  @ApiProperty({ required: true, description: 'e-mail of user that will be used to authentication' })
  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase() : value)) // transform to lowercase
  @IsEmail({}, { groups: ['cpf', 'cnpj'] })
  email: string;

  @ApiProperty({
    required: true,
    description: 'password of user that will be used to authentication',
    minLength: 8,
    maxLength: 16,
  })
  @Expose()
  @Length(8, 16, { groups: ['cpf', 'cnpj'] })
  password: string;

  @ApiProperty({
    required: true,
    description: 'type of user that will determine wich document will be stored',
    enum: ['cpf', 'cnpj'],
  })
  @Expose()
  @Matches(/^cpf$|^cnpj$/, { groups: ['deterministic'], message: "type should be 'cpf' or 'cnpj'" })
  type: string;

  @ApiProperty({ required: true, description: 'cpf or cpnj of user' })
  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? value.replace(/[^\d]+/g, '') : value)) // Remove dots and dashs
  @Validate(IsCPF, { groups: ['cpf'] })
  @Validate(IsCNPJ, { groups: ['cnpj'] })
  document: string;

  @ApiProperty({ required: false, description: 'user birth in case type equals to cpf: format yyyy-mm-dd' })
  @Expose({ groups: ['cpf'] })
  @IsDateString({ strict: false }, { groups: ['cpf'] })
  @Validate(IsValidBirth, { groups: ['cpf'] })
  birth: Date;
}
