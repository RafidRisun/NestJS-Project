import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/entities/user.entity';
import { FeedbackModule } from 'src/feedback/feedback.module';
import { FriendModule } from 'src/friend/friend.module';
import { eventModule } from 'src/event/event.module';
import { JobPostModule } from 'src/job-post/job-post.module';
import { ForumModule } from 'src/forum/forum.module';
import { PostsModule } from 'src/posts/posts.module';
import { messageModule } from 'src/message/message.module';
import { CommentsModule } from 'src/comments/comments.module';
import { walletModule } from 'src/wallet/wallet.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), UsersModule, walletModule, SubscriptionModule, CommentsModule, FeedbackModule, messageModule, FriendModule, eventModule, JobPostModule, ForumModule, PostsModule],
    controllers: [DashboardController],
})
export class DashboardModule { }
