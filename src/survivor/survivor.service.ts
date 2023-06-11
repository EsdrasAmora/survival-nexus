import { Injectable } from '@nestjs/common';
import { CreateSurvivorDto } from './dto/create-survivor.dto';
import { UpdateSurvivorDto } from './dto/update-survivor.dto';

@Injectable()
export class SurvivorService {
  create(createSurvivorDto: CreateSurvivorDto) {
    return 'This action adds a new survivor';
  }

  findAll() {
    return `This action returns all survivor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} survivor`;
  }

  update(id: number, updateSurvivorDto: UpdateSurvivorDto) {
    return `This action updates a #${id} survivor`;
  }

  remove(id: number) {
    return `This action removes a #${id} survivor`;
  }
}
