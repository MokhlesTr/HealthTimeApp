import { PartialType } from '@nestjs/swagger';
import { CreatePasswordDto } from './create-password';

export class UpdatePasswordDto extends PartialType(CreatePasswordDto) {}
