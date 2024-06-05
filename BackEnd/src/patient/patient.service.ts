import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from './entities/patient.entity';
import { Model } from 'mongoose';
import { AccountState, UserRole } from 'src/enums/common';
import { ErrorMessages, ErrorsCodes } from 'src/constants/errorCodes';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel('Patient') private readonly patientModel: Model<Patient>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async register(req, res, data) {
    const now = new Date();
    try {
      const {
        firstName,
        lastName,
        email,
        gender,
        birthday,
        address,
        phone,
        password,
      } = data;

      const patient = await this.patientModel.findOne({
        email,
        role: UserRole.PATIENT,
      });

      if (patient) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message: ErrorsCodes['ECO-USR-001'],
          errCode: ErrorMessages['ECO-USR-001'],
        });
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      await this.userModel
        .create({
          email,
          password: hashedPassword,
          state: AccountState.active,
          role: UserRole.PATIENT,
          createdAt: now,
        })
        .then(async (user) => {
          await this.patientModel.create({
            firstName,
            lastName,
            gender,
            birthday,
            address,
            phone,
            userId: user?._id,
            createdAt: now,
          });
        });

      return res.status(HttpStatus.OK).send({
        errCode: '',
        message: ErrorMessages['ECO-PAT-001'],
      });
    } catch (err) {
      console.log('err ===============>>> ', err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errCode: err.errCode,
        message: err.message,
      });
    }
  }

  async findAll(req, res) {
    const patients = await this.patientModel.find();
    const filteredPatients = await Promise.all(
      patients?.map(async (person) => {
        const user = await this.userModel.findOne(
          {
            _id: person?.userId,
          },
          { password: 0, refreshToken: 0 },
        );

        return {
          ...person?.toObject(),
          user,
        };
      }),
    );
    const count = await this.patientModel.find();
    return res.status(HttpStatus.OK).send({
      errCode: null,
      count,
      data: filteredPatients,
    });
  }

  async findOne(res, id) {
    const patient = await this.patientModel.findById(id);
    const user = await this.userModel.findOne(
      {
        _id: patient?.userId,
      },
      { password: 0, refreshToken: 0 },
    );
    return res.status(HttpStatus.OK).send({
      errCode: null,
      data: {
        ...patient?.toObject(),
        user,
      },
    });
  }

  async update(res, id, data) {
    const now = new Date();
    try {
      console.log('data ===============>>> ', data);

      await this.patientModel.updateOne(
        { _id: id },
        {
          $set: {
            data,
            updatedAt: now,
          },
        },
      );

      return res.status(HttpStatus.OK).send({
        errCode: '',
        message: ErrorMessages['ECO-PAT-002'],
      });
    } catch (err) {
      console.log('err ===============>>> ', err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errCode: err.errCode,
        message: err.message,
      });
    }
  }

  async remove(res, id) {
    try {
      await this.patientModel.deleteOne({ _id: id });
      return res.status(HttpStatus.OK).send({
        errCode: '',
        message: ErrorMessages['ECO-PAT-003'],
      });
    } catch (err) {
      console.log('err ===============>>> ', err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errCode: err.errCode,
        message: err.message,
      });
    }
  }
}
