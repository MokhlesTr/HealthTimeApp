import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateDoctorOfferDto } from './dto/update-doctor-offer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DoctorOffer } from './entities/doctor_offer.entity';
import { Model } from 'mongoose';
import { OfferState } from 'src/enums/common';

@Injectable()
export class DoctorOfferService {
  constructor(
    @InjectModel('DoctorOffer')
    private readonly doctorOfferModal: Model<DoctorOffer>,
  ) {}

  async create(req, res, data) {
    const now = new Date();
    const { _id } = req?.user;
    try {
      await this.doctorOfferModal.create({
        ...data,
        state: OfferState.published,
        doctorId: _id,
        createdAt: now,
      });
      return res.status(200).json({
        message: 'Doctor appointement offer has been created successfully !',
      });
    } catch (err) {
      console.log('err ==============>>> ', err);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errCode: err.errCode,
        message: err.message,
      });
    }
  }

  findAll() {
    return `This action returns all doctorOffer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctorOffer`;
  }

  update(id: number, updateDoctorOfferDto: UpdateDoctorOfferDto) {
    return `This action updates a #${updateDoctorOfferDto} doctorOffer`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctorOffer`;
  }
}
