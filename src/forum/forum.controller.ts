import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { Forum } from 'src/entities/forum.entity';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) { }

  @UseGuards(AuthGuard)
  @Post(':id/create')
  create(@Param('id') id: number, @Body() createForumDto: CreateForumDto) {
    const userId = id;
    return this.forumService.create(createForumDto, userId);
  }

  //Sajid
  @UseGuards(AuthGuard)
  @Get('/')
  async getForumPosts(@Query('subString') subString: string): Promise<Forum[]> {
    if (subString) {
      return this.forumService.getForumPosts(subString);
    } else {
      return this.forumService.findAll();
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  find() {
    return this.forumService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.forumService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateForumDto: UpdateForumDto) {
    return this.forumService.update(id, updateForumDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.forumService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Get(":userId/forums")
  async getForumByuser(@Param("userId") userId: number) {
    return await this.forumService.getForumByUser(userId);
  }





}
