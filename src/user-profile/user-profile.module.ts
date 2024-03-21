import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from 'src/entities/user-profile.entity';
import { User } from 'src/entities/user.entity';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { PostsModule } from 'src/posts/posts.module';
import { Post } from 'src/entities/post.entity';

@Module({
  imports: [PostsModule, TypeOrmModule.forFeature([UserProfile, User, Post])],
  controllers: [UserProfileController],
  providers: [UserProfileService, PostsService, UsersService],
})
export class UserProfileModule {}
