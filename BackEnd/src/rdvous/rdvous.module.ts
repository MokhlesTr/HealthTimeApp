// rdvous.module.ts
import { Module } from '@nestjs/common';
import { RdvousService } from './rdvous.service';
import { RdvousController } from './rdvous.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RdvousSchema } from './entities/rdvous.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Rdvous', schema: RdvousSchema }]),
  ],
  providers: [RdvousService],
  controllers: [RdvousController],
  exports: [RdvousService],
})
export class RdvousModule {}
