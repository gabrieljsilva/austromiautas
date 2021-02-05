import { Length, IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty()
  @Length(1, 128)
  @Expose()
  name: string;

  @ApiProperty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty()
  @Length(8, 16)
  @Expose()
  password: string;
}
