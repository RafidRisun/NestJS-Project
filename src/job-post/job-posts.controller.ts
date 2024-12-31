/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Put, Delete, Param, UseInterceptors, UploadedFile, ParseIntPipe, Res, UseGuards, /*UploadedFile, UseInterceptors*/ } from '@nestjs/common';
import { JobPostsService } from './job-posts.service';
import { CreateJobPostDto } from './dto/create-job-post.dto';
import { JobPost } from 'src/entities/job-post.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { AuthGuard } from 'src/users/auth/auth.guard';

@Controller('job-posts')
export class JobPostsController {
  constructor(private readonly jobPostsService: JobPostsService) { }

  @UseGuards(AuthGuard)
  @Post()
  async createJobPost(
    @Body() createJobPostDto: CreateJobPostDto,

  ) {
    const userId = createJobPostDto.userId;
   
    return this.jobPostsService.createJobPost(createJobPostDto, userId);
  }
 
  //@Get(':userId/posts')
 // async getjobPostsByUser(@Param("userId") userId: number) {
   // return await this.jobPostsService.getjobPostsByUser(userId);
  //}

  @UseGuards(AuthGuard)
  @Get()
  async getAllJobPosts(): Promise<JobPost[]> {
    return this.jobPostsService.getAllJobPosts();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getJobPostById(@Param('id') id: number): Promise<JobPost> {
    return this.jobPostsService.getJobPostById(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateJobPost(@Param('id') id: number, @Body() updateJobPostDto: CreateJobPostDto) {
    return this.jobPostsService.updateJobPost(id, updateJobPostDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteJobPost(@Param('id') id: number) {
    return this.jobPostsService.deleteJobPost(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/uploadJobCircular')
  @UseInterceptors(
    FileInterceptor('jobcircular', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 10000000 },
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  uploadJobCircular(@UploadedFile() jobcircular: Express.Multer.File, @Param('id', ParseIntPipe) id: number) {
    return this.jobPostsService.uploadJobCircular(id, jobcircular);
  }

  @UseGuards(AuthGuard)
  @Get(':id/getJobCircular')
  getJobCircular(@Param('id', ParseIntPipe) id: number, @Res() res) {
    return this.jobPostsService.getJobCircular(id, res);
  }
}

