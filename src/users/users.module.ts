import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Posts } from 'src/entities/post.entity';
import { Comment } from 'src/entities/comment.entity';
import { UserProfile } from 'src/entities/user-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Posts, Comment, UserProfile])],
  exports: [TypeOrmModule, UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
