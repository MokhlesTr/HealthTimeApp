import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AdminDto } from 'src/admin/dto/admin.dto';
import { DoctorDto } from 'src/doctor/dto/doctor.dto';
import { RequestState } from 'src/enums/common';

@Schema()
export class RegistrationRequest extends Document {
  @Prop({ required: true })
  state: RequestState;

  @Prop({ required: true })
  senderId: string;

  @Prop({ required: false })
  sender: DoctorDto;

  @Prop({ required: true })
  receiverId: string;

  @Prop({ required: false })
  receiver: AdminDto;

  @Prop({ required: false })
  userId: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}

export const RegistrationRequestSchema =
  SchemaFactory.createForClass(RegistrationRequest);
