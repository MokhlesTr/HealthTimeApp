import { Module } from '@nestjs/common';
import { DoctorOfferService } from './doctor-offer.service';
import { DoctorOfferController } from './doctor-offer.controller';
import { DoctorOfferSchema } from './entities/doctor_offer.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DoctorOffer', schema: DoctorOfferSchema },
    ]),
  ],
  controllers: [DoctorOfferController],
  providers: [DoctorOfferService],
})
export class DoctorOfferModule {}
