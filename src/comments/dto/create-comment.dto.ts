import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    userId: number;

    postId: number;

    forumId: number;
    
    @IsNotEmpty()
    content: string;
}
