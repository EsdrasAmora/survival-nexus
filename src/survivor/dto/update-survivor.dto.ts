import { PartialType } from '@nestjs/swagger';
import { CreateSurvivorDto } from './create-survivor.dto';

export class UpdateSurvivorDto extends PartialType(CreateSurvivorDto) {}
