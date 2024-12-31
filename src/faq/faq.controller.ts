import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { Faq } from 'src/entities/faq.entity';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) { }

  @UseGuards(AuthGuard)
  @Post(':id')
  create(@Param('id') id: number, @Body() createFaqDto: CreateFaqDto) {
    const userId = id;
    return this.faqService.create(createFaqDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  allfaq() {
    return this.faqService.allfaq();
  }
  @Get('/admin')
  async findAllFAQS(): Promise<Faq[]> {
    return this.faqService.findAllFAQS();
  }
}



