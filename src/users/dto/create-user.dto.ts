import { IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    id: number;

    @IsString({ message: 'Valid name is required'})
    @IsNotEmpty()
    name: string;

    
    phone: string;
}
