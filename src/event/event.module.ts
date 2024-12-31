/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { eventController } from './event.controller';
import { eventService } from './event.service';
import { User } from 'src/entities/user.entity';
import { events } from 'src/entities/event.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, events])],
    exports: [TypeOrmModule, eventService],
    controllers: [eventController],
    providers: [eventService],
})
export class eventModule { }
