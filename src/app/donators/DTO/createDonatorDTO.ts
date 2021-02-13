import { Expose, Transform, TransformFnParams } from 'class-transformer';
import { Matches, IsEmail, Length, IsDateString, Validate, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IsCPF } from '../../utils/validators/IsCPF';
import { IsCNPJ } from '../../utils/validators/IsCNPJ';

export class CreateDonatorDTO {
  @ApiProperty({ required: true, description: 'name of physical or juridical person that will be registered' })
  @Expose()
  @Length(2, 128, { groups: ['cpf', 'cnpj'] })
  name: string;

  @ApiProperty({ required: true, description: 'e-mail of user that will be used to authentication' })
  @Expose()
  @Transform((email) => email.value.toLowerCase())
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
  @Validate(IsCPF, { groups: ['cpf'] })
  @Validate(IsCNPJ, { groups: ['cnpj'] })
  @Transform((document) => document.value.replace(/[^\d]+/g, ''))
  document: string;

  @ApiProperty({ required: false, description: 'user birth in case type equals to cpf' })
  @Expose({ groups: ['cpf'] })
  @IsDateString({ strict: false }, { groups: ['cpf'] })
  birth: Date;

  @ApiProperty({
    required: true,
    description:
      "the url that will be sent by email to compose the account confirmation link. This Url will receive a query param called 'token'.",
  })
  @Expose({ groups: ['cpf', 'cnpj'] })
  @IsUrl({ require_tld: false }, { groups: ['cpf', 'cnpj'] })
  frontEndActivationUrl: string;
}
