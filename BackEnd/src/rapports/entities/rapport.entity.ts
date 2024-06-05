import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RdvousDocument = HydratedDocument<Rapport>;

@Schema()
export class Rapport {
  @Prop()
  patient: string;

  @Prop()
  appointmentDate: string;

  @Prop()
  description: string;

  @Prop({ type: [{ name: String, dosage: String, duration: String }] })
  prescription: { name: string; dosage: string; duration: string }[];
}

export const RapportSchema = SchemaFactory.createForClass(Rapport);
