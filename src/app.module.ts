import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FeedbackModule } from './feedback/feedback.module';
import { FriendModule } from './friend/friend.module';
import { JobPostModule } from './job-post/job-post.module';
import { AboutUsModule } from './about-us/about-us.module';
import { NewsfeedModule } from './newsfeed/newsfeed.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { JobPost } from './entities/job-post.entity';
import { AboutUs } from './entities/about-us.entity';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './users/auth/auth.module';
import { AuthAdminModule } from './admin/authAdmin/authAdmin.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { eventModule } from './event/event.module';
import { walletModule } from './wallet/wallet.module';
import { messageModule } from './message/message.module';
import { CommentsModule } from './comments/comments.module';
import { FaqModule } from './faq/faq.module';
import { ForumModule } from './forum/forum.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { NotificationModule } from './notification/notification.module';
import { oneWeekUserMiddleware } from './feedback/onewWeekUser.middleware';

@Module({
  imports: [UsersModule, AuthModule, AuthAdminModule, NotificationModule, CommentsModule, SubscriptionModule, FaqModule, ForumModule, UserProfileModule, DashboardModule, FeedbackModule, eventModule, messageModule, walletModule, FriendModule, JobPostModule, NewsfeedModule, PostsModule, AboutUsModule, TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([JobPost]), TypeOrmModule.forFeature([AboutUs])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(oneWeekUserMiddleware)
      .forRoutes('feedback/:userId');
  }
}
