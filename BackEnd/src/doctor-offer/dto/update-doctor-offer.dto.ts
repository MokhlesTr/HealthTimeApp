import { PartialType } from '@nestjs/swagger';
import { CreateDoctorOfferDto } from './create-doctor-offer.dto';

export class UpdateDoctorOfferDto extends PartialType(CreateDoctorOfferDto) {}
