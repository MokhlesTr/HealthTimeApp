import { ApiProperty } from '@nestjs/swagger';
import { DaySlotsDto } from './day-slot.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateDoctorOfferDto {
  @ApiProperty({
    type: String,
    description: 'The hour of the doctor offer',
  })
  @IsNotEmpty()
  dates: DaySlotsDto[];
}
