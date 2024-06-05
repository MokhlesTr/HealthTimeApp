import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//import { Doctor, DoctorDocument } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { IDoctor } from './Interface/doctor.interface';
import { AccountState, RequestState, UserRole } from 'src/enums/common';
import { Admin } from 'src/admin/entities/admin.entity';
import { RegistrationRequest } from 'src/request/entites/request.entity';
import { ErrorMessages, ErrorsCodes } from 'src/constants/errorCodes';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel('Doctor') private readonly doctorModel: Model<IDoctor>,
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
    @InjectModel('RegistrationRequest')
    private readonly registrationRequestModel: Model<RegistrationRequest>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async register(req, res, data: CreateDoctorDto) {
    try {
      const now = new Date();

      const {
        email,
        password,
        fname,
        lname,
        specialization,
        phone,
        age,
        gender,
        address,
      } = data;

      const doctor = await this.doctorModel.findOne({
        email,
        role: UserRole.DOCTOR,
      });

      if (doctor) {
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
          state: AccountState.pending,
          role: UserRole.DOCTOR,
          createdAt: now,
        })
        .then(async (user) => {
          await this.doctorModel.create({
            fname,
            lname,
            specialization,
            phone,
            age,
            gender,
            address,
            userId: user?._id,
            createdAt: now,
          });
          const admin = await this.adminModel.findOne();
          await this.registrationRequestModel.create({
            state: RequestState.pending,
            senderId: user?._id,
            receiverId: admin?.userId,
            createdAt: now,
          });
        });

      return res.status(HttpStatus.OK).send({
        errCode: '',
        message: ErrorMessages['ECO-DOC-001'],
      });
    } catch (err) {
      console.log('err ==============>>> ', err);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errCode: err.errCode,
        message: err.message,
      });
    }
  }

  async findAll(): Promise<IDoctor[]> {
    return this.doctorModel.find().exec();
  }
  async findByUsername(username: string): Promise<IDoctor> {
    return this.doctorModel.findOne({ username }).exec();
  }

  async getApprovedDoctors(): Promise<IDoctor[]> {
    return this.doctorModel.find({ state: AccountState.active }).exec();
  }
  // nehnee genkiii

  // youfa genki

  async getRefusedDoctors(): Promise<IDoctor[]> {
    return this.doctorModel.find({ state: AccountState.inactive }).exec();
  }

  // async findOne(id: string): Promise<IDoctor> {
  //   return this.doctorModel.findById(id).exec();
  // }
  async findOne(id: string) {
    try {
      // Fetch the doctor data from the Doctor table
      const doctor = await this.doctorModel.findById(id).exec();

      if (!doctor) {
        return null;
      }

      // Fetch additional data from the User table using the doctor's ID
      const userData = await this.userModel.findOne({ doctorId: id }).exec();

      if (!userData) {
        return doctor;
      }

      // Merge the data from both tables
      const mergedData = {
        ...doctor.toObject(),
        email: userData.email,

        // Add more fields as needed
      };
      console.log('mergedData', mergedData);

      return mergedData;
    } catch (error) {
      throw new Error(`Error fetching doctor data: ${error.message}`);
    }
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<IDoctor> {
    return this.doctorModel
      .findByIdAndUpdate(id, updateDoctorDto, {
        new: true,
      })
      .exec();
  }

  async remove(id: string): Promise<IDoctor> {
    return this.doctorModel.findByIdAndDelete(id).exec();
  }
  async findByEmail(email: string): Promise<IDoctor | null> {
    try {
      const doctor = await this.doctorModel.findOne({ email }).exec();
      return doctor || null; // Retourner null si aucun médecin n'est trouvé
    } catch (error) {
      console.error(
        'Erreur lors de la recherche du médecin par e-mail :',
        error,
      );
      throw new Error('Erreur lors de la recherche du médecin par e-mail.');
    }
  }

  async findByRole(role: number): Promise<IDoctor[]> {
    return this.doctorModel.find({ role }).exec();
  }
}
