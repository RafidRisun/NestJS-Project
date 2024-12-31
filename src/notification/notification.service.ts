/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Notification } from 'src/entities/notification.entity';
import { User } from 'src/entities/user.entity';
import { CreateNotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async createNotification(notificationDto: CreateNotificationDto): Promise<Notification> {
    const user = await this.userRepository.findOne({ where: { id: notificationDto.userId } });
    if (!user) {
      throw new Error('User not found');
    }
    if (!notificationDto.message) {
      throw new Error('Message cannot be empty');
    }

    const notification = this.notificationRepository.create({ user, message: notificationDto.message });
    return this.notificationRepository.save(notification);
  }

  async findNotificationsByUserId(userName: string): Promise<{ userName: string, message: string }[]> {
    const notifications = await this.notificationRepository.find({ where: { user: Equal(userName) }, relations: ['user'], });
    if (!notifications || notifications.length === 0) {
      return [];
    }
    return notifications.map(notification => ({
      userName: notification.user?.userName || '', // Adjusted to empty string
      message: notification.message,
    }));
  }

  async findAllNotifications(): Promise<Notification[]> {
    return this.notificationRepository.find();
  }

}
