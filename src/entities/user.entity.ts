import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { JobPost } from './job-post.entity';
import { Posts } from "./post.entity";
import { messages } from './message.entity';
import { wallets } from './wallet.entity';
import { events } from './event.entity';
import { Badge } from './badge.entity';
import { Forum } from './forum.entity';
import { Faq } from './faq.entity';
import { UserProfile } from './user-profile.entity';
import { Comment } from './comment.entity'
import { Subscription } from './subscription.entity';
import { Notification } from './notification.entity';
import { Feedback } from './feedback.entity';


@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: "int" })
  id: number;

  @Column({ name: 'fullName', type: 'varchar', length: 150, nullable: false })
  fullName: string;

  @Column({ name: 'userName', type: 'varchar', length: 100, unique: true, nullable: false })
  userName: string;

  @Column({ name: 'email', unique: true, nullable: false })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'confirmPassword', nullable: true })
  confirmPassword: string;

  @Column({ name: 'instituteName', type: 'varchar', length: 150, nullable: false })
  instituteName: string;

  @Column({ name: 'employmentStatus', type: 'varchar', length: 150, nullable: false })
  employmentStatus: string;

  @Column({ name: 'legalAgreement', type: 'varchar', length: 3, nullable: false })
  legalAgreement: string;

  @Column({ nullable: true, name: 'profilePhoto', type: 'varchar', length: 500, })
  profilePhoto: string;

  @OneToMany(() => FriendRequest, request => request.sender)
  sentRequests: FriendRequest[];

  @OneToMany(() => FriendRequest, request => request.receiver)
  receivedRequests: FriendRequest[];

  @OneToMany(() => JobPost, jobPost => jobPost.user)
  jobPosts: JobPost[];

  @OneToMany(() => Posts, posts => posts.user)
  posts: Posts[];

  @OneToMany(() => Feedback, feedback => feedback.user)
  feedbacks: Feedback[];

  @OneToMany(() => messages, request => request.senders)
  sentmessage: messages[];

  @OneToMany(() => messages, request => request.receivers)
  receivedmessage: messages[];

  @OneToMany(() => wallets, request => request.us)
  money: wallets[];

  @OneToMany(() => events, event => event.user)
  event: events[];

  @OneToMany(() => Badge, badge => badge.user)
  badges: Badge[];

  @OneToMany(() => Comment, comments => comments.user)
  comments: Comment[];

  @OneToMany(() => Forum, forums => forums.user)
  forums: Forum[];

  @OneToMany(() => Faq, faqs => faqs.user)
  faqs: Faq[];

  @OneToOne(() => UserProfile, userprofile => userprofile.user)
  userprofile: UserProfile;

  @OneToMany(() => Subscription, subscription => subscription.user)
  subscription: JobPost[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];

}
