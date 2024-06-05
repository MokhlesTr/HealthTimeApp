import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorSchema } from './entities/doctor.entity';
import { DoctorService } from './doctor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from 'src/admin/entities/admin.entity';
import { RegistrationRequestSchema } from 'src/request/entites/request.entity';
import { UserSchema } from 'src/users/entities/user.entity';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Doctor', schema: DoctorSchema }]),
    MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
    MongooseModule.forFeature([
      { name: 'RegistrationRequest', schema: RegistrationRequestSchema },
    ]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService],
})
export class DoctorModule {}
