/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutUs } from 'src/entities/about-us.entity';


@Injectable()
export class AboutUsService {
  
  constructor(
    @InjectRepository(AboutUs)
    private readonly aboutUsRepository: Repository<AboutUs>,
  ) {}

  async findAll(): Promise<AboutUs[]> {
    return this.aboutUsRepository.find();
  }

  async findById(id: number): Promise<AboutUs | undefined> {
    return this.aboutUsRepository.findOne({ where: { id } });
  }

  async create(content: string): Promise<AboutUs> {
    const aboutUs = new AboutUs();
    aboutUs.content = content;
    return this.aboutUsRepository.save(aboutUs);
  }
  async update(id: number, content: string): Promise<AboutUs | undefined> {
    const aboutUs = await this.aboutUsRepository.findOne({ where: { id }});
    if (!aboutUs) {
      return undefined; // Or throw NotFoundException
    }
    aboutUs.content = content;
    return this.aboutUsRepository.save(aboutUs);
  }

  async delete(id: number): Promise<void> {
    await this.aboutUsRepository.delete(id);
  }
}