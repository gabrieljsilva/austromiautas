import { Expose } from 'class-transformer';
import { Length, IsEnum, IsBoolean, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PETS } from '../../../shared/enums/PETS';
import { GENDERS } from '../../../shared/enums/GENDERS';

export class UpdatePetDTO {
  @ApiProperty()
  @Expose()
  @Length(2)
  @IsOptional()
  name: string;

  @ApiProperty()
  @Expose()
  @IsEnum(PETS)
  @IsOptional()
  type: PETS;

  @ApiProperty()
  @Expose()
  @IsEnum(GENDERS)
  @IsOptional()
  gender: GENDERS;

  @ApiProperty()
  @Expose()
  @IsBoolean()
  @IsOptional()
  isCastrated: boolean;

  @ApiProperty()
  @Expose()
  @IsBoolean()
  @IsOptional()
  isVaccinated: boolean;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  // custom validator here
  approximatedAge: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  adoptionReason: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  extraInformations: string;
}
