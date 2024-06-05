import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { refreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { AdminService } from './admin.service';
import { AdminDocument } from './entities/admin.entity';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create() {
    try {
      return await this.adminService.create();
    } catch (error) {
      throw new BadRequestException('Failed to create admin');
    }
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard) // Protect this route with AccessTokenGuard
  @Get()
  async findAll(): Promise<AdminDocument[]> {
    try {
      return await this.adminService.findAll();
    } catch (error) {
      throw new BadRequestException('Failed to retrieve admins');
    }
  }

  @ApiBearerAuth('refresh-token')
  @UseGuards(refreshTokenGuard) // Protect this route with refreshTokenGuard
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AdminDocument> {
    try {
      return await this.adminService.findById(id);
    } catch (error) {
      throw new BadRequestException('Failed to find admin');
    }
  }
}
