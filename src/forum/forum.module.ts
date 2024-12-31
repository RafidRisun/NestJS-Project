import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { Forum } from 'src/entities/forum.entity';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Forum, User, Comment])],
  exports: [TypeOrmModule, ForumService],
  controllers: [ForumController],
  providers: [ForumService],
})
export class ForumModule { }
