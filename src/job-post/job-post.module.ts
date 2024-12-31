/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPostsController } from './job-posts.controller';
import { JobPostsService } from './job-posts.service';
import { JobPost } from 'src/entities/job-post.entity';
import { UsersModule } from 'src/users/users.module';
//import { SubscriptionService } from 'src/subscription/subscription.service';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { NotificationModule } from 'src/notification/notification.module';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobPost]), UsersModule, SubscriptionModule, NotificationModule],
  exports: [TypeOrmModule, JobPostsService],
  controllers: [JobPostsController],
  providers: [JobPostsService, NotificationService],
})
export class JobPostModule { }