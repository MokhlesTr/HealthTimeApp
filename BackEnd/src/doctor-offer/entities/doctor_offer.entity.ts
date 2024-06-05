import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OfferState } from 'src/enums/common';
import { DaySlotsDto } from '../dto/day-slot.dto';

@Schema()
export class DoctorOffer extends Document {
  @Prop({ required: true })
  state: OfferState;

  @Prop({ required: true })
  doctor: string;

  @Prop({ required: true })
  dates: DaySlotsDto[];

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}

export const DoctorOfferSchema = SchemaFactory.createForClass(DoctorOffer);
