import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RapportsService } from './rapports.service';
import { CreateRapportDto } from './dto/create-rapport.dto';

@Controller('rapports')
export class RapportsController {
  constructor(private readonly rapportsService: RapportsService) {}

  @Post()
  create(@Body() createRapportDto: CreateRapportDto) {
    return this.rapportsService.create(createRapportDto);
  }

  @Get()
  findAll() {
    return this.rapportsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.rapportsService.findOne(id);
  }
}
