import { Test, TestingModule } from '@nestjs/testing';
import { SurvivorService } from './survivor.service';

describe('SurvivorService', () => {
  let service: SurvivorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurvivorService],
    }).compile();

    service = module.get<SurvivorService>(SurvivorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
