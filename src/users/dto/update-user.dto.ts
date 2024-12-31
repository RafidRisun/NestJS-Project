import { IsEmail, IsNumber, IsString, Length, Matches } from 'class-validator';

export class UpdateUserDto {

  @Length(8, 100, {
    message: 'fullName length must be between 8 and 100 characters',
  })
  @IsString({ message: 'fullName must be a string' })
  fullName: string;

  @IsEmail({}, { message: 'email must be valid' })
  email: string;

  @IsString({ message: 'password must be a string' })
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Passwords must be at least 8 characters, should include atleast one uppercase and one lowercase letter and a special character and a digit',
  })
  password: string;

  @IsString({ message: 'confirmPassword must be a string' })
  confirmPassword: string;

  @IsString()
  instituteName: string;

  @IsString()
  employmentStatus: string;

  @IsString()
  legalAgreement: string;

  @IsString()
  profilePhoto: string;
}
