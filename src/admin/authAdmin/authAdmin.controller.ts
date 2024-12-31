import {
    Body,
    Controller,
    Post,
    UsePipes,
    UseInterceptors,
    UploadedFile,
    ValidationPipe,
} from '@nestjs/common';
import { AuthAdminService } from './authAdmin.service';
import { CreateAdminDto, loginAdminDTO } from 'src/admin/dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
@Controller('admin/auth')
export class AuthAdminController {
    constructor(private authAdminService: AuthAdminService) { }

    @Post('register')
    @UsePipes(new ValidationPipe())
    async addUser(@Body() myobj: CreateAdminDto,): Promise<Object> {
        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(myobj.password, salt);
        myobj.password = hashedpassword;
        return this.authAdminService.signUp(myobj);
    }
    @Post('login')
    signIn(@Body() logindata: loginAdminDTO) {
        return this.authAdminService.signIn(logindata);
    }
}
