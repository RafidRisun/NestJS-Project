import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService
  ){}


  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const userId = createPostDto.userId;
    return this.postsService.create(createPostDto, userId);
  }



  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // async create(@Body() createPostDto: CreatePostDto, @UploadedFile() file) {
  //   const userId = createPostDto.userId;
  //   return this.postsService.create(createPostDto, userId, file.filename);
  // }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }


  @Get(':userId/posts')
  async getPostsByUser(@Param("userId") userId: number) {
    return await this.postsService.getPostsByUser(userId);
  }


  @Post(':id/like')
  async likePost(@Param('id') id: number) {
    const result = await this.postsService.likePost(id);
    return result;
  }

  @Post(':id/dislike')
  async dislikePost(@Param('id') id: number) {
    const result = await this.postsService.dislikePost(id);
    return result;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file){
    console.log(file);
    return {message: 'File uploaded successfully', file: file.filename};
  }

  @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res){
      res.sendFile(name, { root: './uploads'})
    }


  @Get('totallikes/:userId')
  async getTotalLikesByUserId(@Param('userId') userId: number): Promise<number> {
    return this.postsService.getTotalLikesByUserId(userId);
  }

}
