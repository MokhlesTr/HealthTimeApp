import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<Patient>;

//heritage
@Schema({ timestamps: true, discriminatorKey: 'items' })
export class Patient {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  // @Prop({ unique: true })
  // email: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  birthday: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ required: true })
  userId: string;
}

// la methode de hachage dans nestjs
// avant enregistrer on va faire le hachage
export const PatientSchema = SchemaFactory.createForClass(Patient).pre(
  'save',
  async function () {},
);
