import {
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('admin')
export class Admin {
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



}
