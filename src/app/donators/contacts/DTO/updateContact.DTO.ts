import { Expose } from 'class-transformer';
import { IsEnum, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CONTACTS } from '../../../../shared/enums/CONTACTS';

export class UpdateContactDTO {
  @ApiProperty()
  @Expose()
  @IsEnum(CONTACTS)
  @IsOptional()
  type: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  contact: string;
}
