/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { AboutUsService } from './about-us.service';

@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) { }

  @Get()
  async getAll() {
    return this.aboutUsService.findAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const aboutUs = await this.aboutUsService.findById(id);
    if (!aboutUs) {
      throw new NotFoundException('About Us content not found');
    }
    return aboutUs;
  }

  @Post()
  async create(@Body() body: { content: string }) {
    const { content } = body;
    return this.aboutUsService.create(content);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: { content: string }) {
    const { content } = body;
    const aboutUs = await this.aboutUsService.update(id, content);
    if (!aboutUs) {
      throw new NotFoundException('About Us content not found');
    }
    return aboutUs;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const aboutUs = await this.aboutUsService.findById(id);
    if (!aboutUs) {
      throw new NotFoundException('About Us content not found');
    }
    await this.aboutUsService.delete(id);
    return { message: 'About Us content deleted successfully' };
  }
}