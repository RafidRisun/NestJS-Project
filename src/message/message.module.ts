import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { messageController } from './message.controller';
import { messageService } from './message.service';
import { User } from 'src/entities/user.entity';
import { messages } from 'src/entities/message.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, messages])],
    exports: [TypeOrmModule, messageService],
    controllers: [messageController],
    providers: [messageService],
})
export class messageModule { }
