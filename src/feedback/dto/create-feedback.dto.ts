import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFeedbackDto {

    id: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString({ message: 'feedback must be a string' })
    feedback: string;

    @IsString({ message: 'oneWeekUser must be a string' })
    oneWeekUser: string;
}
