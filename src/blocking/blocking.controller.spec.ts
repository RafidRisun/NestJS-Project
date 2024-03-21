import { Test, TestingModule } from '@nestjs/testing';
import { BlockingController } from './blocking.controller';
import { BlockingService } from './blocking.service';

describe('BlockingController', () => {
  let controller: BlockingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockingController],
      providers: [BlockingService],
    }).compile();

    controller = module.get<BlockingController>(BlockingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
