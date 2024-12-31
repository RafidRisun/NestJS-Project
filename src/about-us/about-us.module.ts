/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutUs } from 'src/entities/about-us.entity';
import { AboutUsController } from './about-us.controller';
import { AboutUsService } from './about-us.service';

@Module({
  imports: [TypeOrmModule.forFeature([AboutUs])],
  controllers: [AboutUsController],
  providers: [AboutUsService],
})
export class AboutUsModule {}