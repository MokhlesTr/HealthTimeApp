// appointements.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from './entities/appointement.entity';
// import { CreateAppointmentDto } from './dto/create-appointement.dto';
import { UpdateAppointmentDto } from './dto/update-appointement.dto';
import { RdvState } from 'src/enums/common';
import { Logger } from '@nestjs/common';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel('Appointment')
    private appointmentModel: Model<Appointment>,
  ) {}

  async create(appointmentData: Partial<Appointment>): Promise<Appointment> {
    return this.appointmentModel.create(appointmentData);
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel.find().exec();
  }

  async findById(id: string): Promise<Appointment> {
    return this.appointmentModel.findById(id).exec();
  }

  async findOne(id: string): Promise<Appointment> {
    return this.appointmentModel.findById(id).exec();
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<void> {
    await this.appointmentModel
      .findByIdAndUpdate(id, updateAppointmentDto)
      .exec();
  }

  // async remove(id: string): Promise<void> {
  //   await this.appointmentModel.findByIdAndRemove(id).exec();
  // }

  async acceptAppointment(id: string): Promise<void> {
    await this.appointmentModel
      .findByIdAndUpdate(id, { state: RdvState.accepted })
      .exec();
  }

  async refuseAppointment(id: string): Promise<void> {
    await this.appointmentModel
      .findByIdAndUpdate(id, { state: RdvState.refused })
      .exec();
  }

  logger = new Logger('AppointmentService');

  async getPendingAppointments(): Promise<Appointment[]> {
    try {
      const pendingAppointments = await this.appointmentModel
        .find({ state: RdvState.pending })
        .exec();
      return pendingAppointments;
    } catch (error) {
      this.logger.error('Error fetching pending appointments', error);
      throw new Error('Error fetching pending appointments');
    }
  }

  async getAcceptedAppointments(): Promise<Appointment[]> {
    return this.appointmentModel.find({ state: RdvState.accepted }).exec();
  }

  async getRefusedAppointments(): Promise<Appointment[]> {
    return this.appointmentModel.find({ state: RdvState.refused }).exec();
  }

  async getAppointmentsByState(state: RdvState): Promise<Appointment[]> {
    return this.appointmentModel.find({ state }).exec();
  }
}
