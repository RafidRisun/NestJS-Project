import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class FriendRequestDto {

    @IsNotEmpty()
    @IsNumber()
    senderId: number;

    @IsNotEmpty()
    @IsNumber()
    receiverId: number;
}