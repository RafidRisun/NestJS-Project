/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from 'src/entities/notification.entity';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, User])], // Include both Notification and User repositories
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [TypeOrmModule],
})
export class NotificationModule {}