import { Document } from 'mongoose';

export interface IDoctor extends Document {
  readonly id: string;
  readonly fname: string;
  readonly lname: string;
  readonly specialization: string;
  readonly username: string;
  readonly email: string;
  readonly phone: string;
  readonly age: string;
  readonly gender: string;
  readonly address: string;
  readonly state: number;
  // readonly language: string;
  // readonly university: string;
  readonly wrokTime: string;
  readonly password: string;
  readonly refreshToken: string;
}
