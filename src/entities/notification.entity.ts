/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { JobPost } from './job-post.entity';

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.notifications)
    user: User;

    @ManyToOne(() => JobPost)
    @JoinColumn()
    userName: User;


    @ManyToOne(() => JobPost)
    @JoinColumn()
    jobPost: JobPost;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'text' })
    message: string;
}