/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
export class SubscriptionDto {
  @IsNotEmpty()
    @IsString()
    userId: number;
    @IsNotEmpty()
  @IsString()
  subscriptionPackage: string;
    @IsNotEmpty()
    @IsString()
    amount: number;
  
  }