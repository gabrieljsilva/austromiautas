import { Expose } from 'class-transformer';
import { Length, IsEnum, IsBoolean, IsString, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IsValidPetAge } from '../../utils/validators/IsValidPetAge';

import { PETS } from '../../../shared/enums/PETS';
import { GENDERS } from '../../../shared/enums/GENDERS';

export class CreatePetDTO {
  @ApiProperty()
  @Expose()
  @Length(2)
  name: string;

  @ApiProperty()
  @Expose()
  @IsEnum(PETS)
  type: PETS;

  @ApiProperty()
  @Expose()
  @IsEnum(GENDERS)
  gender: GENDERS;

  @ApiProperty()
  @Expose()
  @IsBoolean()
  isCastrated: boolean;

  @ApiProperty()
  @Expose()
  @IsBoolean()
  isVaccinated: boolean;

  @ApiProperty()
  @Expose()
  @IsString()
  @Validate(IsValidPetAge)
  approximatedAge: string;

  @ApiProperty()
  @Expose()
  @IsString()
  adoptionReason: string;

  @ApiProperty()
  @Expose()
  @IsString()
  extraInformations: string;
}
