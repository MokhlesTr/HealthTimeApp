import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, discriminatorKey: 'items' })
export class Doctor extends Document {
  @Prop({ required: true })
  fname: string;

  @Prop({ required: true })
  lname: string;

  @Prop({ required: true })
  specialization: string;

  @Prop({ unique: true, sparse: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  age: string;

  @Prop()
  gender: string;

  @Prop()
  address: string;

  @Prop()
  state: number;
  @Prop({ required: true })
  userId: string;
  // @Prop()
  // picture: string;

  // @Prop()
  // language: string;

  // @Prop()
  // diplomaYear: string;

  // @Prop()
  // university: string;

  @Prop()
  wrokTime: string;

  @Prop()
  password: string;

  @Prop()
  refreshToken: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor).pre(
  'save',
  async function () {
    if (!this.id) {
      this.id = new Date().valueOf().toString();
    }
  },
);
