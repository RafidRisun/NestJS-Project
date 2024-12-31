import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
//import { Comment } from './comment.entity';
import { User } from './user.entity';
//import { UserProfile } from './user-profile.entity';

@Entity()
export class Badge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.badges)
  user: User;
}
