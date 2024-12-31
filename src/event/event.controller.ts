/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards, Query, /*UploadedFile, UseInterceptors*/ } from '@nestjs/common';
import { eventService } from './event.service';
import { eventDto } from './dto/event.dto';
import { events } from 'src/entities/event.entity';
import { AuthGuard } from 'src/users/auth/auth.guard';

@Controller('event')
export class eventController {
  constructor(private readonly eventService: eventService) { }

  @UseGuards(AuthGuard)
  @Post("event")
  async event(@Body() requestDto: eventDto): Promise<Object> {
    return await this.eventService.event(requestDto.userId, requestDto.title, requestDto.description);
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async getEvents(@Query('subString') subString: string): Promise<events[]> {
    if (subString) {
      return this.eventService.getEvents(subString);
    } else {
      return this.eventService.getAllevents();
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async geteventById(@Param('id') id: number): Promise<events> {
    return this.eventService.geteventById(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateevent(@Param('id') id: number, @Body() updateeventDto: eventDto) {
    return this.eventService.updateevent(id, updateeventDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteevent(@Param('id') id: number) {
    return this.eventService.deleteevent(id);
  }

 
}