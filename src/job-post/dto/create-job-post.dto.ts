/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
//import { ApiProperty } from '@nestjs/swagger';

export class CreateJobPostDto {

    @IsNotEmpty()
    @IsString()
    userId: number;

    @IsNotEmpty()
    @IsString()
    userName: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
  
  @IsString()
  jobcircular: string;

    // @ApiProperty({ type: 'string', format: 'binary' })
    // file: any;
    // static userId: any;
}