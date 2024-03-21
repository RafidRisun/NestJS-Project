import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlockingService } from './blocking.service';
import { CreateBlockingDto } from './dto/create-blocking.dto';
import { UpdateBlockingDto } from './dto/update-blocking.dto';

@Controller('blocking')
export class BlockingController {
  constructor(private readonly blockingService: BlockingService) {}

  @Post()
  create(@Body() createBlockingDto: CreateBlockingDto) {
    return this.blockingService.create(createBlockingDto);
  }

  @Get()
  findAll() {
    return this.blockingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blockingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlockingDto: UpdateBlockingDto) {
    return this.blockingService.update(+id, updateBlockingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blockingService.remove(+id);
  }
}
