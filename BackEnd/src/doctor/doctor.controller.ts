// doctor.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createDoctorDto: CreateDoctorDto,
  ) {
    return this.doctorService.register(req, res, createDoctorDto);
  }

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get('/approved')
  getPendingDoctors() {
    return this.doctorService.getApprovedDoctors();
  }
  @Get('/refused')
  getrefuseDoctors() {
    return this.doctorService.getRefusedDoctors();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(id);
  }

  @Get('/role/:role')
  findByRole(@Param('role') role: number) {
    return this.doctorService.findByRole(role);
  }
}
