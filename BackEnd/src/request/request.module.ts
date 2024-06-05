import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationRequestSchema } from './entites/request.entity';
import { DoctorSchema } from 'src/doctor/entities/doctor.entity';
import { AdminSchema } from 'src/admin/entities/admin.entity';
import { UserSchema } from 'src/users/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RegistrationRequest', schema: RegistrationRequestSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Doctor', schema: DoctorSchema }]),
    MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
