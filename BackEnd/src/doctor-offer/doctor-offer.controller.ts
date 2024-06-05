import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { DoctorOfferService } from './doctor-offer.service';
import { CreateDoctorOfferDto } from './dto/create-doctor-offer.dto';
import { UpdateDoctorOfferDto } from './dto/update-doctor-offer.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';

@Controller('doctor-offer')
export class DoctorOfferController {
  constructor(private readonly doctorOfferService: DoctorOfferService) {}

  @Post('/add')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() data: CreateDoctorOfferDto,
  ) {
    console.log('data ====================>>> ', data);
    return this.doctorOfferService.create(req, res, data);
  }

  @Get()
  findAll() {
    return this.doctorOfferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorOfferService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDoctorOfferDto: UpdateDoctorOfferDto,
  ) {
    return this.doctorOfferService.update(+id, updateDoctorOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorOfferService.remove(+id);
  }
}
