import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity'


@Entity('posts')
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // name: string;

  @Column()
  caption: string;

  @Column({ nullable: true, name: 'postPhoto', type: 'varchar', length: 500, })
  postPhoto: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  dislikes: number;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => Comment, comments => comments.post)
  comments: Comment[];
}
