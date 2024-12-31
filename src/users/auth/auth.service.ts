import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto, loginDTO } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) { }
  async signUp(myobj: CreateUserDto): Promise<Object> {
    return await this.userService.addUser(myobj);
  }
  async signIn(logindata: loginDTO): Promise<Object> {
    const user = await this.userService.findOne(logindata);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(logindata.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const data = logindata;
    return {
      access_token: await this.jwtService.signAsync(data), id: user.id
    };
  }
}