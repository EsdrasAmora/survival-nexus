import { PartialType } from '@nestjs/mapped-types';
import { CreateSurvivorDto } from './create-survivor.dto';

export class UpdateSurvivorDto extends PartialType(CreateSurvivorDto) {}
