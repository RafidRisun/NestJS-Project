import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/users/auth/auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @UseGuards(AuthGuard)
  @Post('create/:userId/:postId')
  create1(@Body() createCommentDto: CreateCommentDto, @Param('userId') userId: number, @Param('postId') postId:  number) {
    createCommentDto.userId = userId;
    createCommentDto.postId = postId;
    return this.commentsService.create1(createCommentDto, userId, postId);
  }

  @UseGuards(AuthGuard)
  @Post('create/:userId/forum/:forumId')
  create2(@Body() createCommentDto: CreateCommentDto, @Param('userId') userId: number, @Param('forumId') forumId:  number) {
    createCommentDto.userId = userId;
    createCommentDto.forumId = forumId;
    return this.commentsService.create2(createCommentDto, userId, forumId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Get("post/:postId/comments")
  async getCommentsByPost(@Param('postId') postId: number) {
    return await this.commentsService.getCommentByPost(postId);
  }

  @UseGuards(AuthGuard)
  @Get("forum/:forumId/comments")
  async getCommentsByForum(@Param('forumId') forumId: number) {
    return await this.commentsService.getCommentByForum(forumId);
  }

}
