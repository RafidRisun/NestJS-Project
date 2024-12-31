/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';


@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subscriptionPackage: string;
  

  @Column({ type: 'float' })
  amount: number;

  @ManyToOne(() => User, user => user.subscription)
  @JoinColumn()
  user: User;
  amountPaid: number;
}