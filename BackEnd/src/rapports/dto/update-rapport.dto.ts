import { PartialType } from '@nestjs/swagger';
import { CreateRapportDto } from './create-rapport.dto';

export class UpdateRapportDto extends PartialType(CreateRapportDto) {}
