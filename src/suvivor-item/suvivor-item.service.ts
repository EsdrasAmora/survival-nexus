import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSuvivorItemDto } from './dto/create-item.dto';
import { createItem, findAllItems } from './survivor-item.generated-queries';

@Injectable()
export class SuvivorItemService {
  async create(createSuvivorItemDto: CreateSuvivorItemDto) {
    const [item] = await createItem.run(createSuvivorItemDto, {} as any);
    if (!item) {
      throw new InternalServerErrorException('Error creating item');
    }
    return item.itemId;
  }

  findAll() {
    return findAllItems.run(undefined, {} as any);
  }
}
