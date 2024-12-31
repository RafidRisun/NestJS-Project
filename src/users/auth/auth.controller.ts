import {
  Body,
  Controller,
  Post,
  UsePipes,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, loginDTO } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Controller('users/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async addUser(@Body() myobj: CreateUserDto,): Promise<Object> {
    if (myobj.password !== myobj.confirmPassword) {
      throw new BadRequestException('Password and confirmPassword do not match');
    }
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(myobj.password, salt);
    myobj.password = hashedpassword;
    return this.authService.signUp(myobj);
  }
  @Post('login')
  signIn(@Body() logindata: loginDTO) {
    return this.authService.signIn(logindata);
  }
}
