/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPost } from 'src/entities/job-post.entity';
import { CreateJobPostDto } from './dto/create-job-post.dto';
import { User } from 'src/entities/user.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Subscription } from 'src/entities/subscription.entity';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { NotificationService } from 'src/notification/notification.service';
import { CreateNotificationDto } from 'src/notification/dto/notification.dto';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class JobPostsService {
  SubscriptionService: any;
  findOneBy: any;

    //async findOneBy(criteria: Partial<JobPost>): Promise<JobPost | undefined> {
    //  const options: FindOneOptions<JobPost> = { where: criteria };
    //  return this.jobPostRepository.findOne(options);
    //}
  constructor(
    @InjectRepository(JobPost)
    private readonly jobPostRepository: Repository<JobPost>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly subscriptionService: SubscriptionService,
    private readonly notificationService: NotificationService,
  ) { }

  async createJobPost(createJobPostDto: CreateJobPostDto, userId: number): Promise<JobPost> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }


    const isSubscribed = await this.subscriptionService.isUserSubscribed(userId);
    if (!isSubscribed) {
      throw new BadRequestException('User must have an active subscription to create job posts');
    }

    const jobPost = new JobPost();
    jobPost.userName = createJobPostDto.userName;
    jobPost.title = createJobPostDto.title;
    jobPost.description = createJobPostDto.description;
    jobPost.user = user;
    //  jobPost.filePath = filePath;

    await this.jobPostRepository.save(jobPost);
    // const notificationMessage = `${userId} posted a job`;


    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const notificationDto: CreateNotificationDto = {
    //   userId: userId,
    //   message: notificationMessage,
    // };
    // await this.notificationService.createNotification(userId, notificationMessage);

    // return jobPost;
    const notificationMessage = `${createJobPostDto.userName} posted a job`;

    const notificationDto: CreateNotificationDto = {
      userId: userId,
      message: notificationMessage,
      userName: ''
    };
    await this.notificationService.createNotification(notificationDto);

    return jobPost;
  }

  async getAllJobPosts(): Promise<JobPost[]> {
    return this.jobPostRepository.find();
  }

  async getJobPostById(id: number): Promise<JobPost> {
    const jobPost = await this.jobPostRepository.findOne({ where: { id } });
    if (!jobPost) {
      throw new NotFoundException('Job post not found');
    }
    return jobPost;
  }

  async updateJobPost(id: number, updateJobPostDto: CreateJobPostDto): Promise<JobPost> {
    const jobPost = await this.getJobPostById(id);
    jobPost.title = updateJobPostDto.title;
    jobPost.description = updateJobPostDto.description;
    return this.jobPostRepository.save(jobPost);
  }

  async deleteJobPost(id: number): Promise<string> {
    const result = await this.jobPostRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return `Post with ID ${id} deleted successfully`;
  }

 // async getjobPostsByUser(userId: number)
  //{     const jobPost = await this.jobPostRepository.findOneBy({userId: userId});     return jobPost;   }

  async uploadJobCircular(
    id: number,
    uploadJobCircular: Express.Multer.File,
  ) {
    const jobPost = await this.findOneBy({ id: id });
    jobPost.jobcircular = uploadJobCircular.filename;
    const { title, ...response } =
      await this.jobPostRepository.save({
        id,
        ...jobPost,
      });
    return response;
  }


  async getJobCircular(id: number, res) {
    const jobPost = await this.findOneBy({ id: id });
    res.sendFile(jobPost.jobcircular, { root: './uploads' });
  }
  //Sajid
  async countJobPosts(): Promise<number> {
    return this.jobPostRepository.count();
  }

}

