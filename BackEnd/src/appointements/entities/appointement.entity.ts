import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Appointment extends Document {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  state: number;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  doctorId: number;

  @Prop({ required: true })
  patientId: number;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
