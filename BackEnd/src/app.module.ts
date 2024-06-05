import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module'; // Import DoctorModule here
import { EmailModule } from './email/email.module';
import { RdvousModule } from './rdvous/rdvous.module';
// import { RequestModule } from './request/request.module';
// import { GmailModule } from './gmail/gmail.module';
import { AdminModule } from './admin/admin.module';
import { AdminService } from './admin/admin.service';
import { RequestModule } from './request/request.module';
import { DoctorOfferModule } from './doctor-offer/doctor-offer.module';
import { PatientModule } from './patient/patient.module';
import { RapportsModule } from './rapports/rapports.module';
import { AppointementsModule } from './appointements/appointements.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017', {
      dbName: 'healthTime_V2',
    }),

    ConfigModule.forRoot({ isGlobal: true }),
    EmailModule,
    AuthModule,
    UsersModule,
    RdvousModule,
    AdminModule,
    RequestModule,
    DoctorModule,
    DoctorOfferModule,
    PatientModule,
    RapportsModule,
    AppointementsModule,
    AppointementsModule,
  ],
})
export class AppModule {
  constructor(private readonly adminService: AdminService) {}
  async onModuleInit() {
    await this.adminService.create();
  }
}
