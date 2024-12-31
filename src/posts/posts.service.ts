import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Badge } from 'src/entities/badge.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Posts) private readonly postRepo: Repository<Posts>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Badge) private readonly badgeRepo: Repository<Badge>,
  ) { }



  async create(createPostDto: CreatePostDto, userId: number): Promise<Posts> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const post = this.postRepo.create({ ...createPostDto, user});
    return await this.postRepo.save(post);
  }

  async findAll() {
    return await this.postRepo.find({});
  }

  async findOne(id: number) {
    return await this.postRepo.findOne({ where: { id: id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepo.findOne({ where: { id: id } });
    if (!post) {
      return undefined;
    }
    post.caption = updatePostDto.caption;
    return await this.postRepo.save(post);
  }

  async remove(id: number): Promise<Posts | undefined> {
    const post = await this.postRepo.findOne({ where: { id: id } });
    if (!post) {
      return undefined;
    }
    await this.postRepo.remove(post);
    return post;
  }

  async getUserBadges(userId: number): Promise<Badge[]> {
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['badges'] });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return user.badges;
  }

  // async getPostsByUser(userId: number) {
  //   const posts = await this.userRepo.find({
  //     where: { id: userId },
  //     relations: ['posts'],
  //     select: ["id", "userName"],
  //   });
  //   if (!posts) {
  //     throw new NotFoundException(`User with id ${userId} not found`);
  //   }
  //   return posts;
  // }

  async getPostsByUser(userId: number){
    const posts = await this.postRepo.find({ where: {userId: userId}});
    return posts;
  }

  async likePost(id: number): Promise<Posts> {
    const post = await this.postRepo.findOne({ where: { id: id }, relations: ['user'] });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    post.likes++;
    await this.postRepo.save(post);

    if (post.user && post.user.id) {
      await this.getTotalLikesByUserId(post.user.id);
    } else {
      console.error('User information is missing for the post:', post);
    }

    return post;
  }

  async dislikePost(id: number): Promise<Posts> {
    const post = await this.postRepo.findOne({ where: { id: id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    post.dislikes++;
    return this.postRepo.save(post);
  }

  async getTotalLikesByUserId(userId: number): Promise<number> {
    const posts = await this.postRepo.find({ where: { userId: userId } });
    const totalLikes = posts.reduce((acc, post) => acc + post.likes, 0);

    if (totalLikes == 5) {
      await this.awardBadge(userId, 'Bronze');
    }
    if (totalLikes == 10) {
      await this.awardBadge(userId, 'Silver');
    }

    if (totalLikes == 15) {
      await this.awardBadge(userId, 'Gold');
    }

    return totalLikes;
  }

  private async awardBadge(userId: number, badgeName: string): Promise<void> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const badge = new Badge();
    badge.name = badgeName;
    badge.user = user;

    await this.badgeRepo.save(badge);
  }

  //Sajid
  async countPosts(): Promise<number> {
    return this.postRepo.count();
  }
  //Sajid
  async countLikes(): Promise<number> {
    const posts = await this.postRepo.find();
    return posts.reduce((acc, post) => acc + post.likes, 0);
  }
  //Sajid
  async countDislikes(): Promise<number> {
    const posts = await this.postRepo.find();
    return posts.reduce((acc, post) => acc + post.dislikes, 0);
  }

  //Humayra
  async uploadPostPhoto(
    id: number,
    uploadedPostPhoto: Express.Multer.File,
  ) {
    const post = await this.postRepo.findOneBy({ id: id });
    post.postPhoto = uploadedPostPhoto.filename;
    const { caption, ...response } =
      await this.postRepo.save({
        id,
        ...post,
      });
    return response;
  }
  //Humayra
  async getPostPhoto(id: number, res) {
    const post = await this.postRepo.findOneBy({ id: id });
    res.sendFile(post.postPhoto, { root: './upload' });
  }

}
