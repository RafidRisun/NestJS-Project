import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Entity()
export class FriendRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.sentRequests)
  sender: User;

  @ManyToOne(() => User, user => user.receivedRequests)
  receiver: User;

  @Column({
    type: 'enum',
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  })
  status: string;
}
