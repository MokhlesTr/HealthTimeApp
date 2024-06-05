// rdvous.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RdvousDocument, Rdvous } from './entities/rdvous.entity';
import { CreateRdvousDto } from './dto/create-rdvous.dto';
import { UpdateRdvousDto } from './dto/update-doctor.dto';

@Injectable()
export class RdvousService {
  constructor(
    @InjectModel('Rdvous') private rdvousModel: Model<RdvousDocument>,
  ) {}

  async create(createRdvousDto: CreateRdvousDto): Promise<Rdvous> {
    const createdRdvous = new this.rdvousModel(createRdvousDto);
    return createdRdvous.save();
  }

  async findAll(): Promise<Rdvous[]> {
    return this.rdvousModel.find().exec();
  }

  async findOne(id: string): Promise<Rdvous> {
    return this.rdvousModel.findById(id).exec();
  }

  async update(id: string, updateRdvousDto: UpdateRdvousDto): Promise<Rdvous> {
    return this.rdvousModel
      .findByIdAndUpdate(id, updateRdvousDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Rdvous> {
    return this.rdvousModel.findByIdAndDelete(id).exec();
  }
}
