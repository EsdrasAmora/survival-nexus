import { Injectable } from '@nestjs/common';
import { CreateSuvivorItemDto } from './dto/create-item.dto';
import { createItem, findAllItems } from './survivor-item.queries.generated';
import { DbClient } from '../shared/db.service';

@Injectable()
export class SuvivorItemService {
  constructor(private dbClient: DbClient) {}

  async create(createSuvivorItemDto: CreateSuvivorItemDto) {
    const [item] = await createItem.run(createSuvivorItemDto, this.dbClient);
    return item.itemId;
  }

  findAll() {
    return findAllItems.run(undefined, this.dbClient);
  }
}
