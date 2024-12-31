import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from 'src/users/auth/auth.guard';

@Controller('user-profile')
export class UserProfileController {
  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly postsService: PostsService,
    private readonly usersService: UsersService
  ) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserProfileDto: CreateUserProfileDto) {
    return this.userProfileService.create(createUserProfileDto);
  }

  // @Get(':userId/profile')
  // getposts(@Param('userId') userId: number){
  //   const deets = this.usersService.findOne(userId);
  //   const userposts = this.postsService.getPostsByUser(userId);
  //   return { deets, userposts };
  // }
  @UseGuards(AuthGuard)
  @Get(':userId/profile')
  async getposts(@Param('userId') userId: number) {
    try {
      const userDeets = await this.usersService.findOne2(userId);
      const userPosts = await this.postsService.getPostsByUser(userId);
      return { userDeets, userPosts };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to retrieve user profile and posts.');
    }
  }

}
