import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from './user.entity';
import { UserProfile } from './user-profile.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // name: string;

  @Column()
  caption: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  dislikes: number;

  @Column({ nullable: true }) 
  image: string;

  @ManyToOne(() => User, user=> user.posts)
  user: User;

  // @ManyToOne(() => UserProfile, userprofile=> userprofile.posts)
  // userprofile: UserProfile;

  @OneToMany(() => Comment, comments => comments.post)
  comments: Comment[];

  @Column()
  userId: number;
}
