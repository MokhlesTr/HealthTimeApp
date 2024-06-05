import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from './users.service';
import { CreatePasswordDto } from './dto/create-password';

@Controller('User')
@ApiTags('User')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  findAll() {
    return this.UserService.findAll();
  }

  @ApiBearerAuth('access-token')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.UserService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.UserService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.UserService.remove(id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string, @Res() response) {
    try {
      const patient = await this.UserService.findByEmail(email);
      if (!patient) {
        return response.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: 'Aucun patient trouvé avec cet e-mail',
          data: null,
        });
      }
      return response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Patient trouvé avec succès',
        data: patient,
      });
    } catch (error) {
      console.error(
        'Erreur lors de la recherche du patient par e-mail :',
        error,
      );
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Erreur lors de la recherche du patient par e-mail',
        data: null,
      });
    }
  }

  @Get('role/:role')
  async findByRole(@Param('role') role: string, @Res() response) {
    try {
      const users = await this.UserService.findByRole(role);
      if (!users || users.length === 0) {
        return response.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: 'No users found with this role',
          data: null,
        });
      }
      return response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Users found successfully',
        data: users,
      });
    } catch (error) {
      console.error('Error while finding users by role:', error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error while finding users by role',
        data: null,
      });
    }
  }

  @Patch(':id/update-password')
  async updatePassword(
    @Param('id') id: string,
    @Body() createPasswordDto: CreatePasswordDto,
  ) {
    return this.UserService.updatePassword(id, createPasswordDto);
  }

  @Post('reset-password')
  async resetPassword(
    @Body('email') email: string,
    @Body('newPassword') newPassword: string,
    @Res() res,
  ) {
    try {
      const user = await this.UserService.resetPassword(email, newPassword);
      return res.status(HttpStatus.OK).json({
        message: 'Password reset successfully',
        data: user,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
}
