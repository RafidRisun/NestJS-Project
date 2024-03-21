import { Injectable } from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UserProfileService {
  create(createUserProfileDto: CreateUserProfileDto) {
    return 'This action adds a new userProfile';
  }
}
