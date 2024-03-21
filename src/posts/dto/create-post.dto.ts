import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  userId: number;

  @IsString()
  caption: string;

  @IsNumber()
  likes: number = 0;

  @IsNumber()
  dislikes: number = 0;

  @IsUrl({}, { message: 'Invalid media URL' })
  image: string;
}
