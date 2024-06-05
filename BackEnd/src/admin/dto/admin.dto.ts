import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AdminDto {
  @ApiProperty({
    type: String,
    description: 'The user of the admin',
  })
  @IsNotEmpty()
  userId: string;
}
