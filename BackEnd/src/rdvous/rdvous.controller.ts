// rdvous.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RdvousService } from './rdvous.service';
import { CreateRdvousDto } from './dto/create-rdvous.dto';
import { UpdateRdvousDto } from './dto/update-doctor.dto';

@Controller('rdvous')
export class RdvousController {
  constructor(private readonly rdvousService: RdvousService) {}

  @Post()
  create(@Body() createRdvousDto: CreateRdvousDto) {
    return this.rdvousService.create(createRdvousDto);
  }

  @Get()
  findAll() {
    return this.rdvousService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rdvousService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRdvousDto: UpdateRdvousDto) {
    return this.rdvousService.update(id, updateRdvousDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rdvousService.remove(id);
  }
}
