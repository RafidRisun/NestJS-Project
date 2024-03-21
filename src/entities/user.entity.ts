import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import * as bcrypt from 'bcrypt';
import { Post } from "./post.entity";
import { Faq } from "./faq.entity";
import { UserProfile } from "./user-profile.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false})
    name: string;

    @Column({unique: true, nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @BeforeInsert()
    async HashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }

    @OneToMany(() => Post, posts => posts.user) 
    posts: Post[];

    @OneToMany(() => Faq, faqs => faqs.user) 
    faqs: Faq[];

    @OneToOne(() => UserProfile, userprofile => userprofile.user) 
    userprofile: UserProfile;
}
