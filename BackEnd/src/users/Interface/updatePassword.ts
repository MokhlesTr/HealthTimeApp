import { Document } from 'mongoose';
export interface IUpdatePassword extends Document {
  newPassword: string;
  confirmPassword: string;
}
