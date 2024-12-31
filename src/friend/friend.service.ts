import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { FriendRequest } from 'src/entities/friend-request.entity';

@Injectable()
export class FriendService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(FriendRequest)
        private readonly friendRequestRepository: Repository<FriendRequest>,
    ) { }

    async sendFriendRequest(senderId: number, receiverId: number): Promise<Object> {
        const sender = await this.userRepository.findOneBy({ id: senderId });
        const receiver = await this.userRepository.findOneBy({ id: receiverId });

        if (!sender || !receiver) {
            throw new NotFoundException('Sender or receiver not found');
        }

        const existingRequest = await this.friendRequestRepository.findOne({
            where: {
                sender,
                receiver,
            },
        });

        if (existingRequest) {
            throw new Error('Friend request already sent');
        }

        const friendRequest = new FriendRequest();
        friendRequest.sender = sender;
        friendRequest.receiver = receiver;
        friendRequest.status = 'pending';

        return await this.friendRequestRepository.save(friendRequest);
    }

    async acceptFriendRequest(senderId: number, receiverId: number): Promise<Object> {
        const friendRequest = await this.friendRequestRepository.findOne({
            where: {
                sender: { id: senderId },
                receiver: { id: receiverId },
                status: 'pending',
            },
        });

        if (!friendRequest) {
            throw new NotFoundException('Friend request not found');
        }

        friendRequest.status = 'accepted';
        return await this.friendRequestRepository.save(friendRequest);
    }

    async rejectFriendRequest(senderId: number, receiverId: number): Promise<Object> {
        const friendRequest = await this.friendRequestRepository.findOne({
            where: {
                sender: { id: senderId },
                receiver: { id: receiverId },
                status: 'pending',
            },
        });

        if (!friendRequest) {
            throw new NotFoundException('Friend request not found');
        }

        return await this.friendRequestRepository.delete(friendRequest.id);
    }


    async removeFriend(userId: number, friendId: number): Promise<any> {
        // Assuming you have a friend repository to handle friend relationships
        const friendToRemove = await this.friendRequestRepository.findOne({
            where: [
                { sender: { id: userId }, receiver: { id: friendId } },
                { sender: { id: friendId }, receiver: { id: userId } }
            ]
        });

        if (!friendToRemove) {
            throw new Error("Friend relationship not found");
        }

        await this.friendRequestRepository.remove(friendToRemove);
    }



    async getFriendList(userId: number): Promise<Object[]> {
        const sentFriendRequests = await this.friendRequestRepository.find({
            where: {
                sender: { id: userId },
                status: 'accepted',
            },
            relations: ['receiver'],
        });
        const receivedFriendRequests = await this.friendRequestRepository.find({
            where: {
                receiver: { id: userId },
                status: 'accepted',
            },
            relations: ['sender'],
        });
        const friendUsers = sentFriendRequests.map(request => request.receiver)
            .concat(receivedFriendRequests.map(request => request.sender));

        return friendUsers;
    }

    async getFriendRequestList(userId: number): Promise<Object[]> {

        const receivedFriendRequests = await this.friendRequestRepository.find({
            where: {
                receiver: { id: userId },
                status: 'pending',
            },
            relations: ['sender'],
        });
        const friendRequests = receivedFriendRequests.map(request => request.sender);

        return friendRequests;
    }


    // async getFriendRequestList(userId: number): Promise<Object[]> {
    //     const friendRequest = await this.friendRequestRepository.find({
    //         where: {

    //             receiver: { id: userId },
    //             status: 'pending',

    //         },
    //     });
    //     return friendRequest;

    // }

    async getTotalPendingFriendRequests(): Promise<number> {
        return this.friendRequestRepository.count({ where: { status: 'pending' } });
    }

    async getTotalAcceptedFriendRequests(): Promise<number> {
        return this.friendRequestRepository.count({ where: { status: 'accepted' } });
    }
}
