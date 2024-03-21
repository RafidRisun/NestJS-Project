import { Controller, Get, Post, Body } from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  create(@Body() createFaqDto: CreateFaqDto) {
    const userId = createFaqDto.userId;
    return this.faqService.create(createFaqDto, userId);
  }

  @Get()
  allfaq() {
    return this.faqService.allfaq();
  }
}



