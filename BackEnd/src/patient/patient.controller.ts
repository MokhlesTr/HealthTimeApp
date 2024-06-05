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
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/register')
  create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() data: CreatePatientDto,
  ) {
    return this.patientService.register(req, res, data);
  }

  @Get('/all')
  findAll(@Req() req: Request, @Res() res: Response) {
    return this.patientService.findAll(req, res);
  }

  @Get(':id')
  findOne(@Res() res: Response, @Param('id') id: string) {
    return this.patientService.findOne(res, id);
  }

  @Patch(':id')
  update(
    @Res() res: Response,
    @Param('id') id,
    @Body() data: UpdatePatientDto,
  ) {
    return this.patientService.update(res, id, data);
  }

  @Delete(':id')
  remove(@Res() res: Response, @Param('id') id: string) {
    return this.patientService.remove(res, id);
  }
}
