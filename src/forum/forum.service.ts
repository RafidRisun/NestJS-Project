import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Like, Repository } from 'typeorm';
import { Forum } from 'src/entities/forum.entity';
import { Comment } from 'src/entities/comment.entity';

@Injectable()
export class ForumService {

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Forum) private readonly forumRepo: Repository<Forum>,
    @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>
  ) { }


  async create(createForumDto: CreateForumDto, userId: number): Promise<Forum> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const forum = this.forumRepo.create({ ...createForumDto, user });
    return await this.forumRepo.save(forum);
  }

  async findAll() {
    return await this.forumRepo.find({});
  }

  //Sajid
  async getForumPosts(subString: string): Promise<Forum[]> {
    return this.forumRepo.find({
      where: { title: Like(`%${subString}%`) },
    });
  }

  //Sajid
  async countForumPosts(): Promise<number> {
    return this.forumRepo.count();
  }

  async findOne(id: number) {
    return await this.forumRepo.findOne({ where: { id: id } });
  }

  async update(id: number, updateForumDto: UpdateForumDto) {
    const forum = await this.forumRepo.findOne({ where: { id: id } });
    if (!forum) {
      return undefined;
    }
    forum.title = updateForumDto.title;
    forum.description = updateForumDto.description;
    return await this.forumRepo.save(forum);
  }

  async remove(id: number): Promise<Forum> {
    const forum = await this.forumRepo.findOne({ where: { id: id } });
    if (!forum) {
      return undefined;
    }
    await this.forumRepo.remove(forum);
    return forum;
  }

  async getForumByUser(userId: number) {
    const forums = await this.userRepo.find({
      where: { id: userId },
      relations: ['forums'],
      select: ["id", "userName"]
    });
    if (!forums) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return forums;
  }


}
