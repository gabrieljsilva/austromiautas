import { Expose } from 'class-transformer';
import { IsString, IsEnum, IsLatitude, IsLongitude, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { STATES } from '../../../../shared/enums/STATES';

export class UpdateAddressDTO {
  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  @IsString()
  street: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  @IsString()
  number: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  @IsString()
  neighborhood: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({ enum: STATES, required: false })
  @Expose()
  @IsOptional()
  @IsEnum(STATES)
  state: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  @IsLatitude()
  latitude: number;

  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  @IsLongitude()
  longitude: number;
}
