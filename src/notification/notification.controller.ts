/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from 'src/entities/notification.entity';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { User } from 'src/entities/user.entity';


@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @UseGuards(AuthGuard)
  @Get(':userId')
  async getNotificationsByUserId(@Param('userId') userId: string): Promise<{ userName: string, message: string }[]> {
    return this.notificationService.findNotificationsByUserId(userId);
  }

  @Get()
  async findAllNotifications(): Promise<Notification[]> {
    return this.notificationService.findAllNotifications();
  }
}