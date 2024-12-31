import { Controller, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Res, UseGuards } from '@nestjs/common';
import { NewsfeedService } from './newsfeed.service';
import { JobPost } from 'src/entities/job-post.entity';
import { Posts } from 'src/entities/post.entity';
import { Forum } from 'src/entities/forum.entity';
import { events } from 'src/entities/event.entity';
import { Comment } from 'src/entities/comment.entity';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { PostsService } from 'src/posts/posts.service';

@Controller('newsfeed')
export class NewsfeedController {
    constructor(private readonly newsfeedService: NewsfeedService) { }

    @UseGuards(AuthGuard)
    @Get(':userId')
    async getFriendPosts(@Param('userId') userId: number): Promise<{ jobPosts: JobPost[], posts: Posts[], forums: Forum[], events: events[], comments: Comment[] }> {
        try {
            return await this.newsfeedService.getFriendPosts(userId);
        } catch (error) {
            throw new HttpException('Empty Feed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(AuthGuard)
    @Get(':userId/:friendId/getPostPhoto')
    async getPostPhoto(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('friendId', ParseIntPipe) friendId: number,
        @Res() res: Response
    ): Promise<void> {
        try {
            await this.newsfeedService.getPostPhoto(userId, friendId, res);
        } catch (error) {
            throw new HttpException('Empty Feed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
