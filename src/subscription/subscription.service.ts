/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from 'src/entities/subscription.entity';
import { wallets } from 'src/entities/wallet.entity';
import { User } from 'src/entities/user.entity';
import { SubscriptionDto } from './dto/subscription.dto';

@Injectable()
export class SubscriptionService {
  static isUserSubscribed: any;

  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(wallets)
    private readonly walletRepository: Repository<wallets>,
  ) { }

  async subscribe(userId: number, subscriptionDto: SubscriptionDto): Promise<void> {
    const { subscriptionPackage, amount } = subscriptionDto;
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['money']
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const wallets = user.money;
    if (!wallets || wallets.length === 0 || wallets[0].balance < amount) {
      throw new Error('Insufficient balance');
    }

    const subscription = new Subscription();
    subscription.user = user;
    subscription.subscriptionPackage = subscriptionPackage;
    subscription.amount = amount;

    await this.subscriptionRepository.save(subscription);

    wallets[0].balance -= amount;
    await this.walletRepository.save(wallets[0]);
  }
  async getSubscribers(): Promise<Subscription[]> {

    return this.subscriptionRepository.find({ relations: ['user'], select: ['id', 'subscriptionPackage', 'amount', 'user'] });
  }

  async cancelSubscription(subscriptionId: number): Promise<void> {
    const subscription = await this.subscriptionRepository.findOne({ where: { id: subscriptionId } });
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }
    await this.subscriptionRepository.remove(subscription);
  }
  async isUserSubscribed(userId: number): Promise<boolean> {

    const subscription = await this.subscriptionRepository.findOne({
      where: { user: { id: userId } },
    });
    return !!subscription;
  }
  //Sajid
  async countTotalSubscribers(): Promise<number> {
    const totalSubscribers = await this.subscriptionRepository.count();
    return totalSubscribers;
  }
  //Sajid
  async countTotalAmountAdded(): Promise<number> {
    const subscriptions = await this.subscriptionRepository.find();
    const totalAmountAdded = subscriptions.reduce((sum, subscription) => sum + subscription.amount, 0);
    return totalAmountAdded;
  }
  //Sajid
  async calculateTotalLoss(): Promise<number> {
    const totalAmountAdded = await this.countTotalAmountAdded();
    const totalWalletBalance = await this.calculateTotalWalletBalance();
    const totalLoss = totalWalletBalance - totalAmountAdded;
    return totalLoss;
  }
  //Sajid
  private async calculateTotalWalletBalance(): Promise<number> {
    const wallets = await this.walletRepository.find();
    const totalWalletBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
    return totalWalletBalance;
  }
}