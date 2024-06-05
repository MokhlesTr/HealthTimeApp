import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop()
  userId: string;

  @Prop({ required: true })
  createdAt: Date;
}

// la methode de hachage dans nestjs
// avant enregistrer on va faire le hachage
export const AdminSchema = SchemaFactory.createForClass(Admin).pre(
  'save',
  async function () {},
);
