import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RdvousDocument = HydratedDocument<Rdvous>;

@Schema({ timestamps: true })
export class Rdvous {
  @Prop()
  sujet: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  startTime: string;

  @Prop({ required: true })
  duration: string;

  @Prop()
  idDoctor: string;

  @Prop()
  idUser: string;

  @Prop()
  Tarif: string;
}

export const RdvousSchema = SchemaFactory.createForClass(Rdvous).pre(
  'save',
  async function () {},
);
