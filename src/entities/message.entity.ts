import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Entity()
export class messages {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.sentmessage)
  senders: User;

  @ManyToOne(() => User, user => user.receivedmessage)
  receivers: User;

 // @Column({
  //  type: 'enum',
  //  enum: ['pending', 'accepted', 'rejected'],
   // default: 'pending',
  //})
  @Column({ type: 'varchar' })
//status: string;
  text: string;

  @Column({ name: 'createdat' }) // Ensure the correct column name mapping
  createdAt: Date;
}
