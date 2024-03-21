import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ){}


  async create(createUserDto: CreateUserDto) {
    // const newUser = {...createUserDto};
    // this.users.push(newUser);
    // return newUser;
    const user = await this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }

  async findAll() {
    //return this.users;
    return await this.userRepo.find({});
  }

  async findOne(id: number) {
    return await this.userRepo.findOne({ where: { id: id } });
  }
  
  // async findOne(id: number): Promise<User | undefined> {
  //   return await this.userRepo.findOne({ where: {id: id}});
  // }
  

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | undefined> {
    const user = await this.userRepo.findOne({ where: {id: id}});
    if (!user) {
      return undefined; 
    }
    Object.assign(user, updateUserDto);
    return await this.userRepo.save(user);
  }

  async remove(id: number): Promise<User | undefined> {
    const user = await this.userRepo.findOne({ where: {id: id}});
    if (!user) {
      return undefined; 
    }
    await this.userRepo.remove(user);
    return user;
  }
}
