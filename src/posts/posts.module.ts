import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Badge } from 'src/entities/badge.entity';
import { Comment } from 'src/entities/comment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Posts, User, Badge, Comment])],
  exports: [TypeOrmModule, PostsService],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule { }
