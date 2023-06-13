import { Test, TestingModule } from '@nestjs/testing';
import { SuvivorItemController } from './suvivor-item.controller';
import { SuvivorItemService } from './suvivor-item.service';

describe('SuvivorItemController', () => {
  let controller: SuvivorItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuvivorItemController],
      providers: [SuvivorItemService],
    }).compile();

    controller = module.get<SuvivorItemController>(SuvivorItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
