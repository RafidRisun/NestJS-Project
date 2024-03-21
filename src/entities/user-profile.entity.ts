import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('userprofile')
export class UserProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @OneToOne(() => User, user=> user.userprofile)
    user: User;

    // @OneToMany(() => Post, posts=> posts.userprofile)
    // posts: Post[];
}
