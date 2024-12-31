import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { User } from 'src/entities/user.entity';
import { Posts } from 'src/entities/post.entity';
import { Forum } from 'src/entities/forum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Posts, Forum])],
  exports: [TypeOrmModule, CommentsService],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule { }
