// auth.service.ts
import { Injectable, BadRequestException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorMessages, ErrorsCodes } from 'src/constants/errorCodes';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectModel('User') private readonly userModule: Model<User>,
  ) {}

  // extractUserId(user): string {
  //   const id = user._id.toString();
  //   return id; // Convert ObjectId to string
  // }
  async signIn(data, res): Promise<{ access_token: string }> {
    const { email, password } = data;

    console.log('enter ======================>>>>');

    try {
      const user = await this.userModule.findOne({ email });

      if (!user) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message: ErrorsCodes['ECO-USR-001'],
          errCode: ErrorMessages['ECO-USR-001'],
        });
      }
      console.log('user ========================>>>>', user);
      console.log('user ========================>>>>', user._id);

      if (user?.state === 0 || user?.state === 2) {
        throw new BadRequestException(
          'User is not approved by the administrator',
        );
      } else {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new BadRequestException('Invalid username or password');
        }
        // const payload = { email: user.email };
        const payload = { email: user.email, role: user.role }; // Include role in payload

        const accessToken = await this.jwtService.signAsync(payload, {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        });

        return res.status(HttpStatus.OK).send({
          errCode: null,
          data: accessToken,
          role: user.role, // Return role in response
          id: user._id,
        });
      }
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: err.message,
        errCode: err.message,
      });
    }
  }
}
