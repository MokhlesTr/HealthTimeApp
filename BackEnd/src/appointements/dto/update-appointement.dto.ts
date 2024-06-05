import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointement.dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {}
