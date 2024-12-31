import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'feedback', type: 'varchar', length: 150, nullable: false })
    feedback: string;

    @Column({ name: 'oneWeekUser', type: 'varchar', length: 3, nullable: false })
    oneWeekUser: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    datePosted: Date;

    @ManyToOne(() => User, user => user.feedbacks)
    user: User;
}
