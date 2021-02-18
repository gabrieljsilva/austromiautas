import { Expose } from 'class-transformer';
import { IsString, IsEnum, IsLatitude, IsLongitude, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { STATES } from '../../../../shared/enums/STATES';

export class UpdateAddressDTO {
  @ApiProperty({ description: 'Rua/Logradouro', required: false })
  @Expose()
  @IsOptional()
  @IsString()
  street: string;

  @ApiProperty({ description: 'Número', required: false })
  @Expose()
  @IsOptional()
  @IsString()
  number: string;

  @ApiProperty({ description: 'Bairro', required: false })
  @Expose()
  @IsOptional()
  @IsString()
  neighborhood: string;

  @ApiProperty({ description: 'Cidade', required: false })
  @Expose()
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({ description: 'UF', enum: STATES, required: false })
  @Expose()
  @IsOptional()
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
