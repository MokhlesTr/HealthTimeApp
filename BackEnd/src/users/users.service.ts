import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interface/user.interface';
import { CreatePasswordDto } from './dto/create-password';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async findAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }
  async findById(id: string): Promise<IUser> {
    return this.userModel.findById(id);
  }
  async findByUsername(username: string): Promise<IUser> {
    return this.userModel.findOne({ username }).exec();
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }
  async remove(id: string): Promise<IUser> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    try {
      const patient = await this.userModel.findOne({ email }).exec();
      return patient || null; // Retourner null si aucun patient n'est trouvé
    } catch (error) {
      console.error(
        'Erreur lors de la recherche du patient par e-mail :',
        error,
      );
      throw new Error('Erreur lors de la recherche du patient par e-mail.');
    }
  }
  async findByRole(role: string): Promise<IUser[]> {
    try {
      return this.userModel.find({ role }).exec();
    } catch (error) {
      console.error('Error while finding users by role:', error);
      throw new Error('Error while finding users by role.');
    }
  }

  // async updatePassword(
  //   id: string,
  //   createPasswordDto: CreatePasswordDto,
  // ): Promise<IUser> {
  //   const { newPassword } = createPasswordDto;
  //   // const hashedPassword = await argon2.hash(newPassword); // Hashing the new password
  //   return this.userModel
  //     .findByIdAndUpdate(id, { password: newPassword }, { new: true })
  //     .exec();
  // }

  async resetPassword(email: string, newPassword: string): Promise<IUser> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.userModel
      .findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true })
      .exec();
  }

  async updatePassword(
    id: string,
    createPasswordDto: CreatePasswordDto,
  ): Promise<IUser> {
    const { newPassword } = createPasswordDto;
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hashing the new password
    return this.userModel
      .findByIdAndUpdate(id, { password: hashedPassword }, { new: true })
      .exec();
  }
}
