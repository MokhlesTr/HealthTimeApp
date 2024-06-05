import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rapport } from './entities/rapport.entity';
import { CreateRapportDto } from './dto/create-rapport.dto';
import mongoose from 'mongoose';

@Injectable()
export class RapportsService {
  constructor(
    @InjectModel('rapports')
    private readonly rapportModel: mongoose.Model<Rapport>,
  ) {}

  async create(createRapportDto: CreateRapportDto): Promise<Rapport> {
    const newRapport = new this.rapportModel(createRapportDto);
    return await newRapport.save();
  }

  async findAll(): Promise<Rapport[]> {
    return await this.rapportModel.find();
  }

  async findOne(id: string): Promise<Rapport> {
    return await this.rapportModel.findById(id);
  }
}
