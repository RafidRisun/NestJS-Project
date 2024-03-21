import { Module } from '@nestjs/common';
import { BlockingService } from './blocking.service';
import { BlockingController } from './blocking.controller';

@Module({
  controllers: [BlockingController],
  providers: [BlockingService],
})
export class BlockingModule {}
