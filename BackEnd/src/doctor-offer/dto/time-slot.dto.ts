import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TimeSlotsDto {
  @ApiProperty({
    type: String,
    description: 'The hour of the doctor offer',
  })
  @IsNotEmpty()
  hour: string;

  @ApiProperty({
    type: String,
    description: 'The duration of the doctor offer',
  })
  @IsNotEmpty()
  duration: string;
}
