import { Injectable, NotFoundException} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ){}



  async create(createPostDto: CreatePostDto, userId: number): Promise<Post> {
    const user = await this.userRepo.findOne({ where: { id: userId}});
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const post = this.postRepo.create({ ...createPostDto, user }); // Associate user with the post
    return await this.postRepo.save(post);
  }

  // async create(createPostDto: CreatePostDto, userId: number, filename: string): Promise<Post> {
  //   const user = await this.userRepo.findOne({ where: { id: userId}});
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   const post = this.postRepo.create({ ...createPostDto, user, image: filename }); // Associate user with the post
  //   return await this.postRepo.save(post);
  // }

  async findAll() {
    return await this.postRepo.find({});
  }

  async findOne(id: number) {
    return await this.postRepo.findOne({ where: { id: id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepo.findOne({ where: {id: id}});
    if (!post) {
      return undefined; 
    }
    post.caption = updatePostDto.caption;
    return await this.postRepo.save(post);
  }

  async remove(id: number): Promise<Post | undefined> {
    const post = await this.postRepo.findOne({ where: {id: id}});
    if (!post) {
      return undefined; 
    }
    await this.postRepo.remove(post);
    return post;
  }

  async getPostsByUser(userId: number){
    const posts = await this.userRepo.find({
      where: { id: userId },
      relations: ['posts'],
      select: ["id", "name"],
    });
    if (!posts) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return posts;
  }

  async likePost(id: number): Promise<Post> {
    const post = await this.postRepo.findOne({ where: {id: id}});
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    post.likes++;
    return this.postRepo.save(post);
  }

  async dislikePost(id: number): Promise<Post> {
    const post = await this.postRepo.findOne({ where: {id: id}});
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    post.dislikes++;
    return this.postRepo.save(post);
  }

  async getTotalLikesByUserId(userId: number): Promise<number> {
    const posts = await this.postRepo.find({ where: { userId: userId } });
    const totalLikes = posts.reduce((acc, post) => acc + post.likes, 0);

    return totalLikes;
  }
  
}
