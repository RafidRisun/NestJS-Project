import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from 'src/entities/feedback.entity';
import { CreateFeedbackDto } from 'src/feedback/dto/create-feedback.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class FeedbackService {
    constructor(
        @InjectRepository(Feedback)
        private readonly feedbackRepository: Repository<Feedback>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createFeedbackDto: CreateFeedbackDto, userId: number): Promise<Feedback> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const feedback = new Feedback();
        feedback.user = user;
        feedback.feedback = createFeedbackDto.feedback;
        feedback.oneWeekUser = createFeedbackDto.oneWeekUser;

        return this.feedbackRepository.save(feedback);
    }


    async findAll(): Promise<Feedback[]> {
        return this.feedbackRepository.find();
    }
    async findOne(userId: number): Promise<Feedback[]> {
        return this.feedbackRepository.find({ where: { user: { id: userId } } });
    }

    async getTotalFeedbacks(): Promise<number> {
        return this.feedbackRepository.count();
    }
}
