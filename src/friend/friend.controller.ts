import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
    ParseIntPipe,
    ValidationPipe,
    UseGuards,
    UseInterceptors,
    Delete,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendRequestDto } from './dto/friend-request.dto';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from 'src/users/auth/auth.guard';

@Controller('friends')
export class FriendController {
    constructor(private readonly friendService: FriendService) { }

    @UseGuards(AuthGuard)
    @Post(':receiverId/request')
    async sendFriendRequest(@Body('senderId') senderId: number, @Param('receiverId') receiverId: number): Promise<Object> {
        return await this.friendService.sendFriendRequest(senderId, receiverId);
    }

    @UseGuards(AuthGuard)
    @Post(':senderId/accept')
    async acceptFriendRequest(@Param('senderId') senderId: number, @Body('receiverId') receiverId: number): Promise<Object> {
        return await this.friendService.acceptFriendRequest(senderId, receiverId);
    }

    @UseGuards(AuthGuard)
    @Post(':senderId/reject')
    async rejectFriendRequest(@Param('senderId') senderId: number, @Body('receiverId') receiverId: number): Promise<Object> {
        return await this.friendService.rejectFriendRequest(senderId, receiverId);
    }

    @UseGuards(AuthGuard)
    @Delete(':userId/remove/:friendId')
    async removeFriend(@Param("userId") userId: number, @Param("friendId") friendId: number): Promise<void> {
        return await this.friendService.removeFriend(userId, friendId);
    }

    @UseGuards(AuthGuard)
    @Get(':userId/friendrequests')
    async getFriendRequestList(@Param("userId") userId: number): Promise<Object[]> {
        return await this.friendService.getFriendRequestList(userId);
    }

    @UseGuards(AuthGuard)
    @Get(':userId/friends')
    async getFriendList(@Param("userId") userId: number): Promise<Object[]> {
        return await this.friendService.getFriendList(userId);
    }
}
