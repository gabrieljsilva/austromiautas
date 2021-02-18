import { Expose } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CONTACTS } from '../../../../shared/enums/CONTACTS';

export class CreateContactDTO {
  @ApiProperty()
  @Expose()
  @IsEnum(CONTACTS)
  type: string;

  @ApiProperty()
  @Expose()
  @IsString()
  contact: string;
}
