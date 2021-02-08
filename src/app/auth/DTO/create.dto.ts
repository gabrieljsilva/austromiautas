import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDTO {
  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  password: string;
}
