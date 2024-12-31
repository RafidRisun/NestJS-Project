/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionDto } from './dto/subscription.dto';
import { Subscription } from 'src/entities/subscription.entity';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { AuthGuardAdmin } from 'src/admin/authAdmin/authAdmin.guard';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  // @Post()
  // async subscribe(@Body() subscriptionDto: SubscriptionDto): Promise<void> {
  //   await this.subscriptionService.subscribe(subscriptionDto);
  // }
  @UseGuards(AuthGuard)
  @Post(':userId')
  async subscribe(
    @Param('userId') userId: number,
    @Body() subscriptionDto: SubscriptionDto,
  ): Promise<void> {
    try {
      await this.subscriptionService.subscribe(userId, subscriptionDto);
    } catch (error) {
      if (error.message === 'Insufficient balance') {
        throw new HttpException('Insufficient balance', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @UseGuards(AuthGuardAdmin)
  @Get()
  async getSubscribers(): Promise<Subscription[]> {
    return await this.subscriptionService.getSubscribers();
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async cancelSubscription(@Param('id') id: string): Promise<void> {
    await this.subscriptionService.cancelSubscription(+id);
  }
}