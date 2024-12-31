/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class JobPost {


  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userName: string;

  @Column()
  title: string;

  @Column()
  description: string;


  @ManyToOne(() => User, user => user.jobPosts)
  user: User;

  @Column({
    nullable: true,
    name: 'jobcircular',
    type: 'varchar',
    length: 500,
  })
  jobcircular: string;

  



}