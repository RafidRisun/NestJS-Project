/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AboutUs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;
}