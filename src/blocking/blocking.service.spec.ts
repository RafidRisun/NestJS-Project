import { Test, TestingModule } from '@nestjs/testing';
import { BlockingService } from './blocking.service';

describe('BlockingService', () => {
  let service: BlockingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlockingService],
    }).compile();

    service = module.get<BlockingService>(BlockingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
