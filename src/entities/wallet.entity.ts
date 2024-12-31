import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/entities/user.entity';
@Entity()
export class wallets {
    @PrimaryGeneratedColumn()
    usid: number;



    @Column()
    cardnumber: number;

    @Column()
    cvv: number;

    @Column()
    pin: number;

    @Column()
    amount: number;

    @Column({ default: 0 })
    balance: number;


    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    datePosted: Date;

    @ManyToOne(() => User, user => user.money)
    us: User;



    // @Column({
    //  type: 'enum',
    //  enum: ['pending', 'accepted', 'rejected'],
    // default: 'pending',
    //})

}
