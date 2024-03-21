import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { Faq } from 'src/entities/faq.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class FaqService {

  constructor(
    @InjectRepository(Faq) private readonly faqRepo: Repository<Faq>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ){}

  async create(createFaqDto: CreateFaqDto, userId: number): Promise<Faq>{
    const user = await this.userRepo.findOne({ where: {id: userId},select: ["id", "name"]});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const faq = this.faqRepo.create({ ...createFaqDto, user});
    return await this.faqRepo.save(faq);
  }


  // async create(createPostDto: CreatePostDto, userId: number): Promise<Post> {
  //   const user = await this.userRepo.findOne({ where: { id: userId}});
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   const post = this.postRepo.create({ ...createPostDto, user }); // Associate user with the post
  //   return await this.postRepo.save(post);
  // }
  
  allfaq() {
    // General Q&A pairs
    const faq = [
      {
        question: "How do I create a post on my profile?",
        answer: "To create a post on your profile, navigate to your profile page and click on the 'Create Post' button. Then, write your post content and click 'Submit'."
      },
      {
        question: "How can I join a forum?",
        answer: "To join a forum, browse the list of available forums and click on the one you're interested in. Then, click the 'Join' button or follow the instructions provided."
      },
      {
        question: "What are events?",
        answer: "Events are gatherings or activities organized within the platform. You can browse events related to various interests or create your own event to invite others."
      },
      {
        question: "How do I post a job on the job board?",
        answer: "To post a job on the job board, navigate to the job board section and click on the 'Post Job' button. Fill in the required details such as job title, description, and requirements, then submit the job posting."
      },
      {
        question: "How can I add friends?",
        answer: "You can add friends by visiting their profiles and clicking on the 'Add Friend' button. Once they accept your friend request, you'll be connected on the platform."
      }
    ];

    return faq;
  }
}
