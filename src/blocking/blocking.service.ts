import { Injectable } from '@nestjs/common';
import { CreateBlockingDto } from './dto/create-blocking.dto';
import { UpdateBlockingDto } from './dto/update-blocking.dto';

@Injectable()
export class BlockingService {
  create(createBlockingDto: CreateBlockingDto) {
    return 'This action adds a new blocking';
  }

  findAll() {
    return `This action returns all blocking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blocking`;
  }

  update(id: number, updateBlockingDto: UpdateBlockingDto) {
    return `This action updates a #${id} blocking`;
  }

  remove(id: number) {
    return `This action removes a #${id} blocking`;
  }
}
