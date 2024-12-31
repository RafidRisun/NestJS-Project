import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsfeedController } from './newsfeed.controller';
import { NewsfeedService } from './newsfeed.service';
import { FriendModule } from '../friend/friend.module';
import { UsersModule } from '../users/users.module';
import { JobPost } from '../entities/job-post.entity';
import { Posts } from '../entities/post.entity';
import { Forum } from '../entities/forum.entity';
import { events } from '../entities/event.entity';
import { Comment } from '../entities/comment.entity';
import { FriendService } from '../friend/friend.service';
import { User } from 'src/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([JobPost, Posts, Forum, events, Comment, User]),
        FriendModule,
        UsersModule,
    ],
    controllers: [NewsfeedController],
    providers: [NewsfeedService, FriendService],
})
export class NewsfeedModule { }
