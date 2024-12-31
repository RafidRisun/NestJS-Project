import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from 'src/entities/feedback.entity';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { User } from 'src/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Feedback, User])],
    exports: [TypeOrmModule, FeedbackService],
    providers: [FeedbackService],
    controllers: [FeedbackController],
})
export class FeedbackModule { }
