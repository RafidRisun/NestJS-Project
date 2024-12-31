import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { messages } from 'src/entities/message.entity';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { messageDto } from './dto/message.dto';

// @Injectable()
// export class messageService {
//     constructor(
//         @InjectRepository(User)
//         private readonly userRepository: Repository<User>,
//         @InjectRepository(messages)
//         private readonly messageRepository: Repository<messages>,
//     ) { }

//     async sendmessage(sendersId: number, receiversId: number, text: string): Promise<Object> {
//         const sender = await this.userRepository.findOneBy({ id: sendersId });
//         const receiver = await this.userRepository.findOneBy({ id: receiversId });




//         if (!sender || !receiver) {
//             throw new NotFoundException('Sender or receiver not found');
//         }


//         const message = this.messageRepository.create({ senders: sender, receivers: receiver, text: text });

//         return await this.messageRepository.save(message);
//     }

//     async getMessages(): Promise<messages[]> {
//         return this.messageRepository.find({ relations: ['senders'] });
//     }

    


// }
@Injectable()
export class messageService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(messages)
        private readonly messageRepository: Repository<messages>,
    ) {}
    async findById(sendersId: number, receiversId: number) {
        return await this.messageRepository.find({ where: { id: sendersId } });
        return await this.messageRepository.find({ where: { id: receiversId } });
      }

      async sendmessage(sendersId: number, receiversId: number, text: string): Promise<Object> {
        const sender = await this.userRepository.findOneBy({ id: sendersId });
        const receiver = await this.userRepository.findOneBy({ id: receiversId });




        if (!sender || !receiver) {
            throw new NotFoundException('Sender or receiver not found');
        }


        const message = this.messageRepository.create({
            senders: sender,
            receivers: receiver,
            text: text,
            createdAt: new Date(), // Initialize createdAt with current timestamp
        });

        return await this.messageRepository.save(message);
    }
    async getMessagesBetweenUsers(user1Id: number, user2Id: number): Promise<any[]> {
        const messages = await this.messageRepository
            .createQueryBuilder('message')
            .leftJoinAndSelect('message.senders', 'sender')
            .leftJoinAndSelect('message.receivers', 'receiver')
            .where('(sender.id = :user1Id AND receiver.id = :user2Id) OR (sender.id = :user2Id AND receiver.id = :user1Id)', {
                user1Id,
                user2Id,
            })
            .orderBy('message.createdAt', 'ASC')
            .getMany();

        // Extract sender and receiver usernames
        const messagesWithUsernames = messages.map(message => ({
            id: message.id,
            sendersId: message.senders.id,
            receiversId: message.receivers.id,
            text: message.text,
            createdAt: message.createdAt,
            senderUsername: message.senders.fullName,
            receiverUsername: message.receivers.fullName,
        }));

        return messagesWithUsernames;
    }

    async getUserInformation(userId: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async countMessages(): Promise<number> {
        return this.messageRepository.count();
    }
}