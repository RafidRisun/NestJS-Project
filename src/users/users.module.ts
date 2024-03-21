import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Post } from 'src/entities/post.entity';
import { Comment } from 'src/entities/comment.entity';
import { PostsController } from 'src/posts/posts.controller';
import { CommentsController } from 'src/comments/comments.controller';
import { PostsService } from 'src/posts/posts.service';
import { CommentsService } from 'src/comments/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Post]), TypeOrmModule.forFeature([Comment])],
  controllers: [UsersController, PostsController, CommentsController],
  providers: [UsersService, PostsService, CommentsService],
})
export class UsersModule {}