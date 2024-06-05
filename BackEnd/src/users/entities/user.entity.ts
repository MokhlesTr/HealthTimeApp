import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;

//heritage
@Schema({ timestamps: true, discriminatorKey: 'items' })
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  state: number;

  @Prop()
  refreshToken: string;

  @Prop({ required: true })
  role: number;
}

// la methode de hachage dans nestjs
// avant enregistrer on va faire le hachage
export const UserSchema = SchemaFactory.createForClass(User).pre(
  'save',
  async function () {},
);
