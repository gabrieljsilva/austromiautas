import { Expose } from 'class-transformer';
import { IsString, IsEnum, IsLatitude, IsLongitude, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { STATES } from '../../../../shared/enums/STATES';

export class CreateAddressDTO {
  @ApiProperty({ description: 'Rua/Logradouro' })
  @Expose()
  @IsString()
  street: string;

  @ApiProperty({ description: 'Número' })
  @Expose()
  @IsString()
  number: string;

  @ApiProperty({ description: 'Bairro' })
  @Expose()
  @IsString()
  neighborhood: string;

  @ApiProperty({ description: 'Cidade' })
  @Expose()
  @IsString()
  city: string;

  @ApiProperty({ description: 'UF', enum: STATES })
  @Expose()
  @IsEnum(STATES)
  state: string;

  @ApiProperty({ description: 'Latitude', required: false })
  @Expose()
  @IsOptional()
  @IsLatitude()
  latitude: number;

  @ApiProperty({ description: 'Longitude', required: false })
  @Expose()
  @IsOptional()
  @IsLongitude()
  longitude: number;
}
