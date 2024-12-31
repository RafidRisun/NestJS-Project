import { IsNotEmpty, IsString } from "class-validator";

export class CreateForumDto {
    @IsNotEmpty()
    userId: number;
    
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}
