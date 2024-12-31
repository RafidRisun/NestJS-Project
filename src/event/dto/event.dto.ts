/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';


export class eventDto {

  @IsNotEmpty()
  //@IsString()
  userId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

}