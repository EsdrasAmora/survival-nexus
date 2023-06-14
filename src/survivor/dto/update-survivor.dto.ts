import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateSurvivorDto } from './create-survivor.dto';

export class UpdateSurvivorDto extends OmitType(PartialType(CreateSurvivorDto), ['password', 'email']) {}
