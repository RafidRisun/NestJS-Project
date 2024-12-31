import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { User } from "./user.entity";

@Entity('forums')
export class Forum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Comment, comment => comment.forum)
  comments: Comment[];

  @ManyToOne(() => User, user=> user.forums)
  user: User;

  @Column()
  userId: number;
}
