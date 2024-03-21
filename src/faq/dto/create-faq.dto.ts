import { IsNotEmpty } from "class-validator";

export class CreateFaqDto {

    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    subject: string;

    description: string;
}
