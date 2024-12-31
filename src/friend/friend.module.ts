import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { User } from 'src/entities/user.entity';
import { FriendRequest } from 'src/entities/friend-request.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, FriendRequest])],
    exports: [TypeOrmModule, FriendService],
    controllers: [FriendController],
    providers: [FriendService],
})
export class FriendModule { }
