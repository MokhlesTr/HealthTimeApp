import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppointmentService } from './appointements.service';
// import { CreateAppointmentDto } from './dto/create-appointement.dto';
import { UpdateAppointmentDto } from './dto/update-appointement.dto';
import { RdvState } from 'src/enums/common';
// import { Response } from 'express';
import { Appointment } from './entities/appointement.entity';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async create(
    @Body() createAppointmentDto: Partial<Appointment>,
  ): Promise<Appointment> {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get('/All')
  async findAll(): Promise<Appointment[]> {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.appointmentService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return await this.appointmentService.update(id, updateAppointmentDto);
  }

  @Put(':id/accept')
  async acceptAppointment(@Param('id') id: string) {
    return await this.appointmentService.acceptAppointment(id);
  }

  @Put(':id/refuse')
  async refuseAppointment(@Param('id') id: string) {
    return await this.appointmentService.refuseAppointment(id);
  }

  @Get('pending')
  async getPendingAppointments() {
    try {
      return await this.appointmentService.getPendingAppointments();
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('accepted')
  async getAcceptedAppointments() {
    return await this.appointmentService.getAcceptedAppointments();
  }

  @Get('refused')
  async getRefusedAppointments() {
    return await this.appointmentService.getRefusedAppointments();
  }

  @Get('state/:state')
  async getAppointmentsByState(@Param('state') state: RdvState) {
    return await this.appointmentService.getAppointmentsByState(state);
  }
}
