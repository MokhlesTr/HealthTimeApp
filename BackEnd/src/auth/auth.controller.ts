import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin/user')
  async signinUser(@Body() data: UserDto, @Res() res: Response) {
    await this.authService.signIn(data, res);
  }
}
