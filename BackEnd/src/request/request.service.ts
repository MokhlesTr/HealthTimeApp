import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegistrationRequest } from './entites/request.entity';
import { IDoctor } from 'src/doctor/Interface/doctor.interface';
import { Admin } from 'typeorm';
import { AccountState, RequestState } from 'src/enums/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel('RegistrationRequest')
    private registrationRequestModel: Model<RegistrationRequest>,
    @InjectModel('Doctor') private readonly doctorModel: Model<IDoctor>,
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async getPendingRequests(req, res) {
    try {
      const registrationRequests = await this.registrationRequestModel.find({
        state: RequestState.pending,
      });

      const requests = await Promise.all(
        registrationRequests?.map(async (request) => {
          const sender = await this.userModel.findOne(
            {
              _id: request?.senderId,
            },
            { password: 0, refreshToken: 0 },
          );

          const receiver = await this.userModel.findOne(
            {
              _id: request?.receiverId,
            },
            { password: 0, refreshToken: 0 },
          );

          return {
            ...request?.toObject(),
            sender,
            receiver,
          };
        }),
      );
      const count = await this.registrationRequestModel
        .find({
          state: RequestState.pending,
        })
        .countDocuments();
      return res.status(HttpStatus.OK).send({
        errCode: null,
        count,
        data: requests,
      });
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errCode: err.errCode,
        message: err.message,
      });
    }
  }

  async findAll(req, res) {
    try {
      const registrationRequests = await this.registrationRequestModel.find();

      const requests = await Promise.all(
        registrationRequests?.map(async (request) => {
          const sender = await this.userModel.findOne(
            {
              _id: request?.senderId,
            },
            { password: 0, refreshToken: 0 },
          );

          const receiver = await this.userModel.findOne(
            {
              _id: request?.receiverId,
            },
            { password: 0, refreshToken: 0 },
          );

          return {
            ...request?.toObject(),
            sender,
            receiver,
          };
        }),
      );
      const count = await this.registrationRequestModel.find().countDocuments();
      return res.status(HttpStatus.OK).send({
        errCode: null,
        count,
        data: requests,
      });
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errCode: err.errCode,
        message: err.message,
      });
    }
  }

  async findOne(req, res, id) {
    try {
      const registrationRequest =
        await this.registrationRequestModel.findById(id);

      const sender = await this.userModel.findOne(
        {
          _id: registrationRequest?.senderId,
        },
        { password: 0, refreshToken: 0 },
      );

      const receiver = await this.userModel.findOne(
        {
          _id: registrationRequest?.receiverId,
        },
        { password: 0, refreshToken: 0 },
      );

      return res.status(HttpStatus.OK).send({
        errCode: null,
        data: {
          ...registrationRequest?.toObject(),
          sender,
          receiver,
        },
      });
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errCode: err.errCode,
        message: err.message,
      });
    }
  }

  async approveRequest(req, res, requestId) {
    const now = new Date();
    try {
      const registrationRequest =
        await this.registrationRequestModel.findById(requestId);

      await this.registrationRequestModel.updateOne(
        { _id: requestId },
        {
          $set: {
            state: RequestState.approved,
            updatedAt: now,
          },
        },
      );

      await this.userModel.updateOne(
        { _id: registrationRequest?.senderId },
        {
          $set: {
            state: AccountState.active,
            updatedAt: now,
          },
        },
      );
      return res.status(HttpStatus.OK).send({
        errCode: null,
        message: 'Your registration request successfully approved !',
      });
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errCode: err.errCode,
        message: err.message,
      });
    }
  }

  async refuseRequest(req, res, requestId) {
    const now = new Date();
    try {
      const registrationRequest =
        await this.registrationRequestModel.findById(requestId);

      await this.registrationRequestModel.updateOne(
        { _id: requestId },
        {
          $set: {
            state: RequestState.refused,
            updatedAt: now,
          },
        },
      );

      await this.userModel.updateOne(
        { _id: registrationRequest?.senderId },
        {
          $set: {
            state: AccountState.inactive,
            updatedAt: now,
          },
        },
      );
      return res.status(HttpStatus.OK).send({
        errCode: null,
        message: 'Your registration request is refused !',
      });
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errCode: err.errCode,
        message: err.message,
      });
    }
  }

  async getApprovedRequests(req, res) {
    try {
      const registrationRequests = await this.registrationRequestModel.find({
        state: RequestState.approved,
      });
  
      const count = await this.registrationRequestModel
        .find({
          state: RequestState.approved,
        })
        .countDocuments();
  
      const requests = await Promise.all(
        registrationRequests?.map(async (request) => {
          const sender = await this.userModel.findOne(
            {
              _id: request?.senderId,
            },
            { password: 0, refreshToken: 0 },
          );
  
          const receiver = await this.userModel.findOne(
            {
              _id: request?.receiverId,
            },
            { password: 0, refreshToken: 0 },
          );
  
          // Fetch additional information about the doctor based on the senderId
          const doctor = await this.doctorModel.findOne({ _id: request.senderId });
  
          return {
            ...request?.toObject(),
            sender,
            receiver,
            doctorState: doctor?.state, // Add doctor state to the response
            doctorId: doctor?._id, // Add doctor ID to the response
          };
        }),
      );
  
      return res.status(HttpStatus.OK).send({
        errCode: null,
        count,
        data: requests,
      });
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errCode: err.errCode,
        message: err.message,
      });
    }
  }
  

  async getRefusedRequests(req, res) {
    try {
      const registrationRequests = await this.registrationRequestModel.find({
        state: RequestState.refused,
      });
      const count = await this.registrationRequestModel
        .find({
          state: RequestState.refused,
        })
        .countDocuments();

      const requests = await Promise.all(
        registrationRequests?.map(async (request) => {
          const sender = await this.userModel.findOne(
            {
              _id: request?.senderId,
            },
            { password: 0, refreshToken: 0 },
          );

          const receiver = await this.userModel.findOne(
            {
              _id: request?.receiverId,
            },
            { password: 0, refreshToken: 0 },
          );

          return {
            ...request?.toObject(),
            sender,
            receiver,
          };
        }),
      );
      return res.status(HttpStatus.OK).send({
        errCode: null,
        count,
        data: requests,
      });
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errCode: err.errCode,
        message: err.message,
      });
    }
  }
  async findAllByState(req: Request, state: number) {
    try {
      const registrationRequests = await this.registrationRequestModel.find({
        state,
      });
      const requests = await Promise.all(
        registrationRequests?.map(async (request) => {
          const sender = await this.userModel.findOne(
            { _id: request?.senderId },
            { password: 0, refreshToken: 0 },
          );

          const receiver = await this.userModel.findOne(
            { _id: request?.receiverId },
            { password: 0, refreshToken: 0 },
          );

          return {
            ...request?.toObject(),
            sender,
            receiver,
          };
        }),
      );
      const count = await this.registrationRequestModel
        .find({ state })
        .countDocuments();
      return {
        errCode: null,
        count,
        data: requests,
      };
    } catch (err) {
      return {
        errCode: err.errCode,
        message: err.message,
      };
    }
  }
}
