import { Document } from 'mongoose';
export interface IUser extends Document {
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly gender: string;
  readonly birthday: string;
  readonly address: string;
  readonly phone: string;
  readonly password: string;
  readonly refreshToken: string;
}
