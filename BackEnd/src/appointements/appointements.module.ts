// appointements.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentService } from './appointements.service';
import { AppointmentController } from './appointements.controller';
import { Appointment, AppointmentSchema } from './entities/appointement.entity'; // Import both model and schema

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema }, // Use the model's name property
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointementsModule {}
