import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { TimeSlotsDto } from './time-slot.dto';

export class DaySlotsDto {
  @ApiProperty({
    type: String,
    description: 'The day of the doctor offer',
  })
  @IsNotEmpty()
  day: Date;

  @ApiProperty({
    type: String,
    description: 'The hour of the doctor offer',
  })
  @IsNotEmpty()
  hours: TimeSlotsDto[];
}
