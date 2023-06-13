import { Test, TestingModule } from '@nestjs/testing';
import { SuvivorItemService } from './suvivor-item.service';

describe('SuvivorItemService', () => {
  let service: SuvivorItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuvivorItemService],
    }).compile();

    service = module.get<SuvivorItemService>(SuvivorItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
