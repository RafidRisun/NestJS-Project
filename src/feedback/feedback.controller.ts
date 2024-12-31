import { Controller, Post, Get, Body, UseGuards, Param } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from 'src/feedback/dto/create-feedback.dto';
import { Feedback } from 'src/entities/feedback.entity';
import { AuthGuard } from 'src/users/auth/auth.guard';

@Controller('feedback')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) { }

    @UseGuards(AuthGuard)
    @Post(':userId')
    async createFeedback(@Body() createFeedbackDto: CreateFeedbackDto, @Param('userId') userId: number): Promise<Feedback> {
        return this.feedbackService.create(createFeedbackDto, userId);
    }

    @UseGuards(AuthGuard)
    @Get()
    async findAll(): Promise<Feedback[]> {
        return this.feedbackService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get(':userId')
    async findOne(@Param('userId') userId: string): Promise<Feedback[]> {
        return this.feedbackService.findOne(parseInt(userId, 10));
    }
}
