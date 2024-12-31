import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, UseGuards, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Badge } from 'src/entities/badge.entity';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { MulterError, diskStorage } from 'multer';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) { }


  @UseGuards(AuthGuard)
  @Post(':id/createPost')
  async create(@Body() createPostDto: CreatePostDto, @Param('id') id: number) {
    const userId = id;
    return this.postsService.create(createPostDto, userId);
  }



  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }


  @UseGuards(AuthGuard)
  @Get(':userId/posts')
  async getPostsByUser(@Param("userId") userId: number) {
    return await this.postsService.getPostsByUser(userId);
  }


  @UseGuards(AuthGuard)
  @Post(':id/like')
  async likePost(@Param('id') id: number) {
    const result = await this.postsService.likePost(id);
    return result;
  }

  @UseGuards(AuthGuard)
  @Post(':id/dislike')
  async dislikePost(@Param('id') id: number) {
    const result = await this.postsService.dislikePost(id);
    return result;
  }

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    console.log(file);
    return { message: 'File uploaded successfully', file: file.filename };
  }

  @UseGuards(AuthGuard)
  @Get('/getimage/:name')
  getImages(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './uploads' })
  }


  @UseGuards(AuthGuard)
  @Get('totallikes/:userId')
  async getTotalLikesByUserId(@Param('userId') userId: number): Promise<number> {
    return this.postsService.getTotalLikesByUserId(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':userId/badges')
  async getUserBadges(@Param('userId') userId: number): Promise<Badge[]> {
    return this.postsService.getUserBadges(userId);
  }

  //Humayra
  @UseGuards(AuthGuard)
  @Post(':id/uploadPostPhoto')
  @UseInterceptors(
    FileInterceptor('postPhoto', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 10000000 },
      storage: diskStorage({
        destination: './upload',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  uploadPostPhoto(@UploadedFile() postPhoto: Express.Multer.File, @Param('id', ParseIntPipe) id: number) {
    return this.postsService.uploadPostPhoto(id, postPhoto);
  }

  //Humayra
  @UseGuards(AuthGuard)
  @Get(':id/getPostPhoto')
  getPostPhoto(@Param('id', ParseIntPipe) id: number, @Res() res) {
    return this.postsService.getPostPhoto(id, res);
  }

}
