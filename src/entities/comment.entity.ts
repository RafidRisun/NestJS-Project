import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Posts } from './post.entity';
import { Forum } from './forum.entity';
import { User } from './user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, user => user.comments)
  user: User;

  @ManyToOne(() => Posts, post => post.comments)
  post: Posts;

  @ManyToOne(() => Forum, forum => forum.comments)
  forum: Forum;

  @Column()
  userId: number;

  @Column({ nullable: true })
  postId: number | null;

  @Column({ nullable: true })
  forumId: number | null;
}
