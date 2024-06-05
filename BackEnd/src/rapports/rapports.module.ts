import { Module } from '@nestjs/common';
import { RapportsService } from './rapports.service';
import { RapportsController } from './rapports.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RapportSchema } from './entities/rapport.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'rapports', schema: RapportSchema }]),
  ],
  controllers: [RapportsController],
  providers: [RapportsService],
  exports: [RapportsService],
})
export class RapportsModule {}
