import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDocument } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { AccountState, UserRole } from 'src/enums/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Admin') private adminModel: Model<AdminDocument>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async create() {
    const now = new Date();
    //check if there is an admin
    const adminCount = await this.adminModel.find().countDocuments();
    // if admin table is empty ,create admin account
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('healthTime2024', 8);
      await this.userModel
        .create({
          email: 'healthTime@gmail.com',
          password: hashedPassword,
          state: AccountState.active,
          role: UserRole.ADMIN,
          createdAt: now,
        })
        .then(async (user) => {
          await this.adminModel.create({
            userId: user?._id,
            createdAt: now,
          });
        });
    }
  }

  async findAll(): Promise<AdminDocument[]> {
    return this.adminModel.find().exec();
  }

  async findById(id: string): Promise<AdminDocument> {
    return this.adminModel.findById(id);
  }

  async findByUsername(username: string): Promise<AdminDocument> {
    return this.adminModel.findOne({ username }).exec();
  }
}
