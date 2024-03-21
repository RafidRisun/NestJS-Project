import { IsNotEmpty } from "class-validator";

export class CreateUserProfileDto {
    @IsNotEmpty()
    userId: number;
}
