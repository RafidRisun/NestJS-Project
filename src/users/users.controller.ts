import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from './auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { MulterError, diskStorage } from 'multer';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  //Sajid
  @UseGuards(AuthGuard)
  @Get('/')
  getUsers(@Query('subString') subString: string): Promise<User[]> {
    if (subString) return this.userService.getUsers(subString);
    else return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async ShowAll(): Promise<User[]> {
    return this.userService.ShowAll();
  }



  //Humayra
  @UseGuards(AuthGuard)
  @Post(':id/uploadProfilePhoto')
  @UseInterceptors(
    FileInterceptor('profilePhoto', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 10000000 },
      storage: diskStorage({
        destination: './upload',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  uploadProfilePhoto(@UploadedFile() profilePhoto: Express.Multer.File, @Param('id', ParseIntPipe) id: number) {
    return this.userService.uploadProfilePhoto(id, profilePhoto);
  }
  @UseGuards(AuthGuard)
  @Get('findUserByEmail/:email')
  async findAdminByEmail(@Param('email') email: string): Promise<Object> {
    const admin = await this.userService.findbyEmail(email);
    return admin;
  }

  //Humayra
  @UseGuards(AuthGuard)
  @Get(':id/getProfilePhoto')
  getProfilePhoto(@Param('id', ParseIntPipe) id: number, @Res() res) {
    return this.userService.getProfilePhoto(id, res);
  }

  @Get('findUserByIds/:id')
  async getUserByIds(@Param('id') id: string): Promise<User> {
    const userId = parseInt(id, 10); // Parse the ID string to a number
    return this.userService.findById(userId);
  }

  @Post('/')
  async createUser(@Body() createUserDto: CreateUserDto) {

    const { legalAgreement } = createUserDto;

    if (legalAgreement !== 'yes') {
      throw new HttpException('You must agree to the legal agreement.', HttpStatus.BAD_REQUEST);
    }


    return this.userService.addUser(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}

