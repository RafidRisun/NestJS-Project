import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('faqs')
export class Faq {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column({ nullable: false})
    subject: string;

    @Column()
    description: string;

    @ManyToOne(() => User, user=> user.faqs)
    user: User;
}
